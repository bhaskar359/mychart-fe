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
      <main className="flex-grow">
        <Suspense fallback={<SkeletonPage type="portal" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  const isAuthenticated = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Suspense fallback={<SkeletonPage type="auth" />}>
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
              <Suspense fallback={<SkeletonPage type="auth" />}>
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
          <Route path="dashboard" element={<DashboardView />} />

          <Route path="/" element={<FeatureLayout />}>
            <Route path="appointments" element={<AppointmentsView />} />
            <Route
              path="appointments/imaging-visit"
              element={<ImagingVisitView />}
            />

            <Route path="visits" element={<VisitsView />} />
            <Route path="messages" element={<MessagesView />} />
            <Route path="billing" element={<BillingView />} />
            <Route path="medications" element={<MedicationsView />} />
            <Route path="test-reports" element={<TestReportsView />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
