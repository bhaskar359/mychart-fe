import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PortalNav } from "@/components/PortalNav";
import { SkeletonPage } from "@/components/layout/SkeletonPage";
import { Login } from "./features/auth/Login";
import { Register } from "./features/auth/Register";
import { AuthSkeleton } from "@/features/skeletons/AuthSkeleton";

const AuthView = lazy(() =>
  import("@/features/auth/AuthView").then((module) => ({
    default: module.AuthView,
  }))
);
const DashboardView = lazy(() =>
  import("@/features/dashboard/DashboardView").then((module) => ({
    default: module.DashboardView,
  }))
);
const AppointmentsView = lazy(() =>
  import("@/features/appointments/AppointmentsView").then((module) => ({
    default: module.AppointmentsView,
  }))
);
const ImagingVisitView = lazy(() =>
  import("@/features/appointments/ImagingVisitView").then((module) => ({
    default: module.ImagingVisitView,
  }))
);
const VisitsView = lazy(() =>
  import("@/features/appointments/VisitsView").then((module) => ({
    default: module.VisitsView,
  }))
);
const MessagesView = lazy(() =>
  import("@/features/messages/MessagesView").then((module) => ({
    default: module.MessagesView,
  }))
);
const BillingView = lazy(() =>
  import("@/features/billing/BillingView").then((module) => ({
    default: module.BillingView,
  }))
);
const MedicationsView = lazy(() =>
  import("@/features/medications/MedicationsView").then((module) => ({
    default: module.MedicationsView,
  }))
);
const TestReportsView = lazy(() =>
  import("@/features/test-reports/TestReportsView").then((module) => ({
    default: module.TestReportsView,
  }))
);

const FeatureLayout: React.FC = () => {
  return (
    <>
      <PortalNav />
      <Outlet />
    </>
  );
};

const PortalLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <Suspense fallback={<SkeletonPage type="portal" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  const isAuthenticated = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Suspense fallback={<AuthSkeleton />}>
                <Login />
              </Suspense>
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Suspense fallback={<AuthSkeleton />}>
                <Register />
              </Suspense>
            )
          }
        />

        <Route
          path="/"
          element={
            isAuthenticated ? (
              <PortalLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<SkeletonPage type="dashboard" />}>
                <DashboardView />
              </Suspense>
            }
          />

          <Route path="/" element={<FeatureLayout />}>
            <Route
              path="appointments"
              element={
                <Suspense fallback={<SkeletonPage type="appointments" />}>
                  <AppointmentsView />
                </Suspense>
              }
            />
            <Route
              path="appointments/imaging-visit"
              element={
                <Suspense fallback={<SkeletonPage type="imaging" />}>
                  <ImagingVisitView />
                </Suspense>
              }
            />

            <Route
              path="visits"
              element={
                <Suspense fallback={<SkeletonPage type="visits" />}>
                  <VisitsView />
                </Suspense>
              }
            />
            <Route
              path="messages"
              element={
                <Suspense fallback={<SkeletonPage type="messages" />}>
                  <MessagesView />
                </Suspense>
              }
            />
            <Route
              path="billing"
              element={
                <Suspense fallback={<SkeletonPage type="billing" />}>
                  <BillingView />
                </Suspense>
              }
            />
            <Route
              path="medications"
              element={
                <Suspense fallback={<SkeletonPage type="medications" />}>
                  <MedicationsView />
                </Suspense>
              }
            />
            <Route
              path="test-reports"
              element={
                <Suspense fallback={<SkeletonPage type="test-reports" />}>
                  <TestReportsView />
                </Suspense>
              }
            />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
