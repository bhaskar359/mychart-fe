// src/hooks/useBilling.ts
import { useEffect, useState } from "react";

export type PaymentRecord = {
	id: string;
	accountId: string;
	amount: number;
	date: string; // ISO
	method: string;
	note?: string;
};

export type BillingAccount = {
	id: string;
	providerName: string;
	guarantor: string;
	date: string; // friendly
	billed: number;
	insuranceCovered: number;
	discounted: number;
	amountDue: number;
	status: "Open" | "Closed";
	details?: string;
	payments?: PaymentRecord[];
};

export type BillingData = {
	accounts: BillingAccount[];
	lastUpdated?: string;
};

const STORAGE_KEY = "billingData_v1";

function demoData(): BillingData {
	const accountId = "acct-1";
	return {
		accounts: [
			{
				id: accountId,
				providerName: "USF Student Health Services",
				guarantor: "Yaswanth Bellamkonda (Guarantor #4180031)",
				date: "28th April, 2025",
				billed: 177.0,
				insuranceCovered: 0.0,
				discounted: -177.0,
				amountDue: 50.25, // show some non-zero due for demonstration
				status: "Open",
				details:
					"Office visit at USF Student Health Services and Wellness Center. Provider: Nurse Ronisha, RN. Primary payer: Aetna.",
				payments: [],
			},
			{
				id: "acct-2",
				providerName: "Tampa General Hospital",
				guarantor: "Yaswanth Bellamkonda (Guarantor #4180031)",
				date: "10th March, 2025",
				billed: 320.0,
				insuranceCovered: 100.0,
				discounted: -120.0,
				amountDue: 100.0,
				status: "Closed",
				details:
					"Radiology Services. Provider: Radiology Dept. Primary payer: BlueCross.",
				payments: [],
			},
		],
		lastUpdated: new Date().toISOString(),
	};
}

export const useBilling = () => {
	const [data, setData] = useState<BillingData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				const parsed = JSON.parse(stored) as BillingData;
				setData(parsed);
			} catch (err) {
				// corrupt data fallback
				const demo = demoData();
				localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
				setData(demo);
			}
		} else {
			const demo = demoData();
			localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
			setData(demo);
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		if (data) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		}
	}, [data]);

	const updateAccount = (
		accountId: string,
		partial: Partial<BillingAccount>
	) => {
		setData((prev) => {
			if (!prev) return prev;
			const accounts = prev.accounts.map((a) =>
				a.id === accountId ? { ...a, ...partial } : a
			);
			const updated = {
				...prev,
				accounts,
				lastUpdated: new Date().toISOString(),
			};
			return updated;
		});
	};

	const addPayment = (
		accountId: string,
		payment: Omit<PaymentRecord, "id" | "date"> & { date?: string }
	) => {
		const id = `pmt-${Math.random().toString(36).slice(2, 9)}`;
		const date = payment.date ?? new Date().toISOString();
		const record: PaymentRecord = { id, date, ...payment };
		setData((prev) => {
			if (!prev) return prev;
			const accounts = prev.accounts.map((a) =>
				a.id === accountId
					? {
							...a,
							payments: [...(a.payments ?? []), record],
							amountDue: Math.max(
								0,
								Number((a.amountDue - payment.amount).toFixed(2))
							),
							status:
								Math.max(0, a.amountDue - payment.amount) <= 0
									? "Closed"
									: a.status,
					  }
					: a
			);
			return { ...prev, accounts, lastUpdated: new Date().toISOString() };
		});
		return record;
	};

	const resetToDemo = () => {
		const demo = demoData();
		setData(demo);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
	};

	return {
		data,
		loading,
		updateAccount,
		addPayment,
		resetToDemo,
		STORAGE_KEY,
	};
};
