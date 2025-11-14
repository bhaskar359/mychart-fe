// src/hooks/useBookmarks.ts
import { useState, useEffect } from "react";

export const useBookmarks = () => {
	const [bookmarks, setBookmarks] = useState<string[]>(() => {
		try {
			const stored = localStorage.getItem("msgBookmarks");
			return stored ? JSON.parse(stored) : [];
		} catch {
			return [];
		}
	});

	useEffect(() => {
		localStorage.setItem("msgBookmarks", JSON.stringify(bookmarks));
	}, [bookmarks]);

	const toggleBookmark = (id: string) => {
		setBookmarks((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
		);
	};

	return { bookmarks, toggleBookmark };
};
