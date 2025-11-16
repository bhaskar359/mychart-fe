import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MessageStore {
	bookmarks: string[];
	archived: string[];
	toggleBookmark: (id: string) => void;
	toggleArchive: (id: string) => void;
}

export const useMessageStore = create<MessageStore>()(
	persist(
		(set, get) => ({
			bookmarks: [],
			archived: [],

			toggleBookmark: (id) => {
				const { bookmarks } = get();
				const updated = bookmarks.includes(id)
					? bookmarks.filter((x) => x !== id)
					: [...bookmarks, id];

				set({ bookmarks: updated });
			},

			toggleArchive: (id) => {
				const { archived } = get();
				const updated = archived.includes(id)
					? archived.filter((x) => x !== id)
					: [...archived, id];

				set({ archived: updated });
			},
		}),

		{ name: "message-store" }
	)
);
