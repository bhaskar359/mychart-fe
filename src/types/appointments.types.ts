/**
 * --- Status Types ---
 * Defines the possible states of an appointment or visit.
 */
export type AppointmentStatus =
	| "Scheduled"
	| "Completed"
	| "Cancelled"
	| "Rescheduled"
	| "No Show"
	| "Pending";

/**
 * --- Appointment Type ---
 * Defines the structure of an Appointment/Visit object returned by the backend API.
 * This includes joined physician data and deserialized date/time fields.
 */
export interface Appointment {
	// Core Appointment Fields
	id: string; // UUID
	user_id: string;
	physician_id: string;
	appointment_type:
		| "Bone Density or DEXA"
		| "CT or CTA"
		| "Mammography"
		| "MRI or MRA"
		| "Ultrasound or Sonogram"
		| "Fluoroscopy"
		| "Nuclear Medicine"
		| "Biopsy"
		| "PET Scan"
		| "XRAY";
	reason_for_visit: string;

	// Dates and Times (Note: appointment_date is converted to Date object in the hook)
	appointment_date: Date;
	appointment_time: string; // Format: "HH:MM:SS" (e.g., "14:30:00")

	// Location Details
	location_name: string;
	location_address: string;

	// Status and Administrative
	status: AppointmentStatus;
	cancellation_reason: string | null;
	reschedule_details: string | null;
	notes: string | null;

	// Imaging Specific (if applicable)
	imaging_type: string | null;
	imaging_body_part: string | null;
	has_referral: boolean;
	referral_physician_id: string | null;

	// Documents (for Past Visits)
	avs_document_path?: string | null; // After Visit Summary URL
	clinical_notes_path?: string | null; // Clinical Notes URL

	// Questionnaire Answers (Deserialized from JSON string in backend)
	questionnaire_answers: Array<{ question: string; answer: string }>;

	// Joined Physician Details (from the SQL JOIN)
	physician_first_name: string;
	physician_last_name: string;
}

/**
 * --- Create Appointment Payload ---
 * Defines the required fields for creating a new appointment via the API.
 * Note: The API must provide the 'id' (UUID) and the 'user_id' is usually implicit from the auth token.
 */
export interface CreateAppointmentPayload {
	// Required data from the user/form
	appointment_type: Appointment["appointment_type"];
	reason_for_visit: string;
	appointment_date: string; // Sent as ISO Date String (YYYY-MM-DD)
	appointment_time: string; // Sent as Time String (HH:MM:SS)

	// Assuming these are also selected during the scheduling process
	location_name: string;
	location_address: string;

	// Initial Status
	status: "Scheduled";

	// Optional fields
	imaging_type?: string | null;
	imaging_body_part?: string | null;
	has_referral?: boolean;
	referral_physician_id?: string | null;

	// Questionnaire (Sent as an array of objects)
	questionnaire_answers?: Array<{ question: string; answer: string }>;
}

// src/features/appointments/types.ts
export interface QuestionnaireAnswer {
	question: string;
	answer: string;
}

export interface ImagingFormState {
	// Step 1: general decisions (already in ImagingVisitView but kept for completeness)
	scheduleMoreThanOne?: boolean | null;

	// Questionnaire (Step 2)
	examRelatedToAccident?: boolean | null;
	haveInsurance?: boolean | null;
	insuranceCompany?: string;
	memberName?: string;
	memberNumber?: string;
	insurancePhone?: string;
	referringProviderAddress?: string;

	// Step 2b: imaging details
	appointmentType?: string | null; // e.g., "MRI or MRA"
	imagingBodyPart?: string | null;
	hasReferral?: boolean | null;

	// Step 3: location
	locationId?: string | null;
	locationName?: string | null;
	locationAddress?: string | null;

	// Step 4: time
	appointmentDate?: string | null; // YYYY-MM-DD
	appointmentTime?: string | null; // HH:MM

	// aggregated questionnaire answers (for sending)
	questionnaireAnswers?: QuestionnaireAnswer[];
}
