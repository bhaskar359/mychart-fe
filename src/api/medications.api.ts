import type { Medication } from "@/hooks/useMedications";
import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:3000/api/v1",
	headers: { "Content-Type": "application/json" },
});

// Define the API response structure
interface MedicationsApiResponse {
	status: string;
	data: {
		medications: Medication[];
	};
}

/**
 * Fetches all medications for the authenticated user.
 * @param token The JWT token for authorization.
 * @returns A promise that resolves to an array of Medication objects.
 */
export const fetchMedications = async (
	userId: string
): Promise<Medication[]> => {
	try {
		const response = await API.get("/medications/" + userId);

		return response.data.data.medications;
	} catch (error) {
		// Log error details and re-throw for the React Query hook to catch
		if (axios.isAxiosError(error) && error.response) {
			console.error(
				"Medications API Error:",
				error.response.data.message || error.response.statusText
			);
			throw new Error(
				error.response.data.message || "Failed to fetch medications."
			);
		}
		throw new Error("An unexpected error occurred during API call.");
	}
};
