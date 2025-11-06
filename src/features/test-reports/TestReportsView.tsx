// src/features/test-reports/TestReportsView.tsx (Refactored)

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Search,
  X,
  ClipboardList,
  User,
  ChevronUp,
  ChevronDown,
  Settings,
  FlaskConical,
} from "lucide-react";

// Data structure for sample reports
interface TestReport {
  id: number;
  name: string;
  date: string;
  status: "Normal" | "Abnormal";
  provider: string;
}

const allReports: TestReport[] = [
  {
    id: 101,
    name: "TSH and Free T4",
    date: "Mar 16, 2025",
    status: "Normal",
    provider: "Charlene Johnson, APRN",
  },
  {
    id: 102,
    name: "Test 2",
    date: "Mar 16, 2025",
    status: "Abnormal",
    provider: "Thomson White, APRN",
  },
  {
    id: 103,
    name: "Test 3",
    date: "Mar 12, 2025",
    status: "Normal",
    provider: "Charlene Johnson, APRN",
  },
  {
    id: 104,
    name: "Test 4",
    date: "Mar 12, 2025",
    status: "Normal",
    provider: "Walker Red, TRPN",
  },
];

// Component for a single result row
const ResultRow: React.FC<{ report: TestReport }> = ({ report }) => {
  const statusClasses =
    report.status === "Abnormal"
      ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
      : "text-gray-600";

  return (
    <div className="flex items-center py-3 px-4 border-b last:border-b-0">
      {/* Icon and Title */}
      <div className="flex items-center w-5/12">
        <FlaskConical className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-semibold text-gray-800">{report.name}</h4>
          <p className="text-xs text-muted-foreground">{report.date}</p>
        </div>
      </div>

      {/* Status Tag */}
      <div className="w-2/12">
        {report.status === "Abnormal" && (
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusClasses}`}
          >
            Abnormal
          </span>
        )}
      </div>

      {/* Provider */}
      <div className="w-5/12 flex items-center justify-end text-sm">
        <User className="w-4 h-4 text-gray-400 mr-2" />
        <span className="text-gray-700">{report.provider}</span>
      </div>
    </div>
  );
};

export const TestReportsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(true); // Matches open state in screenshot

  // Simple filter logic for display count
  const filteredReports = allReports.filter((report) =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 lg:p-12 bg-white flex-grow">
      <div className="max-w-7xl mx-auto flex">
        {/* A. Main Content Column */}
        <div className="flex-grow max-w-4xl mr-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Test Results
          </h1>

          {/* Search Bar */}
          <div className="relative flex items-center mb-8 border border-gray-300 rounded-lg shadow-sm">
            <Search className="w-5 h-5 text-gray-500 ml-4" />
            <input
              type="text"
              placeholder="Search test results..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-2 pr-10 focus:outline-none rounded-lg"
            />
            {searchTerm && (
              <X
                className="w-5 h-5 text-gray-500 mr-4 cursor-pointer hover:text-red-500"
                onClick={() => setSearchTerm("")}
              />
            )}
          </div>

          {/* Results List */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Individual Results
            <span className="text-sm font-normal text-muted-foreground ml-2">
              ({filteredReports.length} of {allReports.length})
            </span>
          </h2>

          <Card className="p-0 border border-gray-200 shadow-lg mb-8">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <ResultRow key={report.id} report={report} />
              ))
            ) : (
              <p className="p-4 text-center text-muted-foreground">
                No results found matching "{searchTerm}".
              </p>
            )}
            <p className="text-center text-xs text-muted-foreground py-2">
              End of results
            </p>
          </Card>

          {/* Home page button */}
          <div className="mt-12 text-center">
            <Link to="/dashboard">
              <Button variant="outline" className="px-6 py-3 border-gray-300">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Home page
              </Button>
            </Link>
          </div>
        </div>

        {/* B. Sidebar Column (Settings and Filters) */}
        <Card className="w-80 p-0 shadow-md border border-gray-100 flex-shrink-0 h-fit bg-gray-50 rounded-lg">
          {/* Header with Toggle */}
          <div
            className="flex justify-between items-center p-4 cursor-pointer border-b bg-white rounded-t-lg"
            onClick={() => setShowFilters(!showFilters)}
          >
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <Settings className="w-5 h-5 mr-2" /> Settings and filters
            </h3>
            {showFilters ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </div>

          {/* Filter Content */}
          {showFilters && (
            <div className="p-4 space-y-4">
              <h4 className="font-semibold text-gray-700">
                Show results from hospital visits?
              </h4>
              <div className="flex space-x-2">
                {/* Mimicking the Yes/No buttons from the screenshot */}
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Yes
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-gray-700 border-gray-300"
                >
                  No
                </Button>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <Link
                  to="/test-preferences"
                  className="text-blue-600 hover:underline text-sm flex items-center"
                >
                  <ClipboardList className="w-4 h-4 mr-1" /> Test result
                  preferences
                </Link>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
