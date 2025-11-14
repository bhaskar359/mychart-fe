import React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";

export const BookmarkToggle: React.FC<{
	id: string;
	initiallyBookmarked: boolean;
}> = ({ id, initiallyBookmarked }) => {
	const { bookmarks, toggleBookmark } = useBookmarks();

	const active = bookmarks.includes(id);

	return (
		<button onClick={() => toggleBookmark(id)}>
			{active ? (
				<BookmarkCheck className="w-5 h-5 text-blue-700" />
			) : (
				<Bookmark className="w-5 h-5 text-gray-400" />
			)}
		</button>
	);
};
