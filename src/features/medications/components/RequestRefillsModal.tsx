import React, { use, useEffect, useState } from "react";
import { X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMedications } from "@/hooks/useMedications";

export const RequestRefillsModal = ({
	open,
	onClose,
	medications,
	onSuccess,
}) => {
	const { getRefilledFromStorage, requestMultipleRefills } = useMedications();
	const [selected, setSelected] = useState<string[]>([]);
	const requested = getRefilledFromStorage();

	useEffect(() => {
		if (open) {
			setSelected(requested); // preload already-requested
		}
	}, [open]);

	const toggleSelection = (id: string) => {
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
		);
	};

	const handleSubmit = () => {
		requestMultipleRefills(selected);
		onSuccess();
		onClose();
	};

	if (!open) return null;

	const allRequested = medications.every((m) =>
		requested.includes(m.id.toString())
	);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="bg-white w-[500px] rounded-xl p-6 relative">
				<button
					className="absolute top-3 right-3 text-gray-500"
					onClick={onClose}
				>
					<X />
				</button>

				<h2 className="text-xl font-semibold mb-4">Request Refills</h2>

				{allRequested ? (
					<p className="text-center text-gray-600 py-6">
						All medications already have refill requests.
					</p>
				) : (
					<>
						<div className="max-h-80 overflow-y-auto mb-4 space-y-3">
							{medications
								.filter((med) => med.status === "Active")
								.map((med) => {
									const already = requested.includes(med.id);
									const isChecked = selected.includes(med.id);

									return (
										<label
											key={med.id}
											className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer ${
												already ? "bg-gray-100 opacity-70" : "hover:bg-gray-50"
											}`}
										>
											<input
												type="checkbox"
												checked={isChecked}
												disabled={already}
												onChange={() => toggleSelection(med.id)}
												className="mt-1"
											/>

											<div>
												<p className="font-medium">{med.medication_name}</p>
												<p className="text-gray-500 text-sm">
													{med.instructions}
												</p>
												{already && (
													<p className="text-green-600 text-sm mt-1 flex items-center gap-1">
														<CheckCircle className="w-4 h-4" /> Already
														requested
													</p>
												)}
											</div>
										</label>
									);
								})}
						</div>

						<div className="flex justify-end gap-3">
							<Button variant="outline" onClick={onClose}>
								Cancel
							</Button>
							<Button
								disabled={selected.length === 0}
								onClick={handleSubmit}
								className="bg-[#00529C] hover:bg-[#1E3A8A] text-white"
							>
								Submit Request
							</Button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
