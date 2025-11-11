import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";

interface DashboardLinkCardProps {
	Icon: LucideIcon;
	title: string;
	description: string;
	href: string;
}

export const DashboardLinkCard: React.FC<DashboardLinkCardProps> = ({
	Icon,
	title,
	description,
	href,
}) => {
	return (
		<Link to={href} className="block h-full">
			<Card
				className="
                    h-[min(150px,30vh)]
                    w-[min(160px,30vh)]
                    p-4 
                    shadow-sm 
                    border-2 
                    border-gray-200 
                    group
                    hover:bg-custom-primary
                    transition-all 
                    duration-200 
                    cursor-pointer
                "
			>
				<CardContent className="flex  flex-col items-center justify-center text-center p-0 pt-4">
					<div
						className="w-8 h-8 flex items-center justify-center rounded-full mb-2 transition-all duration-200 
                    group-hover:bg-white"
					>
						<Icon className="w-6 h-6 text-blue-800" />
					</div>

					<h3 className="text-sm text-primaryForm transition-colors duration-200 group-hover:text-primaryForeground mb-1">
						{title}
					</h3>

					<p className="text-xs text-muted-foreground line-clamp-2 transition-colors duration-200 group-hover:text-primaryForeground px-1">
						{description}
					</p>
				</CardContent>
			</Card>
		</Link>
	);
};
