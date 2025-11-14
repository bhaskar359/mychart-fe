// src/features/appointments/components/LocationStep.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ImagingFormState } from "../types";

/**
 * Mock location list - replace with real data from API.
 */
const MOCK_LOCATIONS = [
	{
		id: "loc-1",
		name: "TGHI Bayonet Point",
		address: "7525 State Road 52, Bayonet Point FL 34667-6717",
	},
	{
		id: "loc-2",
		name: "TGHI Bloomingdale",
		address: "3069 Grand Pavilion Drive, Tampa FL 33613-3757",
	},
	{
		id: "loc-3",
		name: "TGHI Carrollwood",
		address: "123 Carrollwood Ave, Tampa FL 33618",
	},
];

interface Props {
	form: ImagingFormState;
	onChange: (patch: Partial<ImagingFormState>) => void;
	onNext: () => void;
	onBack: () => void;
}

export const LocationStep: React.FC<Props> = ({
	form,
	onChange,
	onNext,
	onBack,
}) => {
	return (
		<Card className="p-8 min-h-[320px]">
			<h2 className="text-xl font-bold text-[#003D72] mb-4">
				Which locations work for you?
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{MOCK_LOCATIONS.map((loc) => {
					const selected = form.locationId === loc.id;
					return (
						<div
							key={loc.id}
							onClick={() =>
								onChange({
									locationId: loc.id,
									locationName: loc.name,
									locationAddress: loc.address,
								})
							}
							className={`p-4 rounded-2xl border cursor-pointer transition ${
								selected
									? "border-[#00529C] bg-white shadow"
									: "border-gray-200 bg-gray-50"
							}`}
						>
							<div className="text-[#00529C] font-semibold text-lg">
								{loc.name}
							</div>
							<div className="text-sm text-gray-600 mt-1">{loc.address}</div>
						</div>
					);
				})}
			</div>

			<div className="mt-8 flex justify-between">
				<Button variant="outline" onClick={onBack} className="px-6 py-2">
					Back
				</Button>

				<Button
					onClick={onNext}
					disabled={!form.locationId}
					className="bg-[#00529C] text-white px-6 py-2 rounded-lg"
				>
					Continue
				</Button>
			</div>
		</Card>
	);
};
