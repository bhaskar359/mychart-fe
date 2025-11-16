// src/features/billing/components/Payments.tsx
import React from "react";
import type { BillingAccount } from "@/hooks/useBilling";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
	account?: BillingAccount;
	onOpenPay: (id: string) => void;
};

export const PaymentsView: React.FC<Props> = ({ account, onOpenPay }) => {
	if (!account) {
		return <p className="text-gray-600">Choose an account to view payments.</p>;
	}

	const payments = account.payments ?? [];

	return (
		<div>
			<div className="rounded-lg p-6 bg-white border shadow mb-6 flex items-center justify-between">
				<div>
					<h2 className="text-xl font-semibold">Payments</h2>
					<p className="text-sm text-gray-600">
						Account: {account.providerName}
					</p>
				</div>
				<div className="text-right">
					<p className="text-sm">Amount Due</p>
					<p className="text-2xl font-bold text-green-700">
						${account.amountDue.toFixed(2)}
					</p>
					<div className="mt-3">
						<Button
							disabled={account.amountDue <= 0}
							onClick={() => onOpenPay(account.id)}
							className="px-4 py-2 bg-[#00529C] text-white rounded"
						>
							Make Payment
						</Button>
					</div>
				</div>
			</div>

			<div className="bg-white border rounded p-4">
				{payments.length === 0 ? (
					<div className="py-8 text-center text-gray-500">
						No payments found
					</div>
				) : (
					<ul className="space-y-3">
						{payments.map((p) => (
							<li
								key={p.id}
								className="flex justify-between items-center border-b pb-3"
							>
								<div>
									<div className="font-semibold">
										Paid ${p.amount.toFixed(2)}
									</div>
									<div className="text-sm text-gray-600">
										on {formatDate(p.date)}
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
