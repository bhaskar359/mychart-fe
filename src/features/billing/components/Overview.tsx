// src/features/billing/components/Overview.tsx
import React from "react";
import type { BillingAccount } from "@/hooks/useBilling";

type Props = {
	accounts: BillingAccount[];
	onOpenDetails: (id: string) => void;
	onOpenPayments: (id: string) => void;
};

export const Overview: React.FC<Props> = ({
	accounts,
	onOpenDetails,
	onOpenPayments,
}) => {
	const totalDue = accounts.reduce((s, a) => s + a.amountDue, 0);

	return (
		<div>
			<div className="rounded-lg p-6 bg-white border shadow mb-6">
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-xl font-semibold">Billing Summary</h2>
						<p className="text-sm text-gray-600">
							Summary of your billing accounts
						</p>
					</div>
					<div className="text-right">
						<p className="text-sm text-gray-600">Amount Due</p>
						<p className="text-2xl font-bold text-green-700">
							${totalDue.toFixed(2)}
						</p>
					</div>
				</div>
			</div>

			<div className="space-y-4">
				{accounts.map((acc) => (
					<div
						key={acc.id}
						className="rounded-2xl p-4 border bg-white flex justify-between items-center"
					>
						<div>
							<div className="text-sm text-gray-500">{acc.date}</div>
							<div className="font-semibold text-lg">{acc.providerName}</div>
							<div className="text-sm text-gray-600">{acc.details}</div>
						</div>

						<div className="text-right">
							<div className="text-sm">Billed</div>
							<div className="text-lg font-semibold">
								${acc.billed.toFixed(2)}
							</div>
							<div className="mt-2 flex gap-2">
								<button
									onClick={() => onOpenDetails(acc.id)}
									className="px-4 py-2 border rounded"
								>
									Details
								</button>
								<button
									onClick={() => onOpenPayments(acc.id)}
									className="px-4 py-2 bg-[#00529C] text-white rounded"
								>
									Payments
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
