// src/features/billing/components/PaymentModal.tsx

import React, { useState } from "react";
import { X, CreditCard, Calendar, Hash } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import type { BillingAccount } from "@/hooks/useBilling";

type Props = {
	account: BillingAccount;
	onClose: () => void;
	onPay: (amount: number, details: any) => Promise<void> | void;
};

export const PaymentModal: React.FC<Props> = ({ account, onClose, onPay }) => {
	const [amount, setAmount] = useState<number>(
		Number(account.amountDue.toFixed(2))
	);

	const [cardNumber, setCardNumber] = useState("");
	const [expiry, setExpiry] = useState("");
	const [cvv, setCvv] = useState("");
	const [processing, setProcessing] = useState(false);

	// -----------------------------
	// VALIDATION HELPERS
	// -----------------------------
	const validateCardNumber = (num: string) => /^\d{16}$/.test(num);

	const validateExpiry = (exp: string) => {
		if (!/^\d{2}\/\d{2}$/.test(exp)) return false;
		const [mm, yy] = exp.split("/").map(Number);
		if (mm < 1 || mm > 12) return false;

		const now = new Date();
		const currentYear = now.getFullYear() % 100; // last 2 digits
		const currentMonth = now.getMonth() + 1;

		return yy > currentYear || (yy === currentYear && mm >= currentMonth);
	};

	const validateCVV = (cvv: string) => /^\d{3}$/.test(cvv);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (amount <= 0) return alert("Enter an amount greater than 0");
		if (!validateCardNumber(cardNumber))
			return alert("Enter a valid 16-digit card number");
		if (!validateExpiry(expiry))
			return alert("Enter a valid future expiry date (MM/YY)");
		if (!validateCVV(cvv)) return alert("CVV must be exactly 3 digits");

		setProcessing(true);
		await new Promise((res) => setTimeout(res, 1000));

		await onPay(amount, { cardNumber, expiry, cvv });

		setProcessing(false);
		onClose();
	};

	// -----------------------------
	// RENDER UI
	// -----------------------------
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
			<div className="bg-white rounded-lg max-w-lg w-full shadow-lg overflow-hidden">
				{/* HEADER */}
				<div className="flex items-center justify-between p-4 border-b">
					<div className="flex items-center gap-2">
						<CreditCard className="w-5 h-5 text-blue-700" />
						<h3 className="text-lg font-semibold">Make a Payment</h3>
					</div>
					<button onClick={onClose}>
						<X />
					</button>
				</div>

				{/* FORM */}
				<form className="p-4 space-y-4" onSubmit={handleSubmit}>
					<p className="text-sm text-gray-600">
						Paying: <strong>{account.providerName}</strong>
					</p>

					{/* AMOUNT */}
					<div>
						<Label>Amount (USD)</Label>
						<Input
							type="number"
							step="0.01"
							min="0"
							value={amount}
							onChange={(e) => setAmount(Number(e.target.value))}
						/>
					</div>

					{/* CARD NUMBER */}
					<div>
						<Label>Card Number</Label>
						<div className="relative">
							<Input
								placeholder="1234 5678 9012 3456"
								maxLength={16}
								value={cardNumber}
								onChange={(e) =>
									setCardNumber(e.target.value.replace(/\D/g, ""))
								}
								className="pl-10"
							/>
							<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
						</div>
					</div>

					{/* EXPIRY + CVV ROW */}
					<div className="flex gap-4">
						{/* EXPIRY */}
						<div className="w-1/2">
							<Label>Expiry (MM/YY)</Label>
							<div className="relative">
								<Input
									placeholder="09/27"
									maxLength={5}
									value={expiry}
									onChange={(e) => {
										let val = e.target.value.replace(/[^\d/]/g, "");

										// auto-insert slash
										if (val.length === 2 && !val.includes("/")) {
											val += "/";
										}

										setExpiry(val);
									}}
									className="pl-10"
								/>
								<Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
							</div>
						</div>

						{/* CVV */}
						<div className="w-1/2">
							<Label>CVV</Label>
							<div className="relative">
								<Input
									placeholder="123"
									maxLength={3}
									value={cvv}
									onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
									className="pl-10"
								/>
								<Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
							</div>
						</div>
					</div>

					{/* BUTTONS */}
					<div className="flex justify-end gap-3 pt-2">
						<Button variant="outline" type="button" onClick={onClose}>
							Cancel
						</Button>
						<Button disabled={processing} type="submit">
							{processing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};
