// src/hooks/useMessages.ts
import { useQuery } from "@tanstack/react-query";
import { fetchAllAppointments } from "../api/appointments.api";

/**
 * Builds message objects from appointments
 */
export const useMessages = () => {
	const { data: appointments = [] } = useQuery({
		queryKey: ["messages-appointments"],
		queryFn: async () => {
			const raw = await fetchAllAppointments();

			// Normalize and ensure safe structure
			return raw.map((app) => ({
				...app,
				appointment_date: new Date(app.appointment_date),
				questionnaire_answers: Array.isArray(app.questionnaire_answers)
					? app.questionnaire_answers
					: [],
			}));
		},
	});

	// Build messages ONLY from the normalized appointments
	const messages = [
		// Appointment messages
		...appointments.map((appt) => ({
			id: appt.id,
			type: "appointment",
			title: "Appointment Scheduled",
			date: appt.appointment_date.toDateString(),
			appointment: appt,
		})),

		// Questionnaire messages
		...appointments.map((appt) => ({
			id: `${appt.id}-q`,
			type: "questionnaire",
			title: "Questionnaire Received",
			date: appt.appointment_date.toDateString(),
			answers: appt.questionnaire_answers,
		})),
	];

	return { messages };
};
