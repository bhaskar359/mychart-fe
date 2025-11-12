import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	fetchAllAppointments,
	createNewAppointment,
} from "../api/appointments.api";
import type {
	Appointment,
	CreateAppointmentPayload,
} from "../types/appointments.types"; // Assume types file exists
// Assume types file exists

// Define the query key for appointments data
const APPOINTMENTS_QUERY_KEY = ["appointments"];

/**
 * Custom hook to fetch and manage all user appointments (future and past visits).
 * Returns cached data while fetching new data in the background.
 */
export const useAppointments = () => {
	return useQuery<Appointment[], Error>({
		queryKey: APPOINTMENTS_QUERY_KEY,
		queryFn: fetchAllAppointments,
		// Ensure data is sorted by date in memory for display purposes (backend sorts by date DESC)
		select: (data) => {
			// Deserialize dates for easier comparison
			return data.map((app) => ({
				...app,
				appointment_date: new Date(app.appointment_date),
				// Ensure questionnaire_answers is treated as an array of objects
				questionnaire_answers: Array.isArray(app.questionnaire_answers)
					? app.questionnaire_answers
					: [],
			}));
		},
	});
};

/**
 * Custom hook to handle the creation of a new appointment.
 * Automatically invalidates the appointment query cache on success.
 */
export const useCreateAppointment = () => {
	const queryClient = useQueryClient();

	return useMutation<{ id: string }, Error, CreateAppointmentPayload>({
		mutationFn: createNewAppointment,
		onSuccess: () => {
			// Invalidate the cache to trigger a refetch of the full list
			queryClient.invalidateQueries({ queryKey: APPOINTMENTS_QUERY_KEY });
		},
		onError: (error) => {
			console.error("Failed to create appointment:", error);
			// Optional: Show a user-friendly error notification
		},
	});
};
