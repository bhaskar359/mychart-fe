// src/features/appointments/components/VerifyStep.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ImagingFormState } from "../types";
import { Clock5, Hospital, Stethoscope } from "lucide-react";

interface Props {
	form: ImagingFormState;
	onBack: () => void;
	onSubmit: () => void;
	submitting: boolean;
}

export const VerifyStep: React.FC<Props> = ({
	form,
	onBack,
	onSubmit,
	submitting,
}) => {
	return (
		<Card className="p-8 min-h-[320px]">
			<h2 className="text-xl font-bold text-[#003D72] mb-4">
				Verify & Schedule
			</h2>

			<div className="space-y-10 text-md text-gray-700">
				<div className="flex gap-4 items-center">
					<Stethoscope className="text-[#0085F2]" size={40} />
					<div className="text-xs font-semibold text-gray-500">
						Appointment Type
						<div>{form.appointmentType}</div>
					</div>
				</div>
				<div className="flex gap-4 items-center">
					<Hospital className="text-[#0085F2]" size={40} />
					<div className="text-xs font-semibold text-gray-500">
						Location:
						<div>{form.locationName}</div>
						<div className="text-xs text-gray-500">{form.locationAddress}</div>
					</div>
				</div>

				<div className="flex gap-4 items-center">
					<Clock5 className="text-[#0085F2]" size={40} />
					<div className="text-xs font-semibold text-gray-500">
						Date & Time:
						<div>{form.appointmentDate}</div>
						<div className="text-xs text-gray-500">{form.appointmentTime}</div>
					</div>
				</div>
			</div>

			<div className="mt-8 flex justify-between">
				<Button variant="outline" onClick={onBack}>
					Back
				</Button>

				<Button
					onClick={onSubmit}
					disabled={submitting}
					className="bg-[#00529C] text-white px-6 py-2"
				>
					{submitting ? "Scheduling..." : "Schedule It"}
				</Button>
			</div>
		</Card>
	);
};
