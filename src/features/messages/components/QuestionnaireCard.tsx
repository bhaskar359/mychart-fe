import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

interface QuestionnaireCardProps {
	id: string;
	title: string;
	description: string;
	date: string;
	onClick?: () => void;
}

export const QuestionnaireCard: React.FC<QuestionnaireCardProps> = ({
	title,
	description,
	date,
	onClick,
}) => {
	return (
		<Card
			onClick={onClick}
			className="p-4 border rounded-xl cursor-pointer hover:shadow-md transition"
		>
			<CardContent className="flex justify-between items-start p-0">
				<div className="flex w-11/12 pr-4">
					<Users className="w-6 h-6 text-blue-700 mr-4 mt-1" />
					<div>
						<h4 className="font-semibold text-gray-900">{title}</h4>
						<p className="text-sm text-gray-700">{description}</p>
					</div>
				</div>

				<p className="text-xs text-gray-500 whitespace-nowrap">{date}</p>
			</CardContent>
		</Card>
	);
};
