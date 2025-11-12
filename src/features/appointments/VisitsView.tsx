// src/features/appointments/VisitsView.tsx

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VisitCard } from "./components/VisitCard"; // The new component
import { ArrowRight, BookText } from "lucide-react";
import { HomePageButton } from "@/components/layout/HomePageButton";
import { useAppointments } from "@/hooks/useAppointments";
import { VisitsSkeleton } from "../skeletons/VisitsSkeleton";
import { format, isFuture, isPast } from "date-fns";
import type { Appointment } from "@/types/appointments.types";

export const VisitsView: React.FC = () => {
	const {
		data: appointments,
		isLoading,
		isError,
		error,
		refetch,
	} = useAppointments();

	// I want to fetch the appointements data whenever navigated to other and come back
	useEffect(() => {
		// Only run refetch if the function is available
		if (refetch) {
			refetch();
		}
	}, [refetch]);

	if (isLoading) {
		return <VisitsSkeleton />;
	}

	if (isError) {
		return (
			<div className="p-8 text-center text-red-600">
				Error loading data: {error.message}
			</div>
		);
	}
	if (!appointments || appointments.length === 0) {
		return (
			<div className="p-8 text-center text-gray-500">
				You have no scheduled appointments or past visit history.
				<button
					className="ml-4 px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition"
					onClick={() => (window.location.href = "/appointments")}
				>
					Schedule an Appointment
				</button>
			</div>
		);
	}

	const upcoming = appointments
		.filter((a) => isFuture(a.appointment_date))
		.sort(
			(a, b) => a.appointment_date.getTime() - b.appointment_date.getTime()
		);
	const past = appointments
		.filter((a) => isPast(a.appointment_date) && a.status === "Completed")
		.sort(
			(a, b) => b.appointment_date.getTime() - a.appointment_date.getTime()
		);

	const groupedPast = past.reduce((acc, visit) => {
		const monthKey = format(visit.appointment_date, "MMMM yyyy");
		if (!acc[monthKey]) {
			acc[monthKey] = [];
		}
		acc[monthKey].push(visit);
		return acc;
	}, {} as Record<string, Appointment[]>);

	return (
		<div className="mx-auto py-10">
			<div className="flex flex-col lg:flex-row gap-8">
				{/* 1. Main Content Column */}
				<div className="grow lg:w-3/4 bg-[#F4F5F6] pl-10 rounded-r-4xl inset-shadow-[0px_4px_25px_3px_rgba(0,0,0,0.25)] inset-shadow-gray-200 p-6">
					{/* Header and Schedule Button */}
					<div className="flex justify-between items-center mb-6">
						<h1 className="text-3xl font-bold text-[#003D72]">
							Appointments and Visits
						</h1>
						<Link to="/appointments">
							<Button className="bg-[#00529C] hover:bg-blue-700 text-white font-semibold">
								Schedule an Appointment <ArrowRight className="w-4 h-4 ml-2" />
							</Button>
						</Link>
					</div>

					{/* Upcoming Visits Section */}
					<h2 className="text-xl font-semibold text-[#003D72] mt-8 mb-4">
						Upcoming Visits
					</h2>
					{upcoming.length > 0 ? (
						<div className="space-y-4">
							{upcoming.map((visit) => (
								<div className="flex items-start gap-4 mb-6">
									<div className=" flex flex-col items-center">
										<div className="w-2 h-2 bg-[#0085F2] rounded-full"></div>

										<div className="w-0.5 bg-[#0085F2] h-[90px]"></div>
									</div>
									<VisitCard
										key={visit.id}
										date={visit.appointment_date.toISOString()}
										office={visit.location_name}
										provider={
											visit.physician_first_name +
											" " +
											visit.physician_last_name
										}
										location={visit.location_address}
									/>
								</div>
							))}
						</div>
					) : (
						<Card className="p-8 shadow-inner bg-gray-50 border-gray-200 mb-8">
							<p className="text-center text-muted-foreground">
								There are no upcoming visits to display.
							</p>
						</Card>
					)}

					{/* Past Visits Section */}
					<h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
						Past Visits
					</h2>

					{/* Past Visit Cards */}
					{/* {pastVisits.map((visit, index) => (
						<div key={index} className="flex items-start gap-4 mb-6">
							<div className="relative flex flex-col items-center">
								<div className="w-2 h-2 bg-[#0085F2] rounded-full"></div>

								<div className="w-0.5 bg-[#0085F2] h-[110px]"></div>
							</div>

							<div className="flex flex-col">
								<p className="text-[#0085F2] text-sm font-medium mb-1">
									{index === 0 ? "3 Months ago" : "4 Months ago"}
								</p>
								<VisitCard {...visit} />
							</div>
						</div>
					))} */}
					{past.length > 0 ? (
						<div className="space-y-4">
							{Object.entries(groupedPast).map(([month, visits]) => (
								<div>
									<h4 className="text-sm font-bold uppercase text-gray-500 mb-2">
										{month}
									</h4>
									{visits.map((visit) => (
										<div className="flex items-start gap-4 mb-6">
											<div className=" flex flex-col items-center">
												<div className="w-2 h-2 bg-[#0085F2] rounded-full"></div>

												<div className="w-0.5 bg-[#0085F2] h-[90px]"></div>
											</div>
											<VisitCard
												key={visit.id}
												date={visit.appointment_date.toISOString()}
												office={visit.location_name}
												provider={
													visit.physician_first_name +
													" " +
													visit.physician_last_name
												}
												location={visit.location_address}
											/>
										</div>
									))}
								</div>
							))}
						</div>
					) : (
						<div className="text-gray-500 italic p-4 bg-gray-100 rounded-lg">
							No completed past visit records found.
						</div>
					)}
				</div>

				{/* 3. Sidebar Column (Related Links) */}
				<div className="grow lg:w-1/4 bg-[#F4F5F6] rounded-l-4xl inset-shadow-[0px_4px_25px_3px_rgba(0,0,0,0.25)] inset-shadow-gray-200 p-6">
					<h3 className="text-lg font-bold text-[#003D72] mb-4">
						Related Links
					</h3>
					<ul className="space-y-3 text-sm text-[#00529C] ">
						<li className="hover:underline flex cursor-pointer">
							<BookText size={18} className="pr-1" />
							Document Center
						</li>
					</ul>
				</div>
			</div>
			<HomePageButton />
		</div>
	);
};
