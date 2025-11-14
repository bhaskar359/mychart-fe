// src/hooks/useArchive.ts
import { useState, useEffect } from "react";

export const useArchive = () => {
	const [archived, setArchived] = useState<string[]>(() => {
		try {
			const stored = localStorage.getItem("msgArchive");
			return stored ? JSON.parse(stored) : [];
		} catch {
			return [];
		}
	});

	useEffect(() => {
		localStorage.setItem("msgArchive", JSON.stringify(archived));
	}, [archived]);

	const toggleArchive = (id: string) => {
		setArchived((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
		);
	};

	return { archived, toggleArchive };
};
