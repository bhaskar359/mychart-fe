// src/features/appointments/components/VisitCard.tsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

interface VisitCardProps {
	date: string;
	office: string;
	provider: string;
	location: string;
}

export const VisitCard: React.FC<VisitCardProps> = ({
	date,
	office,
	provider,
	location,
}) => {
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

			{/* Divider */}
			<div className="hidden md:block w-px h-10 bg-black/30" />

			{/* Visit Info */}
			<div
				className="
      flex-1
      text-sm font-normal text-black
      flex flex-col leading-[22px]
      overflow-hidden text-ellipsis
    "
			>
				<p className="truncate">{office}</p>
				<p className="truncate">{provider}</p>
				<p className="truncate">{location}</p>
			</div>

			{/* Divider */}
			<div className="hidden md:block w-px h-10 bg-black/30" />

			{/* Buttons Container */}
			<div className="flex flex-wrap gap-3 md:gap-6 items-center justify-end shrink-0">
				<Button
					disabled={date > new Date().toISOString()}
					variant="link"
					className="
          text-[#00529C] text-sm md:text-base font-normal
          hover:underline p-0 h-auto whitespace-nowrap
        "
				>
					View after visit summary
				</Button>

				<div className="hidden md:block w-px h-10 bg-black/30" />

				<Button
					disabled={date > new Date().toISOString()}
					variant="link"
					className="
          text-[#00529C] text-sm md:text-base font-normal
          hover:underline p-0 h-auto whitespace-nowrap
        "
				>
					View Clinical Notes
				</Button>
			</div>
		</div>
	);
};
