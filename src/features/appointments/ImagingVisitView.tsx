// src/features/appointments/ImagingVisitView.tsx

import React, { useState } from "react";
import { ScheduleStepper } from "./components/ScheduleStepper";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// 5 steps as per the Figma screenshot
const APPOINTMENT_STEPS = [
	{ id: 1, title: "Schedule Imaging Visit", subtitle: "Reason for Visit" },
	{ id: 2, title: "Questionnaire" },
	{ id: 3, title: "Location" },
	{ id: 4, title: "Time" },
	{ id: 5, title: "Verify & Schedule" },
];

export const ImagingVisitView: React.FC = () => {
	const navigate = useNavigate();

	// State to track the current step (starts at 1, matching the screenshot)
	const [currentStep, setCurrentStep] = useState(1);

	// State for the form question (matches Yes/No buttons in the screenshot)
	const [scheduleMoreThanOne, setScheduleMoreThanOne] = useState<
		boolean | null
	>(null);

	const handleContinue = () => {
		// In a real application, this would validate the form and navigate to step 2
		console.log("Navigating to Questionnaire (Step 2)...");
		setCurrentStep(2);
	};

	return (
		<div className="p-6 md:p-10 lg:p-12 bg-white flex-grow">
			<div className="mx-auto">
				{/* Back Link and Title */}
				<div className="flex items-center mb-6">
					<button
						onClick={() => navigate(-1)} // Go back to the previous page (/appointments)
						className="text-gray-700 hover:text-blue-800 transition-colors mr-4"
						aria-label="Go back to Schedule an Appointment"
					>
						<ArrowLeft className="w-6 h-6" />
					</button>
					<h1 className="text-2xl font-semibold text-gray-800">
						Schedule an Appointment — Imaging Visit
					</h1>
				</div>

				{/* 5-Step Stepper Component */}
				<ScheduleStepper currentStep={currentStep} steps={APPOINTMENT_STEPS} />

				{/* Form Content Area (Step 1) */}
				<div className="p-8 shadow-lg border-gray-100 min-h-[300px] flex flex-col justify-between">
					<div>
						<h2 className="text-xl font-bold text-gray-800 mb-6">
							First, we need some information
						</h2>

						{/* Question and Yes/No Buttons */}
						<div className="flex justify-between items-center py-4 border-y border-gray-200">
							<label className="text-lg text-gray-700">
								Do you need to schedule more than one (1) exam?
							</label>
							<div className="flex space-x-2">
								<Button
									variant={scheduleMoreThanOne === true ? "default" : "outline"}
									onClick={() => setScheduleMoreThanOne(true)}
									className={
										scheduleMoreThanOne === true
											? "bg-blue-800 hover:bg-blue-700 text-white"
											: "text-gray-700 hover:bg-gray-100"
									}
								>
									Yes
								</Button>
								<Button
									variant={
										scheduleMoreThanOne === false ? "default" : "outline"
									}
									onClick={() => setScheduleMoreThanOne(false)}
									className={
										scheduleMoreThanOne === false
											? "bg-blue-800 hover:bg-blue-700 text-white"
											: "text-gray-700 hover:bg-gray-100"
									}
								>
									No
								</Button>
							</div>
						</div>
					</div>

					{/* Continue Button (matches the screenshot styling) */}
					<div className="mt-8 text-center">
						<Button
							onClick={handleContinue}
							disabled={scheduleMoreThanOne === null}
							className="
                                bg-blue-500 
                                hover:bg-blue-600 
                                text-white 
                                font-semibold 
                                px-8 
                                py-3 
                                rounded-lg
                                shadow-lg
                                disabled:bg-gray-300
                            "
						>
							Continue
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
