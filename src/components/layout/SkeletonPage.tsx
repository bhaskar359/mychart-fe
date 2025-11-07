import React from "react";
import { AuthSkeleton } from "@/features/skeletons/AuthSkeleton";
import { DashboardSkeleton } from "@/features/skeletons/DashboardSkeleton";
import { AppointmentsSkeleton } from "@/features/skeletons/AppointmentsSkeleton";
import { ImagingVisitSkeleton } from "@/features/skeletons/ImagingVisitSkeleton";
import { VisitsSkeleton } from "@/features/skeletons/VisitsSkeleton";
import { MessagesSkeleton } from "@/features/skeletons/MessagesSkeleton";
import { BillingSkeleton } from "@/features/skeletons/BillingSkeleton";
import { MedicationsSkeleton } from "@/features/skeletons/MedicationsSkeleton";
import { TestReportsSkeleton } from "@/features/skeletons/TestReportsSkeleton";

type SkeletonType =
  | "auth"
  | "portal"
  | "dashboard"
  | "appointments"
  | "imaging"
  | "visits"
  | "messages"
  | "billing"
  | "medications"
  | "test-reports"
  | "feature";

interface SkeletonPageProps {
  type?: SkeletonType;
}

export const SkeletonPage: React.FC<SkeletonPageProps> = ({
  type = "portal",
}) => {
  switch (type) {
    case "auth":
      return <AuthSkeleton />;
    case "dashboard":
    case "portal":
    case "feature":
      return <DashboardSkeleton />;
    case "appointments":
      return <AppointmentsSkeleton />;
    case "imaging":
      return <ImagingVisitSkeleton />;
    case "visits":
      return <VisitsSkeleton />;
    case "messages":
      return <MessagesSkeleton />;
    case "billing":
      return <BillingSkeleton />;
    case "medications":
      return <MedicationsSkeleton />;
    case "test-reports":
      return <TestReportsSkeleton />;
    default:
      return <DashboardSkeleton />;
  }
};

export {
  AuthSkeleton,
  DashboardSkeleton,
  AppointmentsSkeleton,
  ImagingVisitSkeleton,
  VisitsSkeleton,
  MessagesSkeleton,
  BillingSkeleton,
  MedicationsSkeleton,
  TestReportsSkeleton,
};
