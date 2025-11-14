// src/features/billing/components/RightSidebar.tsx
import React from "react";

type Props = {
	guarantorName?: string;
	phone?: string;
	address?: string;
	email?: string;
};

export const RightSidebar: React.FC<Props> = ({
	guarantorName = "Yaswanth Bellamkonda",
	phone = "813-360-4517",
	address = "14233 Shiloh Woods CT, TAMPA FL 33613",
	email = "yaswanthbellamkonda@usf.edu",
}) => {
	return (
		<div className="w-80 top-24 rounded-lg p-4 border-0">
			<h4 className="font-semibold text-lg mb-2">Responsible for Payment</h4>
			<p className="text-sm mb-1">{guarantorName}</p>
			<p className="text-sm mb-2">Guarantor #4180031</p>
			<p className="text-sm mb-2">{address}</p>
			<p className="text-sm mb-2">{phone}</p>
			<p className="text-sm text-blue-700">{email}</p>
		</div>
	);
};
