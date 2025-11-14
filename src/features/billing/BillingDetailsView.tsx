// src/features/billing/BillingDetailsView.tsx
import React, { useMemo, useState } from "react";
import { useBilling, type BillingAccount } from "@/hooks/useBilling";
import { Overview } from "./components/Overview";
import { DetailsView } from "./components/Details";
import { PaymentsView } from "./components/Payments";
import { DocumentsView } from "./components/Documents";
import { RightSidebar } from "./components/RightSidebar";
import { PaymentModal } from "./components/PaymentModel";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TABS = ["Overview", "Details", "Payments", "Documents"] as const;
type Tab = (typeof TABS)[number];

export const BillingDetailsView: React.FC = () => {
	const { data, loading, addPayment, resetToDemo } = useBilling();
	const accounts = data?.accounts ?? [];

	const [activeTab, setActiveTab] = useState<Tab>("Overview");
	const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
		accounts[0]?.id ?? null
	);
	const [showPaymentModal, setShowPaymentModal] = useState(false);

	React.useEffect(() => {
		if (!selectedAccountId && accounts.length)
			setSelectedAccountId(accounts[0].id);
	}, [accounts, selectedAccountId]);

	const selectedAccount: BillingAccount | undefined = useMemo(
		() => accounts.find((a) => a.id === selectedAccountId) ?? accounts[0],
		[accounts, selectedAccountId]
	);

	const handleOpenDetails = (id: string) => {
		setSelectedAccountId(id);
		setActiveTab("Details");
	};

	const handleOpenPayments = (id: string) => {
		setSelectedAccountId(id);
		setActiveTab("Payments");
	};

	const handleOpenPay = (id: string) => {
		setSelectedAccountId(id);
		setShowPaymentModal(true);
	};

	const handlePay = async (amount: number, method: string, note?: string) => {
		if (!selectedAccountId) return;
		addPayment(selectedAccountId, {
			accountId: selectedAccountId,
			amount,
			method,
			note,
		});
	};

	if (loading) return <div className="p-6">Loading...</div>;

	return (
		<div className="mx-auto px-8 py-8">
			<div className="flex items-start gap-6">
				<div className="flex-1">
					<div className="flex items-center gap-4 mb-4">
						<Link to="/billing" className="flex items-center text-blue-700">
							<ArrowLeft className="mr-2" /> Back to Summary
						</Link>
						<h1 className="text-3xl font-semibold ml-6">
							Billing Summary -{" "}
							<span className="text-blue-700">View Balance Details</span>
						</h1>
					</div>

					<div className="mt-4 mb-6">
						<div className="flex gap-3 items-center">
							{TABS.map((t) => (
								<button
									key={t}
									onClick={() => setActiveTab(t)}
									className={`px-4 py-2 rounded-full border ${
										activeTab === t
											? "bg-blue-700 text-white border-blue-700"
											: "bg-white text-gray-700"
									}`}
								>
									{t}
								</button>
							))}
						</div>
					</div>

					<div className="rounded-2xl p-6 bg-[#f4f5f6] min-h-[420px]">
						{activeTab === "Overview" && (
							<Overview
								accounts={accounts}
								onOpenDetails={handleOpenDetails}
								onOpenPayments={handleOpenPayments}
							/>
						)}
						{activeTab === "Details" && (
							<DetailsView
								account={selectedAccount}
								onPay={(id) => handleOpenPay(id)}
							/>
						)}
						{activeTab === "Payments" && (
							<PaymentsView
								account={selectedAccount}
								onOpenPay={(id) => handleOpenPay(id)}
							/>
						)}
						{activeTab === "Documents" && (
							<DocumentsView account={selectedAccount} />
						)}
					</div>
				</div>

				<RightSidebar />
			</div>

			{showPaymentModal && selectedAccount && (
				<PaymentModal
					account={selectedAccount}
					onClose={() => setShowPaymentModal(false)}
					onPay={async (amount, method, note) => {
						await handlePay(amount, method, note);
						setShowPaymentModal(false);
						setActiveTab("Payments");
					}}
				/>
			)}

			<div className="mt-8">
				<button
					onClick={() => resetToDemo()}
					className="px-3 py-2 border rounded text-sm mr-3"
				>
					Reset demo data
				</button>
				<span className="text-sm text-gray-500 ml-2">
					Local demo stored in localStorage.
				</span>
			</div>
		</div>
	);
};
