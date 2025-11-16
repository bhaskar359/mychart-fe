// src/features/appointments/ImagingVisitView.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScheduleStepper } from "./components/ScheduleStepper";
import { QuestionnaireStep } from "./components/QuestionnaireStep";
import { LocationStep } from "./components/LocationStep";
import { TimeStep } from "./components/TimeStep";
import { VerifyStep } from "./components/VerifyStep";
import { SuccessModal } from "./components/SuccessModal";
import { useCreateAppointment } from "../../hooks/useAppointments";
// adjust path if your hook is in another folder

import type { ImagingFormState } from "../../types/appointments.types";

const APPOINTMENT_STEPS = [
	{ id: 1, title: "Schedule Imaging Visit", subtitle: "Reason for Visit" },
	{ id: 2, title: "Questionnaire" },
	{ id: 3, title: "Location" },
	{ id: 4, title: "Time" },
	{ id: 5, title: "Verify & Schedule" },
];

export const ImagingVisitView: React.FC = () => {
	const navigate = useNavigate();
	const createAppointment = useCreateAppointment();

	// adjust path if your hook is in another folder

	const [currentStep, setCurrentStep] = useState<number>(1);
	const [form, setForm] = useState<ImagingFormState>({
		scheduleMoreThanOne: null,
		questionnaireAnswers: [],
	});
	const [submitting, setSubmitting] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	function patch(p: Partial<ImagingFormState>) {
		setForm((prev) => ({ ...prev, ...p }));
	}

	const next = () => setCurrentStep((s) => Math.min(5, s + 1));
	const back = () => setCurrentStep((s) => Math.max(1, s - 1));

	// Submit final appointment (mock)
	const handleSubmit = async () => {
		if (
			!form.appointmentDate ||
			!form.appointmentTime ||
			!form.locationName ||
			!form.locationAddress
		) {
			alert("Missing required fields");
			return;
		}

		setSubmitting(true);

		const payload: CreateAppointmentPayload = {
			appointment_type: form.appointmentType,
			reason_for_visit: "Patient scheduled imaging visit",

			appointment_date: form.appointmentDate, // YYYY-MM-DD
			appointment_time: form.appointmentTime + ":00", // convert "09:30" → "09:30:00"

			location_name: form.locationName,
			location_address: form.locationAddress,

			status: "Scheduled",

			// Optional imaging details
			imaging_type: form.appointmentType ?? null,
			imaging_body_part: form.imagingBodyPart ?? null,
			has_referral: !!form.hasReferral,
			referral_physician_id: null,

			// Questionnaire answers
			questionnaire_answers: [
				{
					question: "Is exam related to accident?",
					answer: String(form.examRelatedToAccident),
				},
				{
					question: "Do you have health insurance?",
					answer: String(form.haveInsurance),
				},
				...(form.haveInsurance
					? [
							{
								question: "Insurance Company",
								answer: form.insuranceCompany ?? "",
							},
							{
								question: "Member Name",
								answer: form.memberName ?? "",
							},
							{
								question: "Member Number",
								answer: form.memberNumber ?? "",
							},
							{
								question: "Insurance Phone",
								answer: form.insurancePhone ?? "",
							},
							{
								question: "Referring Provider Address",
								answer: form.referringProviderAddress ?? "",
							},
					  ]
					: []),
			],
		};

		try {
			const result = await createAppointment.mutateAsync(payload);

			console.log("Appointment created:", result);

			setShowSuccess(true); // open the modal
		} catch (error) {
			console.error("Failed to create appointment:", error);
			alert("Could not create appointment.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="p-6 grow">
			<div className="mx-auto">
				<div className="flex items-center mb-6">
					<button
						onClick={() => navigate(-1)}
						className="text-[#00529C] hover:text-blue-800 border font-light cursor-pointer rounded-full transition-colors mr-4"
						aria-label="Go back"
					>
						<ArrowLeft className="w-8 h-8" />
					</button>
					<h1 className="text-2xl font-semibold text-[#003D72]">
						Schedule an Appointment —{" "}
						<span className="font-normal">Imaging Visit</span>
					</h1>
				</div>

				<div className="bg-[#F8F8F8] p-6 rounded-2xl">
					<ScheduleStepper
						currentStep={currentStep}
						steps={APPOINTMENT_STEPS}
					/>

					<div className="min-h-[340px] flex flex-col justify-between">
						{/* Step 1: initial question (Do you need more than one exam) */}
						{currentStep === 1 && (
							<div>
								<h2 className="text-xl text-[#003D72] mb-6">
									First, we need some information
								</h2>
								<div className="flex justify-between items-center py-4 border-y border-gray-200">
									<label className="text-gray-700">
										Do you need to schedule more than one (1) exam?
									</label>
									<div className="flex space-x-2">
										<Button
											variant={
												form.scheduleMoreThanOne === true
													? "default"
													: "outline"
											}
											onClick={() => patch({ scheduleMoreThanOne: true })}
											className={
												form.scheduleMoreThanOne === true
													? "bg-[#00529C] text-white"
													: ""
											}
										>
											Yes
										</Button>
										<Button
											variant={
												form.scheduleMoreThanOne === false
													? "default"
													: "outline"
											}
											onClick={() => patch({ scheduleMoreThanOne: false })}
											className={
												form.scheduleMoreThanOne === false
													? "bg-[#00529C] text-white"
													: ""
											}
										>
											No
										</Button>
									</div>
								</div>

								<div className="mt-8 text-center">
									<Button
										onClick={() => setCurrentStep(2)}
										disabled={form.scheduleMoreThanOne === null}
										className="bg-[#00529C] text-white px-8 py-3 rounded-lg"
									>
										Continue
									</Button>
								</div>
							</div>
						)}

						{currentStep === 2 && (
							<QuestionnaireStep
								form={form}
								onChange={patch}
								onBack={back}
								onNext={() => {
									// ensure some default answers mapped
									next();
								}}
							/>
						)}

						{currentStep === 3 && (
							<LocationStep
								form={form}
								onChange={patch}
								onNext={next}
								onBack={back}
							/>
						)}

						{currentStep === 4 && (
							<TimeStep
								form={form}
								onChange={patch}
								onNext={next}
								onBack={back}
							/>
						)}

						{currentStep === 5 && (
							<VerifyStep
								form={form}
								onBack={back}
								onSubmit={handleSubmit}
								submitting={submitting}
							/>
						)}
					</div>
				</div>
			</div>

			<SuccessModal open={showSuccess} onClose={() => setShowSuccess(false)} />
		</div>
	);
};
