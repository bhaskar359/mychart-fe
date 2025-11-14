// src/hooks/useMessages.ts
import { useAppointments } from "@/hooks/useAppointments";

export const useMessages = () => {
	const { data: appointments = [] } = useAppointments();

	const messages = [
		...appointments.map((appt) => ({
			id: appt.id,
			type: "appointment",
			title: "Appointment Scheduled",
			date: appt.appointment_date.toDateString(),
			appointment: appt,
		})),

		...appointments.map((appt) => ({
			id: appt.id + "-q",
			type: "questionnaire",
			title: "Questionnaire Received",
			date: appt.appointment_date.toDateString(),
			answers: appt.questionnaire_answers || [],
		})),
	];

	return { messages };
};
