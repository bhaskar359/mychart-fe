// src/features/appointments/components/ScheduleStepper.tsx
import React from "react";

interface Step {
	id: number;
	title: string;
	subtitle?: string;
}

interface Props {
	currentStep: number;
	steps: Step[];
}

export const ScheduleStepper: React.FC<Props> = ({ currentStep, steps }) => {
	return (
		<div className="flex items-center gap-4 mb-8">
			{steps.map((s, i) => {
				const isCurrent = s.id === currentStep;
				const isCompleted = s.id < currentStep;

				const circleClass = isCurrent
					? "bg-[#00529C] text-white"
					: isCompleted
					? "bg-[#0EA5A4] text-white"
					: "bg-gray-100 text-gray-500";

				const textClass = isCurrent
					? "text-[#00529C] font-semibold"
					: "text-gray-600";

				return (
					<React.Fragment key={s.id}>
						<div className="flex items-start min-w-0">
							<div className="flex items-center">
								<div
									className={`w-9 h-9 rounded-full flex items-center justify-center mr-3 ${circleClass}`}
								>
									{s.id}
								</div>
								<div className={`text-left ${textClass}`}>
									{s.subtitle && (
										<div className="text-xs text-gray-400">{s.subtitle}</div>
									)}
									<div className="text-sm">{s.title}</div>
								</div>
							</div>
						</div>

						{i < steps.length - 1 && (
							<div className="flex-1 h-[2px] bg-gray-200 ml-2 mr-2 mt-5" />
						)}
					</React.Fragment>
				);
			})}
		</div>
	);
};
