// src/features/messages/components/QuestionnaireMessageCard.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import { FileText, Bookmark, Archive } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useArchive } from "@/hooks/useArchive";

export const QuestionnaireMessageCard = ({ msg, onClick }) => {
	const { bookmarks, toggleBookmark } = useBookmarks();
	const { archived, toggleArchive } = useArchive();

	const isBookmarked = bookmarks.includes(msg.id);
	const isArchived = archived.includes(msg.id);

	return (
		<Card
			className="p-4 shadow cursor-pointer hover:shadow-md border flex justify-between"
			onClick={onClick}
		>
			<div className="flex gap-3">
				<FileText className="text-blue-700 w-6 h-6" />
				<div>
					<h3 className="font-semibold text-gray-800">{msg.title}</h3>
					<p className="text-sm text-gray-600">{msg.date}</p>
				</div>
			</div>

			<div className="flex gap-4">
				<Bookmark
					className={`w-5 h-5 ${
						isBookmarked ? "text-blue-700" : "text-gray-500"
					}`}
					onClick={(e) => {
						e.stopPropagation();
						toggleBookmark(msg.id);
					}}
				/>

				<Archive
					className={`w-5 h-5 ${
						isArchived ? "text-blue-700" : "text-gray-500"
					}`}
					onClick={(e) => {
						e.stopPropagation();
						toggleArchive(msg.id);
					}}
				/>
			</div>
		</Card>
	);
};
