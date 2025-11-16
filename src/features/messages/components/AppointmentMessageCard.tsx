// src/features/messages/components/AppointmentMessageCard.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import { Calendar, Bookmark, Archive } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useArchive } from "@/hooks/useArchive";
// import { useMessageActions } from "../context/MessageActionsContext";
import { useMessageActions } from "@/context/MessageActionsProvider";

export const AppointmentMessageCard = ({ msg, onClick }) => {
	const { toggleBookmark, toggleArchive, isBookmarked, isArchived } =
		useMessageActions();

	const bookmarked = isBookmarked(msg.id);
	const archived = isArchived(msg.id);

	return (
		<Card
			className="w-full p-4 shadow cursor-pointer hover:shadow-md transition"
			onClick={onClick}
		>
			<div className="flex flex-row justify-between">
				{/* LEFT */}
				<div className="flex gap-3">
					<Calendar className="text-blue-700 w-6 h-6" />
					<div>
						<h3 className="font-semibold text-lg text-gray-800">{msg.title}</h3>

						<p className="text-md font-medium text-gray-600">
							Type:{" "}
							<span className="text-sm font-normal">
								{msg.appointment.appointment_type}
							</span>{" "}
							Date: <span className="text-sm font-normal">{msg.date}</span>{" "}
							Location:{" "}
							<span className="text-sm font-normal">
								{msg.appointment.location_name},{" "}
								{msg.appointment.location_address}
							</span>
						</p>
					</div>
				</div>

				{/* RIGHT ICONS */}
				<div className="flex gap-4">
					<Bookmark
						className={`w-5 h-5 cursor-pointer ${
							bookmarked ? "text-blue-700" : "text-gray-500"
						}`}
						onClick={(e) => {
							e.stopPropagation();
							toggleBookmark(msg.id);
						}}
					/>

					<Archive
						className={`w-5 h-5 cursor-pointer ${
							archived ? "text-blue-700" : "text-gray-500"
						}`}
						onClick={(e) => {
							e.stopPropagation();
							toggleArchive(msg.id);
						}}
					/>
				</div>
			</div>
		</Card>
	);
};
