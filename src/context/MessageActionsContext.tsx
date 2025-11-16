// src/features/messages/context/MessageActionsContext.tsx
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from "react";

const MessageActionsContext = createContext(null);

export const MessageActionsProvider = ({ children }) => {
	const [bookmarks, setBookmarks] = useState(() => {
		return JSON.parse(sessionStorage.getItem("bookmarks") || "[]");
	});

	const [archived, setArchived] = useState(() => {
		return JSON.parse(sessionStorage.getItem("archived") || "[]");
	});

	// 🔥 update session storage + rerender
	const toggleBookmark = useCallback((id) => {
		setBookmarks((prev) => {
			const updated = prev.includes(id)
				? prev.filter((x) => x !== id)
				: [...prev, id];

			sessionStorage.setItem("bookmarks", JSON.stringify(updated));
			return updated;
		});
	}, []);

	const toggleArchive = useCallback((id) => {
		setArchived((prev) => {
			const updated = prev.includes(id)
				? prev.filter((x) => x !== id)
				: [...prev, id];

			sessionStorage.setItem("archived", JSON.stringify(updated));
			return updated;
		});
	}, []);

	return (
		<MessageActionsContext.Provider
			value={{
				bookmarks,
				archived,
				toggleBookmark,
				toggleArchive,
			}}
		>
			{children}
		</MessageActionsContext.Provider>
	);
};

export const useMessageActions = () => useContext(MessageActionsContext);
