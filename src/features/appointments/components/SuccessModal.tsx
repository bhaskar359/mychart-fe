// src/features/appointments/components/SuccessModal.tsx
import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Props {
	open: boolean;
	onClose: () => void;
}

export const SuccessModal: React.FC<Props> = ({ open, onClose }) => {
	const navigate = useNavigate();
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
			<div className="bg-white w-[640px] rounded-xl p-8 relative text-center">
				<button
					onClick={onClose}
					className="absolute right-4 top-4 text-gray-600"
				>
					<X />
				</button>

				<h3 className="text-lg font-semibold mb-6">Schedule Successful!</h3>

				<div className="flex justify-center mb-6">
					<div className="rounded-full bg-[#00529C] p-6 text-white">
						<svg
							width="48"
							height="48"
							viewBox="0 0 24 24"
							fill="none"
							aria-hidden
						>
							<path
								d="M20 6L9 17l-5-5"
								stroke="white"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				</div>

				<p className="text-gray-700 mb-6">
					You're all set! You can review details of your upcoming appointment
					below.
				</p>

				<div className="flex justify-center gap-4">
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button
						onClick={() => {
							navigate("/dashboard");
							window.location.reload();
						}}
					>
						OK
					</Button>
				</div>
			</div>
		</div>
	);
};
