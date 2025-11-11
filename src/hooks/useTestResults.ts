import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { fetchTestResults } from "@/api/test-results.api";

export interface TestResult {
	id: string;
	test_name: string;
	result_date: string;
	status: string;
	physician_first_name: string;
	physician_last_name: string;
}

export const useTestResults = () => {
	const userId = useAuthStore((state) => state.user?.id);
	const token = localStorage.getItem("authToken");

	const { data, isLoading, isError, error } = useQuery<TestResult[]>({
		queryKey: ["testReports", userId],
		queryFn: () => {
			if (!token) {
				throw new Error("Authentication token missing.");
			}
			return fetchTestResults(userId);
		},
		enabled: !!userId && !!token,
		select: (results: TestResult[]) => {
			return results.sort(
				(a, b) =>
					new Date(b.result_date).getTime() - new Date(a.result_date).getTime()
			);
		},
	});

	return {
		results: data || [],
		isLoading,
		isError,
		error,
	};
};
