import React, { useMemo, useState } from "react";
import { useTestResults } from "@/hooks/useTestResults";
import { TestReportsSkeleton } from "../skeletons/TestReportsSkeleton";
import {
	Search,
	FlaskConical,
	Settings,
	ChevronUp,
	AlertCircle,
	User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import { HomePageButton } from "@/components/layout/HomePageButton";

export const TestReportsView: React.FC = () => {
	const { results, isLoading, isError, error } = useTestResults();
	const [searchTerm, setSearchTerm] = useState("");

	// ⭐ NEW STATE TO SHOW PDF
	const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

	const filteredResults = useMemo(() => {
		if (!results) return [];
		const term = searchTerm.toLowerCase();
		return results.filter(
			(r) =>
				r.test_name.toLowerCase().includes(term) ||
				r.physician_first_name.toLowerCase().includes(term) ||
				r.physician_last_name.toLowerCase().includes(term)
		);
	}, [results, searchTerm]);

	if (isLoading) return <TestReportsSkeleton />;

	if (isError) {
		return (
			<div className="max-w-7xl mx-auto px-4 py-16 text-center">
				<AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
				<h1 className="text-2xl font-semibold text-red-700">
					Error Loading Results
				</h1>
				<p className="text-muted-foreground mt-2">
					Could not retrieve your test reports. Please try again later.
				</p>
				<p className="text-xs text-gray-500 mt-1">
					{error instanceof Error ? error.message : "Unknown error"}
				</p>
			</div>
		);
	}

	const reportCount = results ? results.length : 0;

	// ⭐ FUNCTION TO SET THE PDF URL
	const handleOpenPdf = (testName: string) => {
		const pdfName = testName
			.toLowerCase()
			.split(" ")
			.map((w) => w[0])
			.join("")
			.substring(0, 3);
		console.log(pdfName);
		setSelectedPdf(`/results/${pdfName}.pdf`);
	};

	return (
		<div className="mx-auto py-10">
			<div className="flex flex-col lg:flex-row gap-8">
				{/* ===========================
            PDF VIEWER (IF SELECTED) 
        ============================ */}
				{selectedPdf ? (
					<div className="grow lg:w-3/4 bg-white rounded-xl p-4 shadow-md">
						<Button
							variant="ghost"
							className="text-[#00529C] mb-4"
							onClick={() => setSelectedPdf(null)}
						>
							← Back to Results
						</Button>

						<iframe
							src={selectedPdf}
							className="w-full h-[85vh] border rounded-xl"
							title="Test Result PDF"
						/>
					</div>
				) : (
					/* ===========================
              ORIGINAL RESULTS LIST
          ============================ */
					<div className="grow lg:w-3/4 bg-[#F4F5F6] pl-10 rounded-r-4xl inset-shadow-[0px_4px_25px_3px_rgba(0,0,0,0.25)] p-6">
						<h1 className="text-3xl font-semibold text-[#003D72] mb-6">
							Test Results
						</h1>

						<div className="relative mb-8 bg-white rounded-full">
							<Input
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder="Search test results..."
								className="h-12 pl-6 pr-12 text-[15px] border border-[#C6D2E1] rounded-full focus:ring-2 focus:ring-[#00529C]"
							/>
							<Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#6B7280] h-5 w-5" />
						</div>

						<div className="relative">
							<h2 className="text-2xl text-[#003D72] mb-4">
								Individual Results
							</h2>
							<span className="absolute right-6 top-1/2 -translate-y-1/2 text-sm text-gray-500 italic">
								({filteredResults.length} of {results.length})
							</span>
						</div>

						<div className="space-y-5">
							{reportCount > 0 ? (
								filteredResults.map((result) => (
									<div
										key={result.id}
										className="flex items-center justify-between bg-white shadow-md rounded-2xl px-6 py-4 hover:shadow-lg transition-all duration-200 cursor-pointer"
										onClick={() => handleOpenPdf(result.test_name)} // ⭐ CLICK TO OPEN PDF
									>
										<div className="flex items-center gap-4">
											<FlaskConical className="text-[#00529C] h-6 w-6" />
											<div>
												<p className="text-[#00529C] text-[17px] leading-tight">
													{result.test_name}
												</p>
												<p className="text-sm text-[#767676]">
													{formatDate(result.result_date)}
												</p>
											</div>
										</div>

										{result.status.toLowerCase() === "abnormal" && (
											<span className="bg-[#F5E8DA] text-[#8C4B0E] text-sm font-medium px-4 py-1 rounded-full border border-[#E0CBB3]">
												Abnormal
											</span>
										)}

										<p className="text-sm text-[#757575] font-medium flex items-center w-1/4 gap-2">
											<User className="h-8 w-8 p-0.5 bg-[#DBDBDB] rounded-full" />
											{result.physician_first_name} {result.physician_last_name}
										</p>
									</div>
								))
							) : (
								<div className="p-10 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-gray-500">
									No test results found.
								</div>
							)}
						</div>

						<p className="text-center italic text-[#6B7280] mt-8">
							End of results
						</p>
					</div>
				)}

				{/* === RIGHT SIDEBAR (unchanged) === */}
				<div className="grow lg:w-1/4 bg-[#F4F5F6] pl-10 rounded-l-4xl inset-shadow-[0px_4px_25px_3px_rgba(0,0,0,0.25)] p-6">
					<div className=" bg-white rounded-3xl border border-[#E2E8F0] shadow-md p-5 space-y-4 h-fit">
						<div className="flex items-center justify-between text-[#1E293B] font-semibold">
							<span className="flex items-center">
								<Settings className="h-5 w-5 mr-2" />
								Settings and filters
							</span>
							<ChevronUp className="h-5 w-5 cursor-pointer text-[#475569]" />
						</div>
						<hr className="border-[#E2E8F0]" />

						<div className="space-y-2">
							<p className="text-sm font-medium text-[#334155]">
								Show results from hospital visits?
							</p>
							<div className="flex gap-2">
								<Button
									size="sm"
									className="bg-[#00529C] text-white hover:bg-[#004080]"
								>
									Yes
								</Button>
								<Button
									size="sm"
									variant="outline"
									className="text-[#1E293B] border-[#CBD5E1] hover:bg-[#F1F5F9]"
								>
									No
								</Button>
							</div>
						</div>

						<p className="text-sm text-[#00529C] cursor-pointer hover:underline">
							Test result preferences
						</p>
					</div>
				</div>
			</div>

			<HomePageButton />
		</div>
	);
};
