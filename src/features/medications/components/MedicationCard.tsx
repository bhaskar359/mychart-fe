// src/features/medications/components/MedicationCard.tsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Pill, RefreshCw, CircleMinus } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface MedicationCardProps {
	med: {
		id: string;
		medication_name: string;
		dosage_strength: string;
		form_route: string;
		instructions: string;
		prescription_date: string;
		last_dispensed_date: string | null;
		status: string;
		refill_details: string | null;
		pharmacy_name: string | null;
		pharmacy_phone: string | null;
		type: string;
		physician_first_name: string;
		physician_last_name: string;
	};
}

export const MedicationCard: React.FC<MedicationCardProps> = ({ med }) => {
	const isExpired = med.status === "Expired";
	const isOTC = med.type === "OTC";

	return (
		<Card className="p-6 rounded-3xl shadow-md border border-gray-100 bg-white">
			<CardContent className="p-0 space-y-5">
				{/* Header Section */}
				<div className="flex justify-between items-start">
					<div>
						<h3 className="text-[18px] font-semibold text-[#1E3A8A]">
							{med.medication_name}
						</h3>
						{/* <p className="text-sm text-gray-500 italic">
							Commonly known as:{" "}
							<span className="font-medium not-italic text-gray-600">
								{commonName}
							</span>
						</p> */}
						<div className="flex items-center mt-1 text-[#2563EB] text-sm font-medium cursor-pointer">
							<Info className="h-4 w-4 mr-1" />
							Learn more
						</div>
					</div>
					<Pill className="w-8 h-8 text-[#1E3A8A]" />
				</div>

				{/* Instructions */}
				<div>
					<p className="text-gray-800 text-sm">{med.instructions}</p>
					<p className="text-sm text-gray-500 mt-1">{med.refill_details}</p>
				</div>

				{/* Details Section */}
				<div className="bg-gray-100 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
					{/* Prescription Details */}
					<div>
						<p className="font-medium text-gray-800 mb-1">
							Prescription Details
						</p>
						<p className="text-gray-500">
							Prescribed on{" "}
							<span className="text-gray-700 font-medium">
								{formatDate(med.prescription_date)}
							</span>
						</p>
						<p className="text-gray-500">
							Approved by{" "}
							<span className="text-[#2563EB] font-medium cursor-pointer">
								{med.physician_first_name} {med.physician_last_name}
							</span>
						</p>
					</div>

					{/* Refill Details */}
					{!isExpired && (
						<>
							<div>
								<p className="font-medium text-gray-800 mb-1">Refill Details</p>
								<p className="text-gray-500">Quantity - {med.refill_details}</p>
								<p className="text-gray-500">Day supply - {}</p>
							</div>
							<div>
								<p className="font-medium text-gray-800 mb-1">
									Pharmacy Details
								</p>
								<p className="text-gray-500">{med.pharmacy_name}</p>
								{/* <p className="text-gray-500">{med.pharmacy_address}</p> */}
								<p className="text-gray-500">{med.pharmacy_phone}</p>
							</div>
						</>
					)}
				</div>

				{/* Action Buttons */}

				<div className="flex items-center justify-center gap-3 pt-2">
					{!isExpired && (
						<Button className="bg-[#00529C] hover:bg-[#1E3A8A] text-white rounded-full px-5 py-2 text-sm font-medium flex items-center gap-2 shadow-sm">
							<RefreshCw className="h-4 w-4" />
							Request refill
						</Button>
					)}
					<Button
						variant="outline"
						className="border border-[#00529C] text-[#00529C] hover:shadow rounded-full px-5 py-2 text-sm font-light flex items-center gap-2"
					>
						<CircleMinus className="h-4 w-4" />
						Remove
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};
