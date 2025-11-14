import React, { useState, useEffect } from "react";
import {
	useSearchParams,
	useParams,
	Link,
	useNavigate,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useAppointmentById } from "@/hooks/useAppointments";
import { format } from "date-fns";

// PDF placeholder (unchanged)
const mockPdfUrl = "/visit.pdf"; // public file must be referenced from root

// DYNAMIC NOTES CONFIG
// Each note gets its own HTML file inside /public/notes/
const NOTE_FILES: Record<number, string> = {
	1: "/notes/progress-notes.html",
	2: "/notes/patient-instructions.html",
};

const mockNotes = [
	{
		id: 1,
		title: "Progress Notes",
		provider: "Diego Riveros, MD",
		date: "Apr 28, 2025, 5:05 PM",
	},
	{
		id: 2,
		title: "Krames Patient Instructions",
		provider: "Nurse Ronisha, RN",
		date: "Apr 28, 2025, 4:04 PM",
	},
];

export const VisitDetailsView: React.FC = () => {
	const navigate = useNavigate();
	const { visitId } = useParams();
	const {
		data: appointment,
		isLoading,
		isError,
		error,
	} = useAppointmentById(visitId!);

	const [searchParams] = useSearchParams();

	const initialTab = searchParams.get("tab") || "summary";

	const [tab, setTab] = useState<"summary" | "notes">(
		initialTab === "notes" ? "notes" : "summary"
	);

	const [selectedNote, setSelectedNote] = useState<number | null>(null);
	const [content, setContent] = useState("");

	const noteToShow = mockNotes.find((n) => n.id === selectedNote);

	// Load the correct HTML file when note changes
	useEffect(() => {
		if (!selectedNote) return;

		const filePath = NOTE_FILES[selectedNote];

		if (filePath) {
			fetch(filePath)
				.then((res) => res.text())
				.then((html) => setContent(html))
				.catch(() => setContent("<p>Error loading note.</p>"));
		}
	}, [selectedNote]);

	if (isLoading) {
		return <div className="p-6">Loading appointment details...</div>;
	}

	if (isError) {
		return (
			<div className="p-6 text-red-600">
				Failed to load appointment: {error?.message}
			</div>
		);
	}

	if (!appointment) {
		return <div className="p-6">No appointment found.</div>;
	}
	console.log(appointment);

	return (
		<div className="grow bg-[#F4F5F6] pl-10 rounded-r-4xl inset-shadow-[0px_4px_25px_3px_rgba(0,0,0,0.25)] inset-shadow-gray-200 p-6">
			{/* Back Button */}
			<div className="flex items-center mb-6">
				<button
					onClick={() => navigate(-1)}
					className="text-[#00529C] hover:text-blue-800 border font-light cursor-pointer rounded-full transition-colors mr-2"
					aria-label="Go back to Schedule an Appointment"
				>
					<ArrowLeft className="w-8 h-8" />
				</button>
				<h1 className="ml-2 text-2xl font-bold text-[#003D72]">
					{appointment.appointment_type} -{" "}
					{format(appointment.appointment_date, "MMM d, yyyy")}
				</h1>
			</div>

			{/* TAB BUTTONS */}
			<div className="flex gap-1 mb-6">
				<Button
					variant="secondary"
					className={`rounded-r-none px-6 w-1/2 ${
						tab === "summary" ? "bg-[#00529C] text-white" : "bg-gray-200"
					}`}
					onClick={() => {
						setTab("summary");
						setSelectedNote(null);
					}}
				>
					After Visit Summary
				</Button>

				<Button
					variant="secondary"
					className={`px-6 rounded-l-none w-1/2 ${
						tab === "notes" ? "bg-[#00529C] text-white" : "bg-gray-200"
					}`}
					onClick={() => {
						setTab("notes");
						setSelectedNote(null);
					}}
				>
					Notes from Care Team
				</Button>
			</div>

			{/* ========== SUMMARY TAB ========== */}
			{tab === "summary" && (
				<>
					<h2 className="text-xl mb-2 font-semibold text-[#003D72]">
						After Visit Summary
					</h2>
					<p>
						Some of this information might have changed since your visit. This
						is what your chart included on the day of your visit.
					</p>
					<div className="bg-white rounded-xl shadow-md p-6">
						<iframe
							src={mockPdfUrl}
							className="w-full h-[80vh] border rounded-lg"
							title="After Visit Summary PDF"
						></iframe>
					</div>
				</>
			)}

			{/* ========== NOTES TAB LIST ========== */}
			{tab === "notes" && (
				<div>
					<h2 className="text-xl mb-2 font-semibold text-[#003D72]">
						Notes from Care Team
					</h2>
					{!selectedNote && (
						<div className="bg-white rounded-xl border border-gray-300 overflow-hidden">
							{mockNotes.map((note, idx) => (
								<div
									key={note.id}
									className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 cursor-pointer"
									onClick={() => setSelectedNote(note.id)}
								>
									{/* Left: Title + Date */}
									<div>
										<h3 className="text-lg text-[#00529C] font-semibold">
											{note.title}
										</h3>
										<p className="text-sm text-gray-600">Signed {note.date}</p>
									</div>

									{/* Right: Provider */}
									<div className="flex items-center gap-2 text-gray-700 font-medium">
										<div className="h-10 w-10 bg-[#DBDBDB] rounded-full flex items-center justify-center">
											<User className="h-8 w-8 p-0.5 bg-[#DBDBDB] rounded-full" />
										</div>
										{note.provider}
									</div>

									{/* Divider (except last item) */}
									{idx !== mockNotes.length - 1 && (
										<div className="absolute left-6 right-6 bottom-0 border-b border-gray-200"></div>
									)}
								</div>
							))}
						</div>
					)}

					{/* ========== SINGLE NOTE VIEW ========== */}
					{selectedNote && noteToShow && (
						<div className="mt-6 bg-white p-6 rounded-xl shadow-md">
							<Button
								variant="secondary"
								className="mb-4 text-[#00529C]"
								onClick={() => setSelectedNote(null)}
							>
								← Back to Notes
							</Button>

							<h2 className="text-2xl font-bold text-[#003D72] mb-2">
								{noteToShow.title}
							</h2>
							<p className="text-gray-500 mb-4">{noteToShow.date}</p>

							<div className="whitespace-pre-line text-gray-800 leading-relaxed">
								<div dangerouslySetInnerHTML={{ __html: content }} />
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
