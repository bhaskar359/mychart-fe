// src/features/appointments/components/TimeStep.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import type { ImagingFormState } from "../types/";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

/**
 * Mock available times. Replace with real API later.
 */
const MOCK_TIMES = ["07:30", "08:30", "09:30", "10:30"];

interface Props {
	form: ImagingFormState;
	onChange: (patch: Partial<ImagingFormState>) => void;
	onNext: () => void;
	onBack: () => void;
}

export const TimeStep: React.FC<Props> = ({
	form,
	onChange,
	onNext,
	onBack,
}) => {
	// Today at midnight
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	// Convert stored YYYY-MM-DD → Date
	const selectedDate = form.appointmentDate
		? new Date(form.appointmentDate + "T00:00:00")
		: undefined;

	// Convert JS Date → YYYY-MM-DD in LOCAL TIME (Fix timezone bug)
	const toLocalISO = (date: Date) => date.toLocaleDateString("en-CA"); // YYYY-MM-DD

	return (
		<div className="min-h-[320px]">
			<h2 className="text-xl text-[#003D72] mb-4">What time works for you?</h2>

			<div className="space-y-4">
				<label className="text-lg text-gray-700 block mb-2">
					Select appointment date
				</label>

				{/* DATE PICKER USING SHADCN CALENDAR */}
				<Popover>
					<PopoverTrigger asChild>
						<button className="w-[240px] flex items-center justify-between px-3 py-2 border rounded-md bg-white text-left">
							{selectedDate ? (
								<span>{format(selectedDate, "PPP")}</span>
							) : (
								<span className="text-gray-500">Pick a date</span>
							)}
							<CalendarIcon className="h-4 w-4 opacity-60" />
						</button>
					</PopoverTrigger>

					<PopoverContent className="p-0">
						<Calendar
							mode="single"
							selected={selectedDate}
							onSelect={(date) => {
								if (!date) return;

								// FIX: Save date in LOCAL YYYY-MM-DD format
								const isoLocal = toLocalISO(date);
								onChange({ appointmentDate: isoLocal });
							}}
							disabled={(date) => {
								const d = new Date(date);
								d.setHours(0, 0, 0, 0);
								return d <= today; // Disable today + past
							}}
							initialFocus
						/>
					</PopoverContent>
				</Popover>

				{/* SELECT TIME */}
				<div>
					<label className="text-lg text-gray-700 block mb-2">
						Available Slots
					</label>

					<div className="flex gap-3 flex-wrap">
						{MOCK_TIMES.map((t) => {
							const selected = form.appointmentTime === t;

							return (
								<button
									key={t}
									onClick={() => onChange({ appointmentTime: t })}
									className={`px-4 py-2 rounded-full border ${
										selected
											? "bg-[#00529C] text-white"
											: "bg-white text-gray-700"
									}`}
								>
									{t} EDT
								</button>
							);
						})}
					</div>
				</div>
			</div>

			{/* ACTION BUTTONS */}
			<div className="mt-8 flex justify-between">
				<Button variant="outline" onClick={onBack}>
					Back
				</Button>

				<Button
					onClick={onNext}
					disabled={!form.appointmentDate || !form.appointmentTime}
					className="bg-[#00529C] text-white"
				>
					Continue
				</Button>
			</div>
		</div>
	);
};
