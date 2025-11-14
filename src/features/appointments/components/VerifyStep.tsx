// src/features/appointments/components/VerifyStep.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ImagingFormState } from "../types";

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

			<div className="space-y-4 text-sm text-gray-700">
				<div>
					<div className="text-xs font-semibold text-gray-500">Location</div>
					<div>{form.locationName}</div>
					<div className="text-xs text-gray-500">{form.locationAddress}</div>
				</div>

				<div>
					<div className="text-xs font-semibold text-gray-500">Date & Time</div>
					<div>
						{form.appointmentDate} {form.appointmentTime}
					</div>
				</div>

				<div>
					<div className="text-xs font-semibold text-gray-500">Insurance</div>
					<div>{form.haveInsurance ? "Yes" : "No"}</div>
					{form.haveInsurance && (
						<div className="text-xs text-gray-600">
							{form.insuranceCompany} — {form.memberName} ({form.memberNumber})
						</div>
					)}
				</div>

				<div>
					<div className="text-xs font-semibold text-gray-500">
						Accident / Liability
					</div>
					<div>{form.examRelatedToAccident ? "Yes" : "No"}</div>
				</div>

				<div>
					<div className="text-xs font-semibold text-gray-500">
						Additional notes
					</div>
					<div>{form.referringProviderAddress}</div>
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
