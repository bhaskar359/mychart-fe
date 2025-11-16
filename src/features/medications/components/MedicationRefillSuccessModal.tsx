// src/features/medications/components/MedicationRefillSuccessModal.tsx
import React from "react";
import { X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MedicationRefillSuccessModal = ({ open, onClose, med }) => {
	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
			<div className="bg-white w-[480px] rounded-xl p-6 relative shadow-xl">
				<button
					onClick={onClose}
					className="absolute right-4 top-4 text-gray-600 hover:text-gray-900"
				>
					<X size={20} />
				</button>

				<div className="flex justify-center mb-4">
					<CheckCircle2 className="w-14 h-14 text-green-600" />
				</div>

				<h2 className="text-xl font-semibold text-center mb-4">
					Refill Request Successful
				</h2>

				<p className="text-center text-gray-600 mb-6">
					Your refill request for <strong>{med.medication_name}</strong> has
					been submitted to <strong>{med.pharmacy_name}</strong>.
				</p>

				<div className="bg-gray-50 p-4 rounded-lg text-sm mb-6">
					<p>
						<strong>Medication:</strong> {med.medication_name}
					</p>
					<p>
						<strong>Dosage:</strong> {med.dosage_strength}
					</p>
					<p>
						<strong>Pharmacy:</strong> {med.pharmacy_name}
					</p>
					<p>
						<strong>Phone:</strong> {med.pharmacy_phone}
					</p>
				</div>

				<div className="flex justify-center">
					<Button onClick={onClose} className="px-6">
						OK
					</Button>
				</div>
			</div>
		</div>
	);
};
