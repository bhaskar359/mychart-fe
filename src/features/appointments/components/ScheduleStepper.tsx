// src/features/appointments/components/ScheduleStepper.tsx

import React from "react";

// Define the steps structure
interface Step {
	id: number;
	title: string;
	subtitle?: string; // Used for "Reason for Visit"
}

interface ScheduleStepperProps {
	currentStep: number;
	steps: Step[];
}

export const ScheduleStepper: React.FC<ScheduleStepperProps> = ({
	currentStep,
	steps,
}) => {
	return (
		<div className="flex justify-between items-start space-x-4 mb-8">
			{steps.map((step, index) => {
				const isCurrent = step.id === currentStep;
				const isCompleted = step.id < currentStep;

				// Determine styling based on state
				const numberClasses = isCurrent
					? "bg-blue-800 text-white"
					: isCompleted
					? "bg-green-600 text-white"
					: "bg-gray-200 text-gray-500";

				const textClasses = isCurrent
					? "text-blue-800 font-bold"
					: "text-gray-600";

				return (
					<React.Fragment key={step.id}>
						{/* Step Indicator */}
						<div className="flex flex-col items-start min-w-0">
							<div className="flex items-center">
								{/* Step Number Circle */}
								<div
									className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mr-2 flex-shrink-0 ${numberClasses}`}
								>
									{step.id}
								</div>
								{/* Step Text */}
								<div
									className={`flex flex-col text-left ${textClasses} text-sm whitespace-nowrap`}
								>
									{step.subtitle && (
										<span className="text-xs text-muted-foreground">
											{step.subtitle}
										</span>
									)}
									<span className="font-semibold">{step.title}</span>
								</div>
							</div>
						</div>

						{/* Divider Line (not shown after the last step) */}
						{index < steps.length - 1 && (
							<div className="grow h-0.5 bg-gray-200 mt-4 mx-2" />
						)}
					</React.Fragment>
				);
			})}
		</div>
	);
};
