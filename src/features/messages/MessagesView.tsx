// src/features/messages/MessagesView.tsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Send } from "lucide-react";

import { useMessages } from "@/hooks/useMessages";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useArchive } from "@/hooks/useArchive";

import { AppointmentMessageCard } from "./components/AppointmentMessageCard";
import { QuestionnaireMessageCard } from "./components/QuestionnaireMessageCard";

import { HomePageButton } from "@/components/layout/HomePageButton";

const TABS = [
	"Conversations",
	"Automated Messages",
	"Appointments",
	"Bookmarked",
	"Archived",
];

export const MessagesView: React.FC = () => {
	const navigate = useNavigate();

	// Hooks
	const { messages } = useMessages(); // All message objects
	const { bookmarks } = useBookmarks();
	const { archived } = useArchive();

	// State
	const [activeTab, setActiveTab] = useState("Conversations");

	//----------------------------------
	// FILTERED DATA
	//----------------------------------

	const appointmentMessages = messages.filter((m) => m.type === "appointment");
	const questionnaireMessages = messages.filter(
		(m) => m.type === "questionnaire"
	);

	const bookmarkedMessages = messages.filter((m) => bookmarks.includes(m.id));

	const archivedMessages = messages.filter((m) => archived.includes(m.id));

	//----------------------------------
	// RENDER CARDS
	//----------------------------------
	const renderCards = () => {
		switch (activeTab) {
			case "Appointments":
				if (appointmentMessages.length === 0)
					return (
						<p className="text-gray-500">No appointment messages found.</p>
					);

				return appointmentMessages.map((msg) => (
					<AppointmentMessageCard
						key={msg.id}
						msg={msg}
						onClick={() => navigate(`/messages/${msg.id}`)}
					/>
				));

			case "Automated Messages":
				if (questionnaireMessages.length === 0)
					return <p className="text-gray-500">No automated messages found.</p>;

				return questionnaireMessages.map((msg) => (
					<QuestionnaireMessageCard
						key={msg.id}
						msg={msg}
						onClick={() => navigate(`/messages/${msg.id}`)}
					/>
				));

			case "Bookmarked":
				if (bookmarkedMessages.length === 0)
					return <p className="text-gray-500">No bookmarked messages.</p>;

				return bookmarkedMessages.map((msg) =>
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

				return archivedMessages.map((msg) =>
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
							/>
						</div>

						<Button className="bg-blue-800 hover:bg-blue-700 text-white font-semibold flex items-center shadow-lg">
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
				<div className="max-w-4xl space-y-4">{renderCards()}</div>
			</div>

			<HomePageButton />
		</div>
	);
};
