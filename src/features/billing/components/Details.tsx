// src/features/billing/components/Details.tsx
import React from "react";
import type { BillingAccount } from "@/hooks/useBilling";

type Props = {
	account?: BillingAccount;
	onPay: (id: string) => void;
};

export const DetailsView: React.FC<Props> = ({ account, onPay }) => {
	if (!account) {
		return <p className="text-gray-600">Select an account to view details.</p>;
	}

	return (
		<div>
			<div className="rounded-lg p-6 bg-white border shadow mb-6">
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-xl font-semibold">{account.providerName}</h2>
						<p className="text-sm text-gray-600">
							{account.date} • {account.guarantor}
						</p>
					</div>
					<div className="text-right">
						<p className="text-sm">Amount Due</p>
						<p className="text-2xl font-bold text-green-700">
							${account.amountDue.toFixed(2)}
						</p>
						{/* <div className="mt-3">
							<button
								onClick={() => onPay(account.id)}
								className="px-4 py-2 bg-[#00529C] text-white rounded"
							>
								Pay Now
							</button>
						</div> */}
					</div>
				</div>

				<div className="mt-6 grid grid-cols-3 gap-6">
					<div>
						<p className="text-sm text-gray-500">Billed</p>
						<p className="font-semibold">${account.billed.toFixed(2)}</p>
					</div>
					<div>
						<p className="text-sm text-gray-500">Insurance covered</p>
						<p className="font-semibold text-green-600">
							${account.insuranceCovered.toFixed(2)}
						</p>
					</div>
					<div>
						<p className="text-sm text-gray-500">Discount</p>
						<p className="font-semibold">${account.discounted.toFixed(2)}</p>
					</div>
				</div>
			</div>

			<div className="bg-white border p-4 rounded">
				<h3 className="font-semibold mb-2">Visit Information</h3>
				<p className="text-sm text-gray-700">{account.details}</p>
			</div>
		</div>
	);
};
