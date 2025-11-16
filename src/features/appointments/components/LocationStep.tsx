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
		name: "USF Health Morsani Center",
		address: "13330 USF Laurel Drive, Tampa FL 33612",
	},
	{
		id: "loc-2",
		name: "USF Student Health Services",
		address: "4202 E Fowler Avenue, Tampa FL 33620",
	},
	{
		id: "loc-3",
		name: "TGH Health Medical Center – Carrollwood",
		address: "4106 W Lakeview Drive, Tampa FL 33614",
	},
	{
		id: "loc-4",
		name: "Tampa General Hospital Family Care Center – Healthpark",
		address: "5802 N 30th Street, Tampa FL 33610",
	},
	{
		id: "loc-5",
		name: "TGH Family Care Center – Kennedy",
		address: "2501 W Kennedy Blvd, Tampa FL 33609",
	},
	{
		id: "loc-6",
		name: "AdventHealth Tampa",
		address: "3100 E Fletcher Avenue, Tampa FL 33613",
	},
	{
		id: "loc-7",
		name: "AdventHealth Carrollwood",
		address: "7171 N Dale Mabry Hwy, Tampa FL 33614",
	},
	{
		id: "loc-8",
		name: "BayCare St. Joseph’s Hospital",
		address: "3001 W Dr Martin Luther King Jr Blvd, Tampa FL 33607",
	},
	{
		id: "loc-9",
		name: "BayCare Wesley Chapel Hospital",
		address: "2600 Bruce B Downs Blvd, Wesley Chapel FL 33544",
	},
	{
		id: "loc-10",
		name: "Moffitt Cancer Center – Magnolia Campus",
		address: "12902 USF Magnolia Drive, Tampa FL 33612",
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
		<div className="min-h-[320px]">
			<h2 className="text-xl borber-b border-gray-400 text-[#003D72] mb-4">
				First, we need some information
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
		</div>
	);
};
