import React, {
	createContext,
	useContext,
	type ReactNode,
	useMemo,
} from "react";
import { useSessionStorageState } from "@/hooks/usesessionStorage";

type MessageActionsContextValue = {
	bookmarks: string[];
	archived: string[];
	toggleBookmark: (id: string) => void;
	toggleArchive: (id: string) => void;
	isBookmarked: (id: string) => boolean;
	isArchived: (id: string) => boolean;
	// forceRefresh is not needed — consumers will re-render when provider state changes
};

const MessageActionsContext = createContext<MessageActionsContextValue | null>(
	null
);

export const MessageActionsProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [bookmarks, setBookmarks] = useSessionStorageState<string[]>(
		"msgBookmarks",
		[]
	);
	const [archived, setArchived] = useSessionStorageState<string[]>(
		"msgArchive",
		[]
	);

	const toggleBookmark = (id: string) => {
		setBookmarks((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
		);
	};

	const toggleArchive = (id: string) => {
		setArchived((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
		);
	};

	const isBookmarked = (id: string) => bookmarks.includes(id);
	const isArchived = (id: string) => archived.includes(id);

	const value = useMemo(
		() => ({
			bookmarks,
			archived,
			toggleBookmark,
			toggleArchive,
			isBookmarked,
			isArchived,
		}),
		[bookmarks, archived]
	);

	return (
		<MessageActionsContext.Provider value={value}>
			{children}
		</MessageActionsContext.Provider>
	);
};

export const useMessageActions = (): MessageActionsContextValue => {
	const ctx = useContext(MessageActionsContext);
	if (!ctx) {
		throw new Error(
			"useMessageActions must be used inside MessageActionsProvider"
		);
	}
	return ctx;
};
