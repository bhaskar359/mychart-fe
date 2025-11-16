import { useState, useEffect } from "react";

/**
 * A safe useState wrapper that persists to sessionStorage.
 * - key: sessionStorage key
 * - initial: initial value or initializer function
 */
export function useSessionStorageState<T>(key: string, initial: T | (() => T)) {
	const [state, setState] = useState<T>(() => {
		try {
			const raw = sessionStorage.getItem(key);
			if (raw) return JSON.parse(raw) as T;
			return typeof initial === "function" ? (initial as () => T)() : initial;
		} catch {
			return typeof initial === "function" ? (initial as () => T)() : initial;
		}
	});

	useEffect(() => {
		try {
			sessionStorage.setItem(key, JSON.stringify(state));
		} catch {
			// ignore write errors
		}
	}, [key, state]);

	return [state, setState] as const;
}
