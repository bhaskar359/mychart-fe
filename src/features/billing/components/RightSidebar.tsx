// src/features/billing/components/RightSidebar.tsx
import React from "react";

type Props = {
	type?: "billSummary" | "billDetails";
	guarantorName?: string;
	phone?: string;
	address?: string;
	email?: string;
};
const billingFAQs = [
	{
		id: "faq-1",
		question: "What is a guarantor?",
		answer:
			"The guarantor is the person or entity responsible for paying the balance of an account.",
	},
	{
		id: "faq-2",
		question: "What if I can't pay all at once?",
		answer:
			"If you can't pay your whole bill at once, you may be able to set up a payment plan. This lets you automatically pay a small amount each month.",
	},
	{
		id: "faq-3",
		question: "USF COVID19 Financial Assistance",
		answer:
			"If you need help paying your USF medical bill, we're here for you. Interest free payment plans, and financial assistance are still in place for people who can’t pay their balance in full. Our USF Patient Services team is available at 813.974.0509.",
	},
	{
		id: "faq-4",
		question: "How else can I receive my billing information?",
		answer:
			"You can opt in to paperless billing to receive billing communications online when possible. You will still receive bills via mail from locations that do not have paperless billing.",
	},
];

export const RightSidebar: React.FC<Props> = ({
	type = "billDetails",
	guarantorName = "Yaswanth Bellamkonda",
	phone = "813-360-4517",
	address = "14233 Shiloh Woods CT, TAMPA FL 33613",
	email = "yaswanthbellamkonda@usf.edu",
}) => {
	return (
		<div className="w-80 top-24 rounded-lg p-4 border-0 space-y-6">
			{/* Bill Details Sidebar */}
			{type === "billDetails" && (
				<>
					<h4 className="font-semibold text-lg mb-2">
						Responsible for Payment
					</h4>
					<p className="text-sm mb-1">{guarantorName}</p>
					<p className="text-sm mb-2">Guarantor #4180031</p>
					<p className="text-sm mb-2">{address}</p>
					<p className="text-sm mb-2">{phone}</p>
					<p className="text-sm text-blue-700">{email}</p>
				</>
			)}

			{/* Bill Summary Sidebar: Show FAQs */}
			{type === "billSummary" && (
				<div className="space-y-6">
					{billingFAQs.map((faq) => (
						<div key={faq.id}>
							<h3 className="text-blue-900 font-semibold text-md mb-1">
								{faq.question}
							</h3>
							<p className="text-gray-700 text-sm leading-5">{faq.answer}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
