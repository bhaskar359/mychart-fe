import React, { lazy, Suspense } from "react";
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	Outlet,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// ⬇️ IMPORT AUTH HOOKS & STORES
import { useAuthInit } from "./hooks/useAuthInit";
import { useAuthStore } from "@/store/authStore";
// Import components
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PortalNav } from "@/components/PortalNav";
import { SkeletonPage } from "@/components/layout/SkeletonPage";
import { Login } from "./features/auth/pages/LoginPage";
import { Register } from "./features/auth/pages/RegisterPage";
import { AuthSkeleton } from "@/features/skeletons/AuthSkeleton";

// --- LAZY-LOADED VIEWS (Optimization) ---

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

// --- LAYOUT COMPONENTS ---

// Layout for pages with sidebar navigation
const FeatureLayout: React.FC = () => {
	return (
		<>
			<PortalNav />
			<Outlet />
		</>
	);
};

// Main layout for authenticated portal
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

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // Data considered fresh for 5 minutes
		},
	},
});

// --- MAIN APPLICATION COMPONENT ---
const App: React.FC = () => {
	// 1. Run the initialization hook to check for persisted session (JWT)
	const { isCheckingSession } = useAuthInit();

	// 2. Get current authentication state
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	// 3. BLOCK RENDERING while the session is being checked
	if (isCheckingSession) {
		// This prevents the blank screen issue by ensuring isAuthenticated
		// is correctly set before the router logic runs.
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-50">
				<AuthSkeleton />
			</div>
		);
	}

	// 4. RENDER ROUTER based on the final, confirmed authentication state
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					{/* 1. PUBLIC AUTHENTICATION ROUTES (Login/Register) */}
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

					{/* 2. PROTECTED PORTAL ROUTES (Wrapped by PortalLayout) */}
					<Route
						path="/"
						element={
							isAuthenticated ? (
								<PortalLayout />
							) : (
								<Navigate to="/login" replace /> // Redirect if not authenticated
							)
						}
					>
						{/* Dashboard Route (Root of the authenticated section) */}
						<Route
							path="dashboard"
							element={
								<Suspense fallback={<SkeletonPage type="dashboard" />}>
									<DashboardView />
								</Suspense>
							}
						/>

						{/* Nested Feature Routes using FeatureLayout */}
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

						{/* Root path redirect: Redirect authenticated users from / to /dashboard */}
						<Route index element={<Navigate to="/dashboard" replace />} />
					</Route>

					{/* 3. FINAL CATCH-ALL: Redirects unhandled paths */}
					<Route
						path="*"
						element={
							isAuthenticated ? (
								<Navigate to="/dashboard" replace />
							) : (
								<Navigate to="/login" replace />
							)
						}
					/>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
};

export default App;
