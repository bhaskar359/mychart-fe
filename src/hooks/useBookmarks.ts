// src/hooks/useBookmarks.ts
import { useState, useEffect } from "react";

export const useBookmarks = () => {
	const [bookmarks, setBookmarks] = useState<string[]>(() => {
		try {
			const stored = sessionStorage.getItem("msgBookmarks");
			return stored ? JSON.parse(stored) : [];
		} catch {
			return [];
		}
	});

	useEffect(() => {
		const stored = sessionStorage.getItem("msgBookmarks");
		if (stored) setBookmarks(JSON.parse(stored));
	}, []);

	// Listen for changes (from this tab)
	useEffect(() => {
		const handler = () => {
			const stored = sessionStorage.getItem("msgBookmarks");
			if (stored) setBookmarks(JSON.parse(stored));
		};
		window.addEventListener("storage", handler);
		return () => window.removeEventListener("storage", handler);
	}, []);

	// Save changes
	useEffect(() => {
		sessionStorage.setItem("msgBookmarks", JSON.stringify(bookmarks));
	}, [bookmarks]);

	const toggleBookmark = (id: string) => {
		setBookmarks((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
		);
	};

	return { bookmarks, toggleBookmark };
};
