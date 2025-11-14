import React from "react";
import { useParams, Link } from "react-router-dom";
import { useMessages } from "@/hooks/useMessages";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useArchive } from "@/hooks/useArchive";
import { Bookmark, Archive, ArrowLeft, User } from "lucide-react";

export const MessageDetailView = () => {
	const { id } = useParams();
	const { messages } = useMessages();
	const { bookmarks, toggleBookmark } = useBookmarks();
	const { archived, toggleArchive } = useArchive();

	// Find message
	const msg = messages.find((m) => m.id === id);

	// Should never be undefined now
	if (!msg) return <div className="p-10 text-center">Loading…</div>;

	const isBookmarked = bookmarks.includes(msg.id);
	const isArchived = archived.includes(msg.id);

	return (
		<div className="bg-[#F4F5F6] min-h-screen py-6">
			<div className="bg-white mx-auto w-11/12 rounded-lg shadow p-6 border">
				{/* HEADER */}
				<div className="flex justify-between items-center border-b pb-4 mb-4 bg-[#E8F1FB] rounded-t-lg px-4 py-3">
					<div>
						<Link to="/messages" className="flex items-center text-blue-700">
							<ArrowLeft className="mr-2" /> Back to Messages
						</Link>
						<h2 className="text-2xl font-semibold">{msg.title}</h2>
					</div>

					<div className="flex gap-6">
						<Bookmark
							className={`w-6 h-6 cursor-pointer ${
								isBookmarked ? "text-blue-700" : "text-gray-500"
							}`}
							onClick={() => toggleBookmark(msg.id)}
						/>

						<Archive
							className={`w-6 h-6 cursor-pointer ${
								isArchived ? "text-blue-700" : "text-gray-500"
							}`}
							onClick={() => toggleArchive(msg.id)}
						/>
					</div>
				</div>

				<div className="flex gap-10">
					{/* LEFT */}
					<div className="w-1/4 border-r pr-6">
						<h2 className="font-semibold mb-4">Participants</h2>
						<div className="flex items-center gap-3">
							<User className="w-8 h-8 text-blue-700" />
							<p>Your Care Team</p>
						</div>
					</div>

					{/* RIGHT */}
					<div className="w-3/4 space-y-4">
						<p className="text-gray-500">{msg.date}</p>

						<div className="bg-white border p-6 rounded-xl shadow w-3/4">
							{msg.type === "appointment" && (
								<div className="space-y-1">
									<p className="font-semibold">Appointment Information</p>
									<p>Visit Type: {msg.appointment.appointment_type}</p>
									<p>Date: {msg.date}</p>
									<p>Location: {msg.appointment.location_name}</p>
								</div>
							)}

							{msg.type === "questionnaire" && (
								<div>
									<p className="font-semibold mb-3">Your Answers</p>
									{msg.answers.map((ans, i) => (
										<div key={i} className="mb-3">
											<p className="font-medium">{ans.question}</p>
											<p className="text-gray-700">{ans.answer}</p>
										</div>
									))}
								</div>
							)}
						</div>

						<p className="text-gray-500 text-center">
							You cannot reply to this conversation.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
