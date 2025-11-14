export type MessageType = "appointment" | "questionnaire";

export interface BaseMessage {
	id: string;
	type: MessageType;
	title: string;
	preview: string;
	date: string;
	appointmentId: string;
	isBookmarked: boolean;
}

export interface AppointmentMessage extends BaseMessage {
	type: "appointment";
}

export interface QuestionnaireMessage extends BaseMessage {
	type: "questionnaire";
	answers: Array<{ question: string; answer: string }>;
}

export type MessageItem = AppointmentMessage | QuestionnaireMessage;
