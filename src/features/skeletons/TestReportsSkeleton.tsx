import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const TestReportsSkeleton: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <Skeleton className="h-10 w-96 mb-6" />
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 border border-gray-200 rounded-lg">
            <Skeleton className="h-5 w-1/3 mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};
