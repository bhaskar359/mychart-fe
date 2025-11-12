import axios from "axios";
import type {
	Appointment,
	CreateAppointmentPayload,
} from "../types/appointments.types"; // Assume this file exists
// Assume this file exists

const BASE_URL = "http://localhost:3000/api/v1";

/**
 * Fetches all appointments (future and past visits) for the authenticated user.
 * The backend handles filtering based on the user's token.
 * @returns {Promise<Appointment[]>} Array of all user appointments/visits.
 */
export async function fetchAllAppointments(): Promise<Appointment[]> {
	const authToken = localStorage.getItem("authToken");
	if (!authToken) {
		throw new Error("Authentication token missing.");
	}
	const response = await axios.get(`${BASE_URL}/appointments/fetch-all`, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});
	return response.data.data.appointments;
}

/**
 * Creates a new appointment using the multi-step form data.
 * The service layer will generate the UUID.
 * @param payload The complete data payload for the new appointment.
 * @returns {Promise<{id: string}>} The ID of the newly created appointment.
 */
export async function createNewAppointment(
	payload: CreateAppointmentPayload
): Promise<{ id: string }> {
	const authToken = localStorage.getItem("authToken");
	const response = await axios.post(
		`${BASE_URL}/appointments/create`,
		payload,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken}`,
			},
		}
	);

	if (response.status !== 201) {
		throw new Error("Failed to create appointment");
	}
	return response.data.data.id; // Should return { id: <new_uuid> }
}

// NOTE: You will need to define the Appointment and CreateAppointmentPayload types in a separate file (e.g., appointments.types.ts)
