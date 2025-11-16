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
import { Link, useNavigate } from "react-router-dom";

const TABS = ["Overview", "Details", "Payments", "Documents"] as const;
type Tab = (typeof TABS)[number];

export const BillingDetailsView: React.FC = () => {
	const navigate = useNavigate();
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
		<div className="mx-auto py-8">
			<div className="flex flex-col lg:flex-row gap-6">
				<div className="grow lg:w-3/4 bg-[#F4F5F6] pl-10 rounded-r-4xl inset-shadow-[0px_4px_25px_3px_rgba(0,0,0,0.25)] p-6">
					<div className="flex items-center">
						<button
							onClick={() => navigate(-1)}
							className="text-[#00529C] hover:text-blue-800 border font-light cursor-pointer rounded-full transition-colors mr-4"
							aria-label="Go back to Schedule an Appointment"
						>
							<ArrowLeft className="w-8 h-8" />
						</button>
						<h1 className="text-2xl font-semibold text-[#003D72]">
							Billing Summary -{" "}
							<span className="font-normal">View Balance Details</span>
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
											? "bg-[#00529C] text-white"
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

				<div className="grow lg:w-1/4 bg-[#F4F5F6] pl-10 flex rounded-l-4xl inset-shadow-[0px_4px_25px_3px_rgba(0,0,0,0.25)] p-6">
					<RightSidebar type="billDetails" />
				</div>
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
		</div>
	);
};
