// src/features/medications/MedicationsView.tsx

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	AlertCircle,
	ArrowLeft,
	Plus,
	Printer,
	Stethoscope,
} from "lucide-react";
import { MedicationCard } from "./components/MedicationCard";
import { MedicationsSkeleton } from "../skeletons/MedicationsSkeleton";
import { useMedications } from "@/hooks/useMedications";

export const MedicationsView: React.FC = () => {
	const { medications, isLoading, isError, error } = useMedications();

	if (isLoading) {
		return <MedicationsSkeleton />;
	}
	if (isError) {
		return (
			<div className="max-w-7xl mx-auto px-4 py-16 text-center">
				<AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
				<h1 className="text-2xl font-semibold text-red-700">
					Error Loading Medications
				</h1>
				<p className="text-muted-foreground mt-2">
					Failed to retrieve your medication list. Please contact support if
					this continues.
				</p>
				<p className="text-xs text-gray-500 mt-1">
					{error instanceof Error ? error.message : "Unknown error"}
				</p>
			</div>
		);
	}

	return (
		<div className="mx-auto py-10">
			<div className="flex flex-col lg:flex-row gap-8">
				{/* A. Main Content Column */}
				<div className="grow lg:w-3/4 bg-[#F4F5F6] pl-10 rounded-r-4xl inset-shadow-[0px_4px_25px_3px_rgba(0,0,0,0.25)] inset-shadow-gray-200 px-15 py-6">
					<div className="flex justify-between">
						<h1 className="text-2xl font-semibold text-[#003D72] mb-6">
							Medications
						</h1>
						<div className="flex gap-4">
							<Button
								variant="outline"
								className="flex items-center rounded-xl justify-center gap-2 border border-[#B9D1F1] text-[#2563EB] bg-[#EAF2FF] hover:rounded-2xl px-3 py-5 text-sm font-light shadow-sm transition-all"
							>
								Request refills
							</Button>
							{/* print button from lucide icons to print the medications */}
							<Link to="#" onClick={() => window.print()}>
								<Printer className="h-10 w-8 text-custom-secondary" />
							</Link>
						</div>
					</div>

					<h2 className="text-xl font-semibold text-[#003D72] mb-4">
						Current Medications
					</h2>

					{/* Action and Alert Area */}
					<p className="text-sm">
						Please review your medications and verify that the list is up to
						date.
						<span className="text-red-600">
							Call 911 if you have an emergency.
						</span>
					</p>

					<p className="text-sm font-semibold text-black mt-2 mb-10">
						Need to update your list of pharmacies?
						<a
							href="#"
							className="text-[#00529C] hover:underline ml-1 font-light"
						>
							Go to Manage My Pharmacies.
						</a>
					</p>

					{/* Current Medications List */}
					<div className="space-y-4">
						{medications.length > 0 ? (
							medications.map((med) => (
								<MedicationCard key={med.id} med={med} />
							))
						) : (
							<div className="p-4 text-center bg-gray-50 rounded-lg border border-dashed text-muted-foreground">
								No active medications found.
							</div>
						)}
					</div>

					<div className="my-8 text-center">
						<Button
							variant="outline"
							className="text-blue-600 border-blue-300 hover:bg-blue-50"
						>
							<Plus className="w-4 h-4 mr-2" /> Report a medication
						</Button>
					</div>
				</div>

				{/* B. Sidebar Column (Related Links) */}
				<div className="grow lg:w-1/4 bg-[#F4F5F6] rounded-l-4xl inset-shadow-[0px_4px_25px_3px_rgba(0,0,0,0.25)] inset-shadow-gray-200 p-6">
					<h3 className="text-lg font-bold text-[#003D72] mb-4">
						Related Links
					</h3>
					<ul className="space-y-3 text-sm text-[#00529C]">
						<li className="hover:underline flex cursor-pointer">
							<Stethoscope size={18} />
							Health Summary
						</li>
						<li className="hover:underline flex cursor-pointer">
							<Stethoscope size={18} />
							Health Issues
						</li>
						<li className="hover:underline flex cursor-pointer">Allergies</li>
						<li className="hover:underline flex cursor-pointer">
							Immunization
						</li>
						<li className="hover:underline flex cursor-pointer">
							Preventive Care
						</li>
					</ul>
				</div>
			</div>

			<div className="pl-10 lg:w-3/4">
				{/* Personal Notes Section */}
				<h2 className="text-xl font-semibold text-gray-800 mt-12 mb-4">
					Personal Notes About My Medications
				</h2>
				<p className="text-sm text-muted-foreground mb-4">
					Notes entered here will not be viewable by your doctor.
				</p>

				<Card className="w-3/4 border-dashed border-2 border-gray-300 bg-gray-50 flex items-center justify-center min-h-[100px]">
					<Button
						variant="ghost"
						className="text-blue-600 hover:bg-transparent"
					>
						<Plus className="w-5 h-5 mr-2" /> Add a personal note
					</Button>
				</Card>
			</div>
		</div>
	);
};
