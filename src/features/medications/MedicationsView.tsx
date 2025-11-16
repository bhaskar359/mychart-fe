// src/features/medications/MedicationsView.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	AlertCircle,
	ArrowLeft,
	Plus,
	Printer,
	Stethoscope,
	HeartPulse,
} from "lucide-react";
import { MedicationCard } from "./components/MedicationCard";
import { MedicationsSkeleton } from "../skeletons/MedicationsSkeleton";
import { useMedications } from "@/hooks/useMedications";
import Allergy from "@/assets/Allergy.svg";
import Immuninization from "@/assets/Immunization.svg";
import PreventiveCare from "@/assets/Preventive Care.svg";
import { HomePageButton } from "@/components/layout/HomePageButton";
import { RequestRefillsModal } from "./components/RequestRefillsModal";

export const MedicationsView: React.FC = () => {
	const { medications, isLoading, isError, error, getRefilledFromStorage } =
		useMedications();
	const [open, setOpen] = useState(false);
	const [refresh, setRefresh] = useState(false);

	const requested = getRefilledFromStorage();
	const allRequested = medications
		.filter((m) => m.status === "Active")
		.every((m) => requested.includes(m.id.toString()));

	const handleSuccess = () => {
		setRefresh((x) => !x); // force re-render
	};

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
				<div className="grow lg:w-3/4 bg-[#F4F5F6] pl-10 rounded-r-4xl inset-shadow-[0px_4px_25px_3px_rgba(0,0,0,0.25)] px-15 py-6">
					<div className="flex justify-between">
						<h1 className="text-3xl font-semibold text-[#003D72] mb-6">
							Medications
						</h1>
						<div className="flex gap-4">
							<Button
								disabled={allRequested}
								onClick={() => setOpen(true)}
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
						<Card className="border-dashed border-2 border-gray-300 bg-gray-50 flex items-center justify-center min-h-[200px]">
							<Button
								variant="ghost"
								className="text-[#00529C] cursor-pointer font-light flex items-center hover:text-[#00529c] hover:bg-gray-50"
							>
								<Plus className="w-5 h-5 border border-[#00529C] rounded-full p-0.5" />
								Add a personal note
							</Button>
						</Card>
					</div>
				</div>

				{/* B. Sidebar Column (Related Links) */}
				<div className="grow lg:w-1/4 bg-[#F4F5F6] rounded-l-4xl inset-shadow-[0px_4px_25px_3px_rgba(0,0,0,0.25)]  p-6">
					<h3 className="text-lg font-bold text-[#003D72] mb-4">
						Related Links
					</h3>
					<ul className="space-y-3 text-sm text-[#00529C]">
						<li className="hover:underline flex cursor-pointer">
							<Stethoscope size={18} className="pr-1" />
							Health Summary
						</li>
						<li className="hover:underline flex cursor-pointer">
							<HeartPulse size={18} className="pr-1" />
							Health Issues
						</li>
						<li className="hover:underline flex cursor-pointer">
							<img src={Allergy} alt="Allergy" className="w-4 h-4 mr-1" />
							Allergies
						</li>
						<li className="hover:underline flex cursor-pointer">
							<img
								src={Immuninization}
								alt="Immunization"
								className="w-4 h-4 mr-1"
							/>
							Immunization
						</li>
						<li className="hover:underline flex cursor-pointer">
							<img
								src={PreventiveCare}
								alt="Preventive Care"
								className="w-4 h-4 mr-1"
							/>
							Preventive Care
						</li>
					</ul>
				</div>
			</div>

			<div className="pl-10">
				<h2 className="text-xl font-semibold text-gray-800 mt-12 mb-4">
					Personal Notes About My Medications
				</h2>
				<p className="text-sm text-muted-foreground mb-4">
					Notes entered here will not be viewable by your doctor.
				</p>

				<Card className="w-8/12 border-dashed border-2 border-gray-300 bg-gray-50 flex items-center justify-center min-h-[100px]">
					<Button
						variant="ghost"
						className="text-[#00529C] cursor-pointer font-normal flex items-center hover:text-[#00529c] hover:bg-gray-50"
					>
						<Plus className="w-5 h-5 border border-[#00529C] rounded-full p-0.5" />
						Add a personal note
					</Button>
				</Card>
			</div>
			<HomePageButton />
			<RequestRefillsModal
				open={open}
				onClose={() => setOpen(false)}
				medications={medications}
				onSuccess={handleSuccess}
			/>
		</div>
	);
};
