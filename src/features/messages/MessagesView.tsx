// src/features/messages/MessagesView.tsx

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Search, Send } from "lucide-react";

import { useMessages } from "@/hooks/useMessages";
import { useMessageActions } from "@/context/MessageActionsProvider";

import { AppointmentMessageCard } from "./components/AppointmentMessageCard";
import { QuestionnaireMessageCard } from "./components/QuestionnaireMessageCard";

import { HomePageButton } from "@/components/layout/HomePageButton";
import { RequestRefillsModal } from "../medications/components/RequestRefillsModal";
import { useMedications } from "@/hooks/useMedications";

const TABS = [
	"Conversations",
	"Automated Messages",
	"Appointments",
	"Bookmarked",
	"Archived",
];

export const MessagesView: React.FC = () => {
	// Popup state
	const [open, setOpen] = useState(false);
	const { medications } = useMedications();
	const [openPopup, setOpenPopup] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const navigate = useNavigate();

	// Hooks
	const { messages } = useMessages(); // All message objects
	const { bookmarks, archived } = useMessageActions();

	// State
	const [activeTab, setActiveTab] = useState("Conversations");

	//----------------------------------
	// FILTERED DATA
	//----------------------------------

	const appointmentMessages = messages.filter(
		(m) => m.type === "appointment" && !archived.includes(m.id)
	);
	const questionnaireMessages = messages.filter(
		(m) => m.type === "questionnaire" && !archived.includes(m.id)
	);

	const bookmarkedMessages = messages.filter((m) => bookmarks.includes(m.id));

	const archivedMessages = messages.filter((m) => archived.includes(m.id));

	const conversationMessages = [
		{
			id: "conv-1",
			subject:
				"Your insurance has informed us that they need you to contact them Patricia",
			body: `Hello,
I am contacting you regarding the claim we submitted to your insurance for your visit on 4/28/2025. Your insurance has informed us that they need you to contact them to confirm if you have other insurance. They will not make any payment for any claims that they receive on your behalf, until they hear from you. You can call them at the number that is on your insurance card.
If you have any questions, you can call the Student Health Billing Office at 813-445-4976 option 7.`,
			date: "Aug 29",
		},
	];
	const ConversationCard = ({ msg }: any) => (
		<div className="w-full rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition">
			<div className="flex justify-between">
				<div className="flex gap-4">
					<MessageSquare className="text-blue-800 w-8 h-8" />
					<div>
						<h2 className="font-semibold text-gray-800 text-lg">
							{msg.subject}
						</h2>

						<p className="text-gray-700 text-sm mt-2 leading-5 whitespace-pre-line">
							{msg.body}
						</p>
					</div>
				</div>

				<p className="text-gray-500 text-sm">{msg.date}</p>
			</div>
		</div>
	);

	const applySearch = (list: any[]) => {
		const q = searchTerm.trim().toLowerCase();
		if (!q) return list;

		return list.filter((m: any) => {
			const combined =
				(m.appointment?.appointment_type || "") +
				" " +
				(m.appointment?.location_name || "") +
				" " +
				(m.appointment?.location_name || "") +
				" " +
				(m.date || "");

			return combined.toLowerCase().includes(q);
		});
	};

	// ----------------------------------
	// RENDER CARDS
	// ----------------------------------
	const renderCards = () => {
		switch (activeTab) {
			case "Conversations":
				return applySearch(conversationMessages).map((m) => (
					<div
						key={m.id}
						onClick={() => navigate(`/messages/${m.id}`)}
						className="w-full rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition cursor-pointer"
					>
						<div className="flex justify-between">
							<div className="flex gap-4">
								<MessageSquare className="text-blue-800 w-8 h-8" />
								<div>
									<h2 className="font-semibold text-gray-800 text-lg">
										{m.subject}
									</h2>
									<p className="text-gray-700 text-sm mt-2 leading-5 whitespace-pre-line">
										{m.body}
									</p>
								</div>
							</div>
							<p className="text-gray-500 text-sm">{m.date}</p>
						</div>
					</div>
				));

			case "Appointments":
				if (appointmentMessages.length === 0)
					return (
						<p className="text-gray-500">No appointment messages found.</p>
					);

				return applySearch(appointmentMessages).map((msg: any) => (
					<AppointmentMessageCard
						key={msg.id}
						msg={msg}
						onClick={() => navigate(`/messages/${msg.id}`)}
					/>
				));

			case "Automated Messages":
				if (questionnaireMessages.length === 0)
					return <p className="text-gray-500">No automated messages found.</p>;

				return applySearch(questionnaireMessages).map((msg: any) => (
					<QuestionnaireMessageCard
						key={msg.id}
						msg={msg}
						onClick={() => navigate(`/messages/${msg.id}`)}
					/>
				));

			case "Bookmarked":
				if (bookmarkedMessages.length === 0)
					return <p className="text-gray-500">No bookmarked messages.</p>;

				return applySearch(bookmarkedMessages).map((msg: any) =>
					msg.type === "appointment" ? (
						<AppointmentMessageCard
							key={msg.id}
							msg={msg}
							onClick={() => navigate(`/messages/${msg.id}`)}
						/>
					) : (
						<QuestionnaireMessageCard
							key={msg.id}
							msg={msg}
							onClick={() => navigate(`/messages/${msg.id}`)}
						/>
					)
				);

			case "Archived":
				if (archivedMessages.length === 0)
					return <p className="text-gray-500">No archived messages.</p>;

				return applySearch(archivedMessages).map((msg: any) =>
					msg.type === "appointment" ? (
						<AppointmentMessageCard
							key={msg.id}
							msg={msg}
							onClick={() => navigate(`/messages/${msg.id}`)}
						/>
					) : (
						<QuestionnaireMessageCard
							key={msg.id}
							msg={msg}
							onClick={() => navigate(`/messages/${msg.id}`)}
						/>
					)
				);

			default:
				return (
					<p className="text-gray-500">
						Conversations will be implemented later.
					</p>
				);
		}
	};

	//----------------------------------
	// COUNT BADGES
	//----------------------------------
	const getTabCount = (tab: string) => {
		switch (tab) {
			case "Conversations":
				return 0;
			case "Automated Messages":
				return questionnaireMessages.length;
			case "Appointments":
				return appointmentMessages.length;
			case "Bookmarked":
				return bookmarkedMessages.length;
			case "Archived":
				return archivedMessages.length;
			default:
				return 0;
		}
	};

	useEffect(() => {
		if (!searchTerm.trim()) return;

		const searchConversation = applySearch(conversationMessages);
		const searchAppointments = applySearch(appointmentMessages);
		const searchAutomated = applySearch(questionnaireMessages);
		const searchBookmarked = applySearch(bookmarkedMessages);
		const searchArchived = applySearch(archivedMessages);

		if (searchConversation.length > 0) {
			setActiveTab("Conversations");
		} else if (searchAppointments.length > 0) {
			setActiveTab("Appointments");
		} else if (searchAutomated.length > 0) {
			setActiveTab("Automated Messages");
		} else if (searchBookmarked.length > 0) {
			setActiveTab("Bookmarked");
		} else if (searchArchived.length > 0) {
			setActiveTab("Archived");
		}
	}, [searchTerm]);

	return (
		<div className="mx-auto py-10">
			<div className="grow bg-[#F4F5F6] pl-10 rounded-r-4xl inset-shadow-[0px_4px_25px_3px_rgba(0,0,0,0.25)] p-6">
				{/* HEADER */}
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-3xl font-bold text-gray-800">Message Center</h1>

					<div className="flex items-center space-x-4">
						<div className="relative grow min-w-[300px]">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
							<Input
								placeholder="Search Messages"
								className="pl-10 py-2 border-gray-300 rounded-lg shadow-sm"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>

						<Button
							onClick={() => setOpenPopup(true)}
							className="bg-blue-800 hover:bg-blue-700 text-white font-semibold flex items-center shadow-lg"
						>
							<Send className="w-4 h-4 mr-2" />
							Send a Message
						</Button>
					</div>
				</div>

				{/* TABS */}
				<div className="flex border-b border-gray-300 mb-6 overflow-x-auto">
					{TABS.map((tab) => {
						const count = getTabCount(tab);

						return (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap
                                ${
																	activeTab === tab
																		? "border-b-4 border-blue-800 text-blue-800"
																		: "text-gray-600 hover:text-gray-800"
																}
                            `}
							>
								{tab}
								{count > 0 && (
									<span className="ml-2 px-2 py-0.5 bg-blue-800 text-white text-xs rounded-full">
										{count}
									</span>
								)}
							</button>
						);
					})}
				</div>

				{/* CARD LIST */}
				<div className="w-full flex flex-wrap gap-3 justify-center">
					{renderCards()}
				</div>
			</div>
			{openPopup && (
				<div className="fixed bottom-0 right-20 w-[360px] md:w-[400px] bg-[#E8F1FE] shadow-2xl rounded-lg z-50">
					{/* HEADER */}
					<div className="flex items-center justify-between px-4 py-3 bg-[#32539e] text-white border-b rounded-t-lg">
						<h2 className="text-lg font-semibold">New message</h2>
						<button onClick={() => setOpenPopup(false)} className="text-xl">
							×
						</button>
					</div>

					{/* BODY */}
					<div className="p-4 space-y-4 overflow-y-auto max-h-[60vh]">
						<h3 className="text-md font-semibold text-gray-700">
							What would you like to do?
						</h3>

						{/* CARD 1 */}
						<div
							className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm cursor-pointer"
							onClick={() => navigate("/appointments")}
						>
							<div className="w-10 h-10 bg-[#E8F1FE] flex items-center justify-center rounded-md">
								📅
							</div>
							<div>
								<p className="font-medium text-gray-800">
									Schedule an appointment
								</p>
								<p className="text-xs text-gray-600">
									Request or schedule an appointment with a care team member.
								</p>
							</div>
						</div>

						{/* CARD 2 */}
						<div
							className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm cursor-pointer"
							onClick={() => setOpen(true)}
						>
							<div className="w-10 h-10 bg-[#E8F1FE] flex items-center justify-center rounded-md">
								💊
							</div>
							<div>
								<p className="font-medium text-gray-800">Refill a medication</p>
								<p className="text-xs text-gray-600">
									Request a refill for a prescription from your medications
									list.
								</p>
							</div>
						</div>

						{/* CARD 3 */}
						<div className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm">
							<div className="w-10 h-10 bg-[#E8F1FE] flex items-center justify-center rounded-md">
								🧾
							</div>
							<div>
								<p className="font-medium text-gray-800">
									Ask a customer service question
								</p>
								<p className="text-xs text-gray-600">
									Questions about billing or insurance.
								</p>
							</div>
						</div>

						{/* CARD 4 */}
						<div className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm">
							<div className="w-10 h-10 bg-[#E8F1FE] flex items-center justify-center rounded-md">
								❓
							</div>
							<div>
								<p className="font-medium text-gray-800">
									Ask a medical question
								</p>
								<p className="text-xs text-gray-600">
									A simple medical question that doesn't need an immediate
									response.
								</p>
							</div>
						</div>
					</div>
				</div>
			)}

			<HomePageButton />
			<RequestRefillsModal
				open={open}
				onClose={() => setOpen(false)}
				medications={medications}
				onSuccess={true}
			/>
		</div>
	);
};
