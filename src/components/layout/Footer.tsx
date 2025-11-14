import React from "react";

export const Footer: React.FC = () => {
	return (
		<footer className="w-full bg-[#F8FAFC] rounded-t-4xl inset-shadow-[0px_4px_25px_3px_rgba(0,0,0,0.25)] mt-16">
			<div className="max-w-5xl mx-auto text-center py-8 px-4 text-sm text-[#4B5563]">
				{/* Top Links */}
				<div className="flex flex-col justify-center items-center gap-x-6 gap-y-5 mb-4">
					<div className="flex justify-between gap-x-6">
						<a href="#" className="hover:underline">
							Interoperability Guide
						</a>
						<a href="#" className="hover:underline">
							Terms and Conditions
						</a>
					</div>
					<a href="#" className="hover:underline">
						Contact Us
					</a>
					<a href="#" className="hover:underline">
						High Contrast Theme
					</a>
				</div>

				{/* Divider line effect (optional subtle top shadow) */}
				<div className="border-t border-gray-200 w-3/4 mx-auto mb-4 opacity-50" />

				{/* Footer Text */}
				<p className="text-xs text-[#6B7280]">
					MyChart® Prototype Design for HCI Licensed by, to, from Sai Mukesh
					Reddy Gutha
				</p>
			</div>
		</footer>
	);
};
