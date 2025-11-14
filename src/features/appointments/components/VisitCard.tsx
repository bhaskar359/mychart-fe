import React from "react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";

interface VisitCardProps {
	id: string;
	date: string;
	office: string;
	provider: string;
	location: string;
}

export const VisitCard: React.FC<VisitCardProps> = ({
	id,
	date,
	office,
	provider,
	location,
}) => {
	const navigate = useNavigate();
	const isPastVisit = new Date(date).getTime() > new Date().getTime();
	console.log(`${id}: ${isPastVisit}`);

	return (
		<div
			className="
        w-full bg-[#F9F9F9] border border-black/20 rounded-[60px]
        flex flex-wrap items-center justify-between
        px-6 py-4 shadow-sm gap-4 md:gap-6 lg:gap-10
        overflow-hidden
      "
		>
			{/* Date */}
			<div className="text-sm md:text-base font-normal text-black whitespace-nowrap shrink-0">
				{formatDate(date)}
			</div>

			<div className="hidden md:block w-px h-10 bg-black/30" />

			{/* Visit Info */}
			<div className="flex-1 text-sm text-black flex flex-col overflow-hidden">
				<p className="truncate">{office}</p>
				<p className="truncate">{provider}</p>
				<p className="truncate">{location}</p>
			</div>

			<div className="hidden md:block w-px h-10 bg-black/30" />

			{/* Buttons */}
			<div className="flex flex-wrap gap-3 md:gap-6 items-center justify-end shrink-0">
				{isPastVisit ? (
					<span className="text-gray-400 cursor-not-allowed">
						View after visit summary
					</span>
				) : (
					<Link
						to={`/visit-details/${id}?tab=summary`}
						className="text-[#00529C] hover:underline"
					>
						View after visit summary
					</Link>
				)}

				<div className="hidden md:block w-px h-10 bg-black/30" />

				{isPastVisit ? (
					<span className="text-gray-400 cursor-not-allowed">
						View after visit summary
					</span>
				) : (
					<Link
						to={`/visit-details/${id}?tab=notes`}
						className="text-[#00529C] hover:underline"
					>
						View Clinical Notes
					</Link>
				)}
			</div>
		</div>
	);
};
