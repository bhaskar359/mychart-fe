import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { fetchMe } from "@/api/auth.api";

export const useAuthInit = () => {
	const [isCheckingSession, setIsCheckingSession] = useState(true);
	const initialize = useAuthStore((state) => state.initialize);
	const logout = useAuthStore((state) => state.logout);

	useEffect(() => {
		const checkSession = async () => {
			// ⬅️ Define an async function inside useEffect
			const token = localStorage.getItem("authToken");

			if (token) {
				try {
					// ⬇️ Use await for the API call
					const userData = await fetchMe(token);

					// Token is valid; hydrate the store
					initialize(userData);
				} catch (error) {
					// Token is expired, invalid, or API failed; clear local session
					console.error("Session verification failed:", error);
					logout();
				} finally {
					// Stop the loading state regardless of success or failure
					setIsCheckingSession(false);
				}
			} else {
				// No token found, stop loading state immediately
				setIsCheckingSession(false);
			}
		};

		checkSession(); // ⬅️ Call the async function immediately
	}, [initialize, logout]);

	// Returns a flag to tell the app to wait
	return { isCheckingSession };
};
