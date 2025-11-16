// src/features/appointments/components/QuestionnaireStep.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import type { ImagingFormState } from "../types";

interface Props {
	form: ImagingFormState;
	onChange: (patch: Partial<ImagingFormState>) => void;
	onNext: () => void;
	onBack: () => void;
}

const APPOINTMENT_TYPES = [
	"Bone Density or DEXA",
	"CT or CTA",
	"Mammography",
	"MRI or MRA",
	"Ultrasound or Sonogram",
	"Fluoroscopy",
	"Nuclear Medicine",
	"Biopsy",
	"PET Scan",
	"XRAY",
];

export const QuestionnaireStep: React.FC<Props> = ({
	form,
	onChange,
	onNext,
	onBack,
}) => {
	const valid =
		!!form.appointmentType && // ← NEW REQUIRED FIELD
		form.examRelatedToAccident !== undefined &&
		form.haveInsurance !== undefined &&
		(form.haveInsurance
			? !!form.insuranceCompany &&
			  !!form.memberName &&
			  !!form.memberNumber &&
			  !!form.insurancePhone
			: true);

	return (
		<div className="min-h-[320px]">
			<h2 className="text-xl text-[#003D72] mb-4">
				First, we need some information
			</h2>

			<div className="mb-6">
				<p className="text-lg text-gray-700 mb-3">Appointment Type?</p>

				<div className="flex flex-wrap gap-3">
					{APPOINTMENT_TYPES.map((type) => (
						<Button
							key={type}
							onClick={() => onChange({ appointmentType: type })}
							variant={form.appointmentType === type ? "default" : "outline"}
							// className={`px-4 py-2 rounded-lg border transition
							//                   ${
							// 										form.appointmentType === type
							// 											? "bg-[#1A4A93] text-white border-[#1A4A93]"
							// 											: "bg-white text-gray-700 border-gray-300"
							// 									}`}
						>
							{type}
						</Button>
					))}
				</div>
			</div>

			<div className="space-y-6">
				<div className="flex justify-between items-center py-4 border-y border-gray-200">
					<label className="text-lg text-gray-700">
						Is this exam related to an accident, fall or liability?
					</label>
					<div className="flex space-x-2">
						<Button
							variant={
								form.examRelatedToAccident === true ? "default" : "outline"
							}
							onClick={() => onChange({ examRelatedToAccident: true })}
						>
							Yes
						</Button>
						<Button
							variant={
								form.examRelatedToAccident === false ? "default" : "outline"
							}
							onClick={() => onChange({ examRelatedToAccident: false })}
						>
							No
						</Button>
					</div>
				</div>

				<div className="flex justify-between items-center py-4 border-y border-gray-200">
					<label className="text-lg text-gray-700">
						Do you currently have health insurance?
					</label>
					<div className="flex space-x-2">
						<Button
							variant={form.haveInsurance === true ? "default" : "outline"}
							onClick={() => onChange({ haveInsurance: true })}
						>
							Yes
						</Button>
						<Button
							variant={form.haveInsurance === false ? "default" : "outline"}
							onClick={() => onChange({ haveInsurance: false })}
						>
							No
						</Button>
					</div>
				</div>

				{form.haveInsurance && (
					<div className="space-y-3">
						<label className="text-sm text-gray-700">
							What is the name of your Insurance Company?
						</label>
						<input
							value={form.insuranceCompany || ""}
							onChange={(e) => onChange({ insuranceCompany: e.target.value })}
							className="w-full rounded border-gray-400 border px-3 py-2"
						/>

						<label className="text-sm text-gray-700">
							What is the member name listed on your insurance card?
						</label>
						<input
							value={form.memberName || ""}
							onChange={(e) => onChange({ memberName: e.target.value })}
							className="w-full rounded border-gray-400 border px-3 py-2"
						/>

						<label className="text-sm text-gray-700">
							What is the member number listed on your insurance card?
						</label>
						<input
							value={form.memberNumber || ""}
							onChange={(e) => onChange({ memberNumber: e.target.value })}
							className="w-full rounded border-gray-400 border px-3 py-2"
						/>

						<label className="text-sm text-gray-700">
							What is the phone number listed on your insurance card?
						</label>
						<input
							value={form.insurancePhone || ""}
							onChange={(e) => onChange({ insurancePhone: e.target.value })}
							className="w-full rounded border-gray-400 border px-3 py-2"
						/>

						<label className="text-sm text-gray-700">
							What is the referring/ordering provider's street address?
						</label>
						<input
							value={form.referringProviderAddress || ""}
							onChange={(e) =>
								onChange({ referringProviderAddress: e.target.value })
							}
							className="w-full rounded border-gray-400 border px-3 py-2"
						/>
					</div>
				)}
			</div>

			<div className="mt-8 flex justify-between">
				<Button variant="outline" onClick={onBack} className="px-6 py-2">
					Back
				</Button>

				<Button
					onClick={onNext}
					disabled={!valid}
					className="bg-[#00529C] text-white px-6 py-2 rounded-lg"
				>
					Continue
				</Button>
			</div>
		</div>
	);
};
