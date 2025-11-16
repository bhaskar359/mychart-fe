import React from "react";
import { useAuthStore } from "@/store/authStore";
import { Mail, Phone, Home } from "lucide-react";

export const ProfilePage: React.FC = () => {
	const { user } = useAuthStore();

	return (
		<div className="p-8 space-y-8 max-w-6xl mx-auto">
			{/* -------------------- PERSONAL INFO -------------------- */}
			<div className="flex gap-8 items-start">
				{/* Avatar */}
				<div className="flex flex-col items-center">
					<div className="w-40 h-40 rounded-full bg-custom-secondary flex items-center justify-center text-white text-5xl font-semibold">
						{user?.firstName?.charAt(0) || "U"}
					</div>
					<p className="mt-2 font-medium text-gray-700 text-lg">
						{user?.firstName + " " + user?.lastName || "User"}
					</p>
				</div>

				{/* Contact Info */}
				<div className="flex-1 bg-white shadow-sm border rounded-lg p-6">
					<h3 className="text-lg text-[#003D72] font-semibold mb-4">
						Contact Information
					</h3>

					<div className="space-y-3 text-sm text-gray-700">
						<p className="flex items-start gap-2">
							<Home className="w-4 h-4 mt-0.5" />
							14233 Shiloh Woods CT, Tampa FL 33613
						</p>

						<p className="flex items-start gap-2">
							<Mail className="w-4 h-4 mt-0.5" />
							{user?.email}
						</p>

						<p className="flex items-start gap-2">
							<Phone className="w-4 h-4 mt-0.5" />
							813-360-4517 (preferred)
						</p>
					</div>
				</div>
			</div>

			{/* -------------------- DETAILS ABOUT ME -------------------- */}
			<div className="bg-white shadow-sm border rounded-lg p-6">
				<h3 className="text-lg text-[#003D72] font-semibold mb-4">
					Details About Me
				</h3>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
					<div>
						<p className="text-gray-500">Preferred first name</p>
						<p className="font-medium mt-1">—</p>
					</div>

					<div>
						<p className="text-gray-500">Race</p>
						<p className="font-medium mt-1">Asian</p>
					</div>

					<div>
						<p className="text-gray-500">Ethnicity</p>
						<p className="font-medium mt-1">Not Hispanic or Latino</p>
					</div>

					<div>
						<p className="text-gray-500">Preferred language</p>
						<p className="font-medium mt-1">English</p>
					</div>
				</div>
			</div>

			{/* -------------------- EMERGENCY CONTACTS -------------------- */}
			<div className="bg-white shadow-sm border rounded-lg p-6">
				<h3 className="text-lg text-[#003D72] font-semibold mb-4">
					Emergency Contacts
				</h3>

				<p className="text-gray-600 text-sm mb-4">
					These people may be contacted in the event of an emergency.
				</p>

				{/* Contact Card */}
				<div className="border rounded-lg p-4 bg-gray-50">
					<p className="font-medium text-gray-800 mb-2">No Contact (Primary)</p>

					<p className="text-sm text-gray-600">Email: —</p>
					<p className="text-sm text-gray-600">Phone: —</p>
				</div>
			</div>
		</div>
	);
};
