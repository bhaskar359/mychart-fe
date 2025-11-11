// src/features/auth/auth.api.ts

import axios from "axios";
import type { LoginFormValues } from "../features/auth/hooks/useLogin"; // Defined in section II
// Defined in section II
// Defined in section II
import type { RegisterFormData } from "../features/auth/hooks/useRegister"; // Defined in section III
// Defined in section III

// NOTE: Ensure REACT_APP_API_BASE_URL is set in your .env file
const API = axios.create({
	baseURL: "http://localhost:3000/api/v1",
	headers: { "Content-Type": "application/json" },
});

// Assuming the user object structure returned by the backend (based on your request)
interface AuthResponseData {
	token: string;
	data: {
		user: {
			id: string;
			email: string;
			firstName: string;
			lastName: string;
		};
	};
}

interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
}

/**
 * Sends credentials to the backend for local login.
 */
export const loginUser = async (
	credentials: LoginFormValues
): Promise<AuthResponseData> => {
	const response = await API.post("/auth/login", credentials);

	if (!response.data.data?.user) {
		throw new Error("Backend did not return user data on login.");
	}

	return response.data;
};

/**
 * Sends data to the backend for local registration.
 */
export const registerUser = async (
	userData: RegisterFormData
): Promise<AuthResponseData> => {
	const response = await API.post("/auth/register", userData);

	if (!response.data.data?.user) {
		throw new Error("Backend did not return user data on registration.");
	}

	return response.data;
};

export const googleSignInApi = async (
	googleToken: string
): Promise<AuthResponseData> => {
	const response = await API.post("/auth/google/signin", {
		token: googleToken,
	});
	return response.data;
};

/**
 * Calls the protected /users/me endpoint to verify the JWT and retrieve user details.
 * @param token The JWT retrieved from localStorage.
 * @returns A promise that resolves to the User object.
 */
export const fetchMe = async (token: string): Promise<any> => {
	axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

	const response = await axios.get("http://localhost:3000/api/v1/auth/me");

	return response?.data?.data?.user;
};
