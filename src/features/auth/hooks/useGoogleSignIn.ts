// src/features/auth/hooks/useGoogleSignIn.ts

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import { googleSignInApi } from "../../../api/auth.api";

// --- GLOBAL DECLARATION FOR GSI ---
// Tells TypeScript the structure of the Google Identity Services (GSI) object
declare global {
	interface Window {
		google: {
			accounts: {
				id: {
					initialize: (config: {
						client_id: string;
						callback: (response: { credential: string }) => void;
						auto_select?: boolean; // Optional: Auto-select account if possible
						prompt_parent_id?: string; // Optional: For specific rendering
					}) => void;
					prompt: () => void; // Function to manually trigger the prompt/popup
				};
			};
		};
	}
}

// --- THE REACT HOOK ---
export const useGoogleSignIn = () => {
	const navigate = useNavigate();
	const loginSuccess = useAuthStore((state) => state.loginSuccess);

	// 1. Define the callback function to handle the Google ID Token response
	const handleCredentialResponse = React.useCallback(
		async (response: { credential: string }) => {
			const googleToken = response.credential;
			console.log(
				"Received Google ID Token:",
				googleToken.substring(0, 30) + "..."
			);

			try {
				// Send the ID Token to your backend API
				const { token, data } = await googleSignInApi(googleToken);

				// Update global state and navigate on success
				loginSuccess(token, data.user);
				navigate("/dashboard", { replace: true });
			} catch (err) {
				console.error("Google Sign-In failed on backend:", err);
				alert("Google Sign-In failed. Please try again.");
			}
		},
		[loginSuccess, navigate] // Dependencies for useCallback
	);

	// 2. Initialize the GSI library once when the component mounts
	React.useEffect(() => {
		// Check if the GSI script tag has loaded the 'window.google' object
		if (!window.google) {
			// In a real app, you'd ensure the <script src="https://accounts.google.com/gsi/client" async defer></script>
			// is present in your index.html
			console.error(
				"Google Identity Services script not loaded in index.html."
			);
			return;
		}

		const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
		console.log("GSI Initializing with Client ID:", client_id);

		try {
			window.google.accounts.id.initialize({
				client_id: client_id,
				// Use the established callback function
				callback: handleCredentialResponse,
				// Setting 'auto_select: false' prevents the one-tap prompt on load
				auto_select: false,
			});
		} catch (error) {
			console.error("Failed to initialize GSI:", error);
		}

		// Cleanup is generally not needed for GSI initialization
	}, [handleCredentialResponse]); // Dependency on the memoized callback

	// 3. The function to call when the custom button is clicked
	const handleGoogleSignInClick = () => {
		// This triggers the Google sign-in prompt/popup
		// It relies on the initialization done in the useEffect hook.
		if (window.google?.accounts?.id) {
			window.google.accounts.id.prompt();
		} else {
			alert("Google Sign-In service is not ready. Please refresh the page.");
		}
	};

	return { handleGoogleSignInClick }; // Export the click handler
};

// --- END OF FILE ---
