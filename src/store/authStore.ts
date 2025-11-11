// src/stores/useAuthStore.ts

import { create } from "zustand";

// Define the User structure expected from the backend
export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	// Add any other user fields you need
}

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;

	// Actions
	login: (token: string, userData: User) => void;
	logout: () => void;
	initialize: (userData: User) => void;
}

const TOKEN_KEY = "authToken";

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	isAuthenticated: false,

	// Called on successful login/register
	login: (token, userData) => {
		localStorage.setItem(TOKEN_KEY, token); // ⬅️ Persist the token
		set({
			user: userData,
			isAuthenticated: true,
		});
	},

	// Called to initialize state after refreshing the page (if token is found)
	initialize: (userData) => {
		set({
			user: userData,
			isAuthenticated: true,
		});
	},

	// Called when user logs out
	logout: () => {
		localStorage.removeItem(TOKEN_KEY); // ⬅️ Clear the persisted token
		set({
			user: null,
			isAuthenticated: false,
		});
	},
}));
