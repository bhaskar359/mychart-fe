import {
	Eye,
	MessageSquare,
	CreditCard,
	Pill,
	ClipboardList,
	Clock,
} from "lucide-react";

import React from "react";
import { useEffect } from "react";

import { Card } from "@/components/ui/card";
import { DashboardLinkCard } from "./components/DashboardLinkCard";
import { useAuthStore } from "@/store/authStore";

export const DashboardView: React.FC = () => {
	const dashboardLinks = [
		{
			Icon: Clock,
			title: "Appointments",
			description: "View, schedule, or reschedule visits",
			href: "/appointments",
		},
		{
			Icon: Eye,
			title: "Visits",
			description: "See details of past and upcoming visits",
			href: "/visits",
		},
		{
			Icon: MessageSquare,
			title: "Messages",
			description: "Communicate with your care team",
			href: "/messages",
		},
		{
			Icon: CreditCard,
			title: "Bills & Payments",
			description: "View bills and make secure payments",
			href: "/billing",
		},
		{
			Icon: Pill,
			title: "Medications",
			description: "Review and manage your subscriptions",
			href: "/medications",
		},
		{
			Icon: ClipboardList,
			title: "Test Results",
			description: "Check your recent results",
			href: "/test-reports",
		},
	];

	const AnnounceAndNotifs = [
		{
			title: "Announcement",
			description: "Thank you for using our portal, have a healthy stay!",
		},
		{
			title: "Notification 1",
			description: "Notification description goes here.",
		},
		{
			title: "Notification 2",
			description: "Notification description goes here.",
		},
	];

	const { user } = useAuthStore();
	useEffect(() => {
		console.log("Logged in user:", user);
	}, [user]);

	const userName =
		user?.firstName && user?.lastName
			? `${user.firstName} ${user.lastName}`
			: "User";
	const userInitials = userName
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase();

	const isAuthenticated = !!user;

	return (
		<div className="p-6 md:p-10 lg:p-12 bg-white flex-grow">
			<div className="max-w-4xl mx-auto text-center">
				<h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome back!</h1>
				<p className="text-lg text-muted-foreground mb-12">
					Your health information at a glance.
				</p>

				<div className="flex  flex-wrap justify-center gap-2">
					{dashboardLinks.map((link, index) => (
						<div
							key={index}
							className="w-[calc(50%-1.5rem)] sm:w-[calc(33.333%-1.5rem)] lg:w-[calc(25%-1.5rem)]"
						>
							<DashboardLinkCard
								key={index}
								Icon={link.Icon}
								title={link.title}
								description={link.description}
								href={link.href}
							/>
						</div>
					))}
				</div>

				<div className="mt-12 space-y-4 max-w-xl mx-auto ">
					{AnnounceAndNotifs.map((notification, index) => (
						<Card
							key={index}
							className="p-4 flex border border-gray-100 shadow-md text-left rounded-xl transition-all duration-200
               hover:shadow-lg hover:border-gray-300"
						>
							<div>
								<h4 className="font-semibold text-lg text-primaryForm">
									{notification.title}
								</h4>
								<p className="text-sm text-gray-600">
									{notification.description}
								</p>
							</div>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};
