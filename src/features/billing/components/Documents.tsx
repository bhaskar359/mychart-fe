// src/features/billing/components/Documents.tsx
import React from "react";
import type { BillingAccount } from "@/hooks/useBilling";
import { Printer } from "lucide-react";

type Props = {
	account?: BillingAccount;
};

export const DocumentsView: React.FC<Props> = ({ account }) => {
	if (!account) {
		return (
			<div className="rounded-lg p-6 bg-white border shadow">
				<h3 className="font-semibold">Statements</h3>
				<div className="py-6 text-center text-gray-500">
					No account selected.
				</div>
			</div>
		);
	}

	const isClosed = account.status === "Closed";
	const latestPayment = account.payments?.[account.payments.length - 1];

	const handlePrint = () => {
		const printContent = document.getElementById("payment-statement");
		if (!printContent) return;

		const printWindow = window.open("", "", "width=800,height=900");
		if (!printWindow) return;

		printWindow.document.write(`
      <html>
        <head>
          <title>Payment Statement</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { margin-bottom: 10px; }
            .section { margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background: #f5f5f5; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

		printWindow.document.close();
		printWindow.print();
	};

	return (
		<div>
			{/* If status is not closed → show "No statements" */}
			{!isClosed && (
				<div className="py-6 text-center text-gray-500">
					No statements found
				</div>
			)}

			{/* If CLOSED → show payment statement */}
			{isClosed && latestPayment && (
				<div>
					<div
						id="payment-statement"
						className="border rounded-lg p-5 bg-gray-50"
					>
						<h2 className="text-xl font-bold text-gray-800 mb-2">
							Payment Statement
						</h2>
						<p className="text-sm text-gray-600 mb-4">
							This statement confirms your payment for services received.
						</p>

						{/* Provider Info */}
						<div className="section">
							<h3 className="font-semibold text-gray-800">
								Provider Information
							</h3>
							<p className="text-sm text-gray-700 mt-1">
								<strong>{account.providerName}</strong>
							</p>
							<p className="text-sm text-gray-600 mt-1">{account.details}</p>
						</div>

						{/* Payment Table */}
						<div className="section">
							<h3 className="font-semibold text-gray-800">Payment Details</h3>
							<table className="table">
								<thead className="th">
									<tr>
										<th className="td">Date</th>
										<th className="td">Amount Paid</th>
										<th className="td">Payment Method</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="td">
											{new Date(latestPayment.date).toLocaleDateString()}
										</td>
										<td className="td">${latestPayment.amount.toFixed(2)}</td>
										<td className="td">
											Card ending in{" "}
											<strong>
												{latestPayment.method.cardNumber.slice(-4)}
											</strong>
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						{/* Account Summary */}
						<div className="section">
							<h3 className="font-semibold text-gray-800">Account Summary</h3>
							<p className="text-sm mt-1">Total Billed: ${account.billed}</p>
							<p className="text-sm">
								Insurance Covered: ${account.insuranceCovered}
							</p>
							<p className="text-sm">Discount: ${account.discounted}</p>
							<p className="text-sm font-semibold mt-2">
								Amount Due:{" "}
								<span className="text-green-700">${account.amountDue}</span>
							</p>
							<p className="text-sm text-blue-700 font-semibold mt-2">
								Status: {account.status}
							</p>
						</div>
					</div>

					{/* Print button */}
					<div className="mt-4 flex justify-end">
						<button
							onClick={handlePrint}
							className="flex items-center gap-2 px-4 py-2 bg-[#00529C] text-white rounded hover:shadow-2"
						>
							<Printer className="w-4 h-4" />
							Print Statement
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
