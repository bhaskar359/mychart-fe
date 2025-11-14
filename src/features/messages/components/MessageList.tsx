import React from "react";
import type { MessageItem } from "@/types/messages.types";
import { AppointmentMessageCard } from "./AppointmentMessageCard";
import { QuestionnaireMessageCard } from "./QuestionnaireMessageCard";

export const MessageList: React.FC<{ messages: MessageItem[] }> = ({
	messages,
}) => {
	if (messages.length === 0)
		return (
			<p className="text-center text-gray-500 py-10">No messages to display.</p>
		);

	return (
		<div className="space-y-4">
			{messages.map((m) =>
				m.type === "appointment" ? (
					<AppointmentMessageCard key={m.id} message={m} />
				) : (
					<QuestionnaireMessageCard key={m.id} message={m} />
				)
			)}
		</div>
	);
};
