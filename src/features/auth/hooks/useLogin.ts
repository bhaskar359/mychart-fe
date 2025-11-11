// src/hooks/useLogin.ts

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore"; // Adjust path as necessary
import { loginUser } from "@/api/auth.api";

// --- 1. Define Zod Schema for Validation ---
const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// --- 2. Define the Custom Hook ---
export const useLogin = () => {
	const navigate = useNavigate();
	const loginAction = useAuthStore((state) => state.login);

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const {
		setError,
		formState: { isSubmitting },
	} = form;

	const handleSubmit = form.handleSubmit(async (values: LoginFormValues) => {
		try {
			// ⬇️ API Call to your backend login endpoint
			const { token, data } = await loginUser(values);

			// ⬇️ Update global state and persist token
			loginAction(token, data.user);

			// ⬇️ Navigate to the dashboard after successful login
			navigate("/dashboard");
		} catch (error) {
			console.error("Login failed:", error);

			// --- Handle API Errors ---
			const errorResponse = axios.isAxiosError(error)
				? error.response?.data
				: null;
			let errorMessage = "Login failed. Please check your credentials.";

			if (errorResponse) {
				// If it's an APIError from the backend (e.g., Incorrect email or password)
				errorMessage = errorResponse.message || errorMessage;
			}

			// Set a general error state on the form (you can display this message in your component)
			setError("root", { type: "manual", message: errorMessage });
		}
	});

	return {
		form,
		handleSubmit,
		isSubmitting,
	};
};
