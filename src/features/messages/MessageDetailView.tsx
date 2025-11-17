import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useMessages } from "@/hooks/useMessages";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useArchive } from "@/hooks/useArchive";
import { Bookmark, Archive, ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const conversationMessage = {
	id: "conv-1",
	title: "Insurance Reminder",
	type: "conversation",
	subject: "Your insurance has informed us that they need you to contact them",
	body: `Hello,
	I am contacting you regarding the claim we submitted to your insurance for your visit on 4/28/2025. Your insurance has informed us that they need you to contact them to confirm if you have other insurance. They will not make any payment for any claims that they receive on your behalf, until they hear from you. You can call them at the number that is on your insurance card.
	If you have any questions, you can call the Student Health Billing Office at 813-445-4976 option 7`,
	date: "Aug 29",
};

export const MessageDetailView = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { messages } = useMessages();
	const { bookmarks, toggleBookmark } = useBookmarks();
	const { archived, toggleArchive } = useArchive();

	// Find message
	messages.push(conversationMessage);
	const msg = messages.find((m) => m.id === id);

	// Should never be undefined now
	// if (!msg) return <div className="p-10 text-center">Loading…</div>;

	const isBookmarked = bookmarks.includes(msg.id);
	const isArchived = archived.includes(msg.id);

	// if (id?.startsWith("conv-")) {
	// 	return (
	// 		<div className="p-8 max-w-3xl mx-auto">
	// 			<Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
	// 				← Back
	// 			</Button>

	// 			<h1 className="text-2xl font-bold text-blue-900 mb-2">
	// 				Conversation Message
	// 			</h1>

	// 			<p className="text-gray-700 leading-6 whitespace-pre-line mt-4">
	// 				This is a sample conversation message opened in detail view. You can
	// 				replace this content later with real conversation data.
	// 			</p>
	// 		</div>
	// 	);
	// }

	return (
		<div className="mx-auto py-6">
			<div className="grow bg-[#F4F5F6] pl-10 rounded-r-4xl inset-shadow-[0px_4px_25px_3px_rgba(0,0,0,0.25)] p-6">
				{/* HEADER */}
				<div className="flex justify-between items-center border-0 pb-4 mb-4 bg-[#e1edfb] rounded-t-lg border-b px-4 py-3">
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
							<p>
								{msg?.type == "conversation"
									? "Insurance Team"
									: "Your Care Team"}
							</p>
						</div>
					</div>

					{/* RIGHT */}
					<div className="w-1/2 space-y-4">
						<p className="text-gray-500">{msg.date}</p>

						<div className="bg-white rounded-bl-none p-6 rounded-xl shadow w-3/4">
							{msg.type === "conversation" && <div>{msg.body}</div>}
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
