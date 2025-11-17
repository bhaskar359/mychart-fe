import React from "react";
import { Card } from "@/components/ui/card";
import { FileText, CalendarCheck, Microscope, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DocumentCenterView: React.FC = () => {
	const navigate = useNavigate();

	// Dummy Data (You can later replace with API results)
	const appointmentDocs = [
		{
			id: "appt-1",
			title: "Visit Summary - Oct 20, 2025",
			description: "Provider: Diego Riveros • USF Student Health Services",
			file: "../../public/notes/after-visit-summary.html",
			type: "appointment",
		},
	];

	const statementDocs = [
		{
			id: "stmt-1",
			title: "Billing Statement - April 2025",
			description: "USF Student Health Services",
			file: "../../public/statement.pdf",
			type: "statement",
		},
	];

	const testReportDocs = [
		{
			id: "lab-1",
			title: "Blood Test Report - CBC",
			description: "Ordered by Dr. Johnson",
			file: "../../public/results/cbc.pdf",
			type: "test-report",
		},
	];

	const allDocs = [...appointmentDocs, ...statementDocs, ...testReportDocs];

	const getIcon = (type: string) => {
		switch (type) {
			case "appointment":
				return <CalendarCheck className="w-6 h-6 text-blue-700" />;
			case "statement":
				return <FileText className="w-6 h-6 text-green-700" />;
			case "test-report":
				return <Microscope className="w-6 h-6 text-purple-700" />;
			default:
				return <FileText className="w-6 h-6 text-gray-600" />;
		}
	};

	return (
		<div className="p-8">
			<div className="flex mb-6 items-center">
				<button
					onClick={() => navigate(-1)}
					className="text-[#00529C] hover:text-blue-800 border font-light cursor-pointer rounded-full transition-colors mr-4"
					aria-label="Go back to Schedule an Appointment"
				>
					<ArrowLeft className="w-8 h-8" />
				</button>
				<h1 className="text-3xl font-bold text-[#00529C]">Document Center</h1>
			</div>

			<div className="grid grid-cols-2 gap-4">
				{allDocs.map((doc) => (
					<Card
						key={doc.id}
						className="p-4 flex items-center justify-between bg-[#F4F5F6] shadow-sm hover:shadow-md cursor-pointer rounded-xl"
						onClick={() => navigate(`/document/${doc.id}`, { state: doc })}
					>
						<div className="flex items-center gap-4">
							{getIcon(doc.type)}
							<div>
								<h3 className="font-semibold text-lg text-[#00529C]">
									{doc.title}
								</h3>
								<p className="text-sm text-gray-600">{doc.description}</p>
							</div>
						</div>

						<span className="text-sm text-blue-600 underline">View</span>
					</Card>
				))}
			</div>
		</div>
	);
};
