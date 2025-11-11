// src/features/auth/hooks/useRegister.ts

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../api/auth.api";
import { useAuthStore } from "../../../store/authStore";
import { z } from "zod";

const RegisterSchema = z
	.object({
		firstName: z.string().min(1, "First name is required."),
		lastName: z.string().min(1, "Last name is required."),
		email: z.string().email("Invalid email address."),
		password: z.string().min(8, "Password must be at least 8 characters."),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match.",
		path: ["confirmPassword"],
	});

export type RegisterFormData = z.infer<typeof RegisterSchema>;

export const useRegister = () => {
	const navigate = useNavigate();
	const loginSuccess = useAuthStore((state) => state.login);

	const [formData, setFormData] = useState<RegisterFormData>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setError(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			RegisterSchema.parse(formData);

			const { token, data } = await registerUser(formData);

			// Update global state via Zustand
			loginSuccess(token, data.user);

			navigate("/dashboard");
		} catch (error) {
			console.error(error);
			const apiErrorData = error.response?.data;

			const validationErrors = apiErrorData?.errors;

			let displayMessage = "An unknown error occurred.";

			if (validationErrors && Array.isArray(validationErrors)) {
				displayMessage = validationErrors[0]?.message || "Validation failed.";
			} else if (apiErrorData?.message) {
				displayMessage = apiErrorData.message;
			}

			// Log or set the error message here
			console.error(displayMessage);
		}
	};

	return {
		formData,
		loading,
		error,
		handleChange,
		handleSubmit,
	};
};
