// src/features/appointments/AppointmentsView.tsx (Landing Page)

import React from "react";
import { Link } from "react-router-dom";
import { Stethoscope, Clock, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const AppointmentsView: React.FC = () => {
	return (
		<div className="p-6 md:p-10 lg:p-12 flex-grow">
			<div className="max-w-4xl mx-auto text-center">
				<h1 className="text-3xl font-medium text-[#003D72] mb-10">
					Schedule an Appointment
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
					<Link
						to="/appointments/urgent-care"
						className="block hover:no-underline"
					>
						<Card className="flex flex-col items-center justify-center p-8 h-64 border-0 bg-[#F8F8F8] hover:shadow-2xl transition-shadow duration-300 hover:bg-blue-100">
							<CardContent className="flex flex-col items-center justify-center text-center p-0">
								<div className="w-20 h-20 bg-blue-100 rounded-full border-[#0085F2] border flex items-center justify-center mb-4 shadow-inner">
									<Stethoscope className="w-10 h-10 text-[#0085F2]" />
								</div>
								<div className="flex items-center text-xl font-medium text-gray-800">
									Find Urgent Care
									<span className="ml-2 font-bold text-2xl">→</span>
								</div>
							</CardContent>
						</Card>
					</Link>

					<Link
						to="/appointments/imaging-visit"
						className="block hover:no-underline"
					>
						<Card className="flex flex-col items-center justify-center p-8 h-64 border-0 bg-[#F8F8F8] hover:shadow-2xl transition-shadow duration-300 hover:bg-blue-100">
							<CardContent className="flex flex-col items-center justify-center text-center p-0">
								<div className="w-20 h-20 bg-blue-100 rounded-full border-[#0085F2] border   flex items-center justify-center mb-4 shadow-inner">
									<Clock className="w-10 h-10 text-[#0085F2]" />
								</div>
								<div className="flex items-center text-xl font-medium text-gray-800">
									Schedule an Imaging Visit
									<span className="ml-2 font-bold text-2xl">→</span>
								</div>
								<p className="text-xs text-muted-foreground mt-2 max-w-xs">
									Conveniently schedule an{" "}
									<span className="text-blue-600">
										Outpatient TGH imaging exam
									</span>{" "}
									online at a location near you.
								</p>
							</CardContent>
						</Card>
					</Link>
				</div>

				{/* Note and Home Button */}
				<p className="text-center text-gray-200 text-sm mb-8">
					Note:
					<span className="text-black">
						Need help scheduling? Please contact your Provider.
					</span>
				</p>

				<div className="text-center">
					<Link to="/dashboard">
						<Button variant="outline" className="px-6 py-3 border-gray-300">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Home page
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};
