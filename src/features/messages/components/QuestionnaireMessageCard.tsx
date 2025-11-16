import React from "react";
import { Card } from "@/components/ui/card";
import { FileText, Bookmark, Archive } from "lucide-react";
import { useMessageActions } from "@/context/MessageActionsProvider";

interface Props {
	msg: any;
	onClick?: () => void;
}

export const QuestionnaireMessageCard: React.FC<Props> = ({ msg, onClick }) => {
	const { toggleBookmark, toggleArchive, isBookmarked, isArchived } =
		useMessageActions();

	const bookmarked = isBookmarked(msg.id);
	const archived = isArchived(msg.id);

	return (
		<Card
			className="w-full p-4 shadow cursor-pointer hover:shadow-md"
			onClick={onClick}
		>
			<div className="flex justify-between items-start">
				<div className="flex gap-3">
					<FileText className="text-blue-700 w-6 h-6" />
					<div>
						<h3 className="font-semibold text-gray-800">{msg.title}</h3>
						<p className="text-sm text-gray-600">{msg.date}</p>
						<p className="text-sm text-gray-700 mt-2 line-clamp-3">
							{msg.answers && msg.answers.length > 0
								? `${msg.answers.length} answered question(s)`
								: "No answers"}
						</p>
					</div>
				</div>

				<div className="flex gap-4 items-center">
					<button
						onClick={(e) => {
							e.stopPropagation();
							toggleBookmark(msg.id);
						}}
						aria-label="Toggle bookmark"
					>
						<Bookmark
							className={`w-5 h-5 ${
								bookmarked ? "text-blue-700" : "text-gray-500"
							}`}
						/>
					</button>

					<button
						onClick={(e) => {
							e.stopPropagation();
							toggleArchive(msg.id);
						}}
						aria-label="Toggle archive"
					>
						<Archive
							className={`w-5 h-5 ${
								archived ? "text-blue-700" : "text-gray-500"
							}`}
						/>
					</button>
				</div>
			</div>
		</Card>
	);
};
