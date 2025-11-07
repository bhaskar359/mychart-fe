import React from "react";
import { Search, FlaskConical, Settings, ChevronUp, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

// --- Mock Data Structure ---
interface TestResult {
  id: number;
  title: string;
  date: string;
  physician: string;
  status?: "Abnormal"; // Only present for abnormal results
}

const mockResults: TestResult[] = [
  {
    id: 1,
    title: "TSH and Free T4",
    date: "Mar 16, 2025",
    physician: "Charlene Johnson, APRN",
  },
  {
    id: 2,
    title: "Test 2",
    date: "Mar 16, 2025",
    physician: "Thomson White, APRN",
    status: "Abnormal",
  },
  {
    id: 3,
    title: "Test 3",
    date: "Mar 12, 2025",
    physician: "Charlene Johnson, APRN",
  },
  {
    id: 4,
    title: "Test 4",
    date: "Mar 12, 2025",
    physician: "Walker Red, TRPN",
  },
];

export const TestReportsView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-semibold text-foreground mb-6">
        Test Results
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- Left Column: Search and Results --- */}
        <div className="flex-grow lg:w-3/4">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search test results..."
              className="pl-10 pr-4 py-6 text-base"
            />
          </div>

          {/* Individual Results Container */}
          <h2 className="text-lg font-medium mb-3">
            Individual Results ({mockResults.length} of {mockResults.length})
          </h2>

          {/* Refactored: Iterating over results to create individual cards */}
          <div className="space-y-4">
            {mockResults.map((result) => (
              <div
                key={result.id}
                // APPLYING CARD STYLES TO EACH ITEM:
                // White background, rounded, subtle border, and shadow-sm for the lift effect
                className="bg-white rounded-lg border border-border p-4 shadow-sm transition-all duration-150 hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Icon: Flask or a suitable icon from the screenshot */}
                    <FlaskConical className="h-6 w-6 text-brandPrimary" />

                    <div>
                      {/* Title and Date */}
                      <p className="font-medium text-foreground">
                        {result.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {result.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Abnormal Status Tag */}
                    {result.status === "Abnormal" && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        Abnormal
                      </span>
                    )}
                    {/* Physician Name */}
                    <p className="text-sm text-muted-foreground hidden sm:block">
                      {result.physician}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-6">
            End of results
          </p>
        </div>

        {/* --- Right Column: Settings and Filters --- */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg border border-border shadow-sm p-4 space-y-4">
            <div className="flex items-center justify-between font-semibold text-foreground">
              <span className="flex items-center">
                <Settings className="h-5 w-5 mr-2" /> Settings and filters
              </span>
              <ChevronUp className="h-5 w-5 cursor-pointer" />
            </div>
            <hr className="border-border" />

            <div className="space-y-2">
              <p className="text-sm font-medium">
                Show results from hospital visits?
              </p>
              <div className="flex space-x-2">
                {/* Buttons use primary/secondary color variables */}
                <Button
                  size="sm"
                  className="bg-brandPrimaryBg text-brandPrimaryBg-font"
                >
                  Yes
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-foreground border-border hover:bg-muted"
                >
                  No
                </Button>
              </div>
            </div>
            <p className="text-sm text-brandAccent cursor-pointer">
              Test result preferences
            </p>
          </div>
        </div>
      </div>

      {/* Home Page Button */}
      <div className="mt-10 text-center">
        <Link to="/dashboard">
          <Button
            variant="outline"
            className="border-border text-foreground hover:bg-muted"
          >
            <Home className="mr-2 h-4 w-4" /> Home page
          </Button>
        </Link>
      </div>
    </div>
  );
};
