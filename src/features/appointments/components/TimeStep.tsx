// src/features/appointments/components/TimeStep.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ImagingFormState } from "../types";

/**
 * Simple mock of available times per date. Replace with real availability API.
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
	const today = new Date().toISOString().slice(0, 10);

	return (
		<Card className="p-8 min-h-[320px]">
			<h2 className="text-xl font-bold text-[#003D72] mb-4">
				What time works for you?
			</h2>

			<div className="space-y-4">
				<label className="text-sm text-gray-700">Select appointment date</label>
				<input
					type="date"
					value={form.appointmentDate || today}
					min={today}
					onChange={(e) => onChange({ appointmentDate: e.target.value })}
					className="rounded border px-3 py-2"
				/>

				<div>
					<label className="text-sm text-gray-700 block mb-2">
						Available times
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
		</Card>
	);
};
