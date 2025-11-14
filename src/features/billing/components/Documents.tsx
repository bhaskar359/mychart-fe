// src/features/billing/components/Documents.tsx
import React from "react";
import type { BillingAccount } from "@/hooks/useBilling";

type Props = {
	account?: BillingAccount;
};

export const DocumentsView: React.FC<Props> = ({ account }) => {
	return (
		<div>
			<div className="rounded-lg p-6 bg-white border shadow">
				<h3 className="font-semibold">Statements</h3>
				<div className="py-6 text-center text-gray-500">
					No statements found
				</div>
			</div>

			<div className="mt-6 rounded-lg p-6 bg-white border shadow">
				<h3 className="font-semibold">Letters</h3>
				<div className="py-6 text-center text-gray-500">No letters found</div>
			</div>
		</div>
	);
};
