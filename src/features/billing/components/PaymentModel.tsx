// src/features/billing/components/PaymentModal.tsx
import React, { useState } from "react";
import type { BillingAccount } from "@/hooks/useBilling";
import { X, CreditCard } from "lucide-react";

type Props = {
	account: BillingAccount;
	onClose: () => void;
	onPay: (
		amount: number,
		method: string,
		note?: string
	) => Promise<void> | void;
};

export const PaymentModal: React.FC<Props> = ({ account, onClose, onPay }) => {
	const [amount, setAmount] = useState<number>(
		Number(account.amountDue.toFixed(2))
	);
	const [method, setMethod] = useState<string>("Card");
	const [processing, setProcessing] = useState(false);
	const [note, setNote] = useState<string>("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (amount <= 0) {
			alert("Enter an amount greater than 0");
			return;
		}
		setProcessing(true);
		// Simulate network
		await new Promise((res) => setTimeout(res, 1000));
		await onPay(amount, method, note);
		setProcessing(false);
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
			<div className="bg-white rounded-lg max-w-lg w-full shadow-lg overflow-hidden">
				<div className="flex items-center justify-between p-4 border-b">
					<div className="flex items-center gap-2">
						<CreditCard className="w-5 h-5 text-blue-700" />
						<h3 className="text-lg font-semibold">Make a Payment</h3>
					</div>
					<button onClick={onClose}>
						<X />
					</button>
				</div>

				<form className="p-4" onSubmit={handleSubmit}>
					<p className="text-sm text-gray-600 mb-4">
						Account: <strong>{account.providerName}</strong>
					</p>

					<label className="block text-sm mb-1">Amount to pay (USD)</label>
					<input
						type="number"
						step="0.01"
						min="0"
						value={amount}
						onChange={(e) => setAmount(Number(e.target.value))}
						className="w-full p-2 border rounded mb-3"
					/>

					<label className="block text-sm mb-1">Payment method</label>
					<select
						className="w-full p-2 border rounded mb-3"
						value={method}
						onChange={(e) => setMethod(e.target.value)}
					>
						<option>Card</option>
						<option>ACH</option>
						<option>Phone</option>
					</select>

					<label className="block text-sm mb-1">Note (optional)</label>
					<input
						className="w-full p-2 border rounded mb-4"
						value={note}
						onChange={(e) => setNote(e.target.value)}
					/>

					<div className="flex items-center justify-end gap-3">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 border rounded"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={processing}
							className="px-4 py-2 bg-blue-700 text-white rounded"
						>
							{processing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
