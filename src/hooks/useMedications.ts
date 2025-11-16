import { fetchMedications } from "@/api/medications.api";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";

export interface Medication {
	id: string;
	medication_name: string;
	dosage_strength: string;
	form_route: string;
	instructions: string;
	prescription_date: string;
	last_dispensed_date: string | null;
	status: string;
	refill_details: string | null;
	pharmacy_name: string | null;
	pharmacy_phone: string | null;
	type: string;
	physician: {
		id: string;
		name: string;
	};
}

export const useMedications = () => {
	// Get the current user's ID and authentication token
	const userId = useAuthStore((state) => state.user?.id);
	const token = localStorage.getItem("authToken");

	const REFILL_KEY = "refilledMedications";

	const getRefilledFromStorage = (): string[] => {
		try {
			return JSON.parse(sessionStorage.getItem(REFILL_KEY) || "[]");
		} catch {
			return [];
		}
	};

	const saveRefilledToStorage = (ids: string[]) => {
		sessionStorage.setItem(REFILL_KEY, JSON.stringify(ids));
	};

	const refilled = getRefilledFromStorage();

	const markRefilled = (id: string) => {
		const updated = [...new Set([...refilled, id])];
		saveRefilledToStorage(updated);
	};

	const isRefilled = (id: string) => refilled.includes(id);

	const requestMultipleRefills = (ids: string[]) => {
		const current = getRefilledFromStorage();
		const updated = Array.from(new Set([...current, ...ids]));
		saveRefilledToStorage(updated);
	};

	const { data, isLoading, isError, error } = useQuery<Medication[], Error>({
		queryKey: ["medications", userId],

		queryFn: () => {
			if (!token) {
				throw new Error("Authentication token missing.");
			}
			return fetchMedications(userId);
		},

		// Only run the query if a userId and token are available
		enabled: !!userId && !!token,

		select: (meds: Medication[]) => {
			// Optional: Sort active medications by prescription date descending
			return meds.sort(
				(a, b) =>
					new Date(b.prescription_date).getTime() -
					new Date(a.prescription_date).getTime()
			);
		},
	});

	return {
		medications: data || [],
		isLoading,
		isError,
		error,
		isRefilled,
		markRefilled,
		getRefilledFromStorage,
		requestMultipleRefills,
	};
};
