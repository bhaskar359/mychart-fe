import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Undo2 } from "lucide-react";

export const HomePageButton: React.FC = () => {
	return (
		<div className="mt-10 text-center flex justify-center">
			<Link to="/dashboard">
				<Button
					variant="outline"
					className="flex items-center justify-center gap-2 border border-[#B9D1F1] text-[#2563EB] bg-[#EAF2FF] hover:rounded-xl px-6 py-2 text-sm font-light shadow-sm transition-all"
				>
					<Undo2 className="h-4 w-4" /> Home page
				</Button>
			</Link>
		</div>
	);
};
