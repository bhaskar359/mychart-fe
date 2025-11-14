import {
	Eye,
	MessageSquare,
	CreditCard,
	Pill,
	ClipboardList,
	Clock,
	Bell,
} from "lucide-react";
import React, { useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { DashboardLinkCard } from "./components/DashboardLinkCard";
import { useAuthStore } from "@/store/authStore";
import { useAppointments } from "@/hooks/useAppointments";

export const DashboardView: React.FC = () => {
	const { data: appointments, isLoading, isError } = useAppointments();

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

	// Compute upcoming appointments (next 2)
	const upcomingAppointments = useMemo(() => {
		if (!appointments) return [];
		const now = new Date();
		return appointments
			.filter((a) => a.appointment_date > now)
			.sort(
				(a, b) => a.appointment_date.getTime() - b.appointment_date.getTime()
			)
			.slice(0, 2);
	}, [appointments]);

	const AnnounceAndNotifs = useMemo(() => {
		const base = [];

		if (isLoading) {
			base.push({
				title: "Loading schedules...",
				description: "Fetching your upcoming appointments...",
			});
		} else if (isError) {
			base.push({
				title: "Error fetching appointments",
				description: "Please refresh or try again later.",
			});
		} else if (upcomingAppointments.length > 0) {
			upcomingAppointments.forEach((app) => {
				base.push({
					title: `${app.appointment_type}`,
					description: `${app.appointment_date.toLocaleString([], {
						dateStyle: "medium",
					})} ${", " + app.appointment_time.slice(0, 5)} — ${
						app.location_name || "General Checkup"
					}`,
				});
			});
		} else {
			base.push({
				title: "No upcoming appointments",
				description: "You have no scheduled visits at the moment.",
			});
		}
		return base;
	}, [upcomingAppointments, isLoading, isError]);

	return (
		<div className="p-6 md:p-10 lg:p-12 bg-white flex-grow">
			<div className="max-w-4xl mx-auto text-center">
				<h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome back!</h1>
				<p className="text-lg text-muted-foreground mb-12">
					Your health information at a glance.
				</p>

				<div className="flex flex-wrap justify-center gap-2">
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

				<div className="mt-12 max-w-xl mx-auto">
					{/* Top Left Bell Icon */}
					<div className="flex items-center mb-4">
						<Bell className="w-6 h-6 text-primaryForm mr-2" />
						<h3 className="text-xl font-semibold text-gray-800">
							Notifications
						</h3>
					</div>

					{/* Notification Cards */}
					<div className="space-y-4">
						{AnnounceAndNotifs.map((notification, index) => (
							<Card
								key={index}
								className="p-4 flex border border-gray-100 shadow-md text-left rounded-xl 
                transition-all duration-200 hover:shadow-lg hover:border-gray-300"
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
		</div>
	);
};
