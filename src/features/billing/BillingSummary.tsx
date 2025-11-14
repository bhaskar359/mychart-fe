// src/features/billing/BillingSummary.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useBilling } from "@/hooks/useBilling";
import { ArrowLeft, Hospital, Printer } from "lucide-react";
import { RightSidebar } from "./components/RightSidebar";
import { HomePageButton } from "@/components/layout/HomePageButton";

export const BillingSummary: React.FC = () => {
	const { data, loading } = useBilling();
	const accounts = data?.accounts ?? [];

	const totalDue = accounts.reduce((s, a) => s + a.amountDue, 0);

	if (loading) return <div className="p-6">Loading...</div>;

	return (
		<div className="mx-auto py-10">
			<div className="flex flex-col lg:flex-row gap-8">
				<div className="grow lg:w-3/4 bg-[#F4F5F6] pl-10 rounded-r-4xl inset-shadow-[0px_4px_25px_3px_rgba(0,0,0,0.25)] p-6">
					<div className="flex-1">
						<div className="flex items-center justify-between gap-4 mb-4">
							<h1 className="text-3xl text-[#003D72] font-semibold">
								Billing Summary
							</h1>
							<Printer size={35} />
						</div>

						<p className="text-sm text-gray-600 mb-6">
							As a result of your treatment at Tampa General Hospital, you may
							receive separate statements for services rendered by Tampa General
							Hospital (hospital services) and USF Health (physician services),
							as well as other hospital based physician providers.
						</p>

						{/* Main card that matches your screenshot: */}
						<div className="rounded-2xl p-6 bg-white shadow mb-6">
							<div className="flex items-center justify-between gap-6">
								{/* Left icon + provider */}
								<div className="flex items-center gap-6">
									<Hospital size={50} />

									<div>
										<div className="font-semibold">
											Usf Student Health Services
										</div>
										<div className="text-sm text-gray-600">
											Guarantor #4180031 (Yaswanth Bellamkonda)
										</div>
										<div className="mt-2 text-sm font-medium">
											Physician Services • Patients included: You
										</div>
									</div>
								</div>

								{/* Amount due in center */}
								<div className="text-center border-l border-r px-8">
									<div className="text-sm text-gray-600 mb-1">Amount Due</div>
									<div className="text-2xl font-bold text-green-700">
										${totalDue.toFixed(2)}
									</div>
								</div>

								{/* Actions on the right */}
								<div className="text-right flex flex-col items-end gap-3">
									<Link to="/billing/details" className="text-blue-700">
										View Balance Details
									</Link>
									<button className="text-blue-700">
										Contact Customer Service
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="grow lg:w-1/4 bg-[#F4F5F6] pl-10 flex rounded-l-4xl inset-shadow-[0px_4px_25px_3px_rgba(0,0,0,0.25)] p-6">
					<RightSidebar />
				</div>
			</div>
			<HomePageButton />
		</div>
	);
};
