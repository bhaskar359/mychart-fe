import React from "react";
import { Link } from "react-router-dom"; // Added Link for 'Create one'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";

// Assuming this is your component file path for the logic hook
import { useLogin } from "../hooks/useLogin";
import { useGoogleSignIn } from "../hooks/useGoogleSignIn";

// Assuming the image path is correct relative to the frontend root
import LoginPageMainImg from "../../../assets/LoginMyChartImg.png";

// The component name is exported as 'Login' for compatibility with your App.tsx import
export const Login: React.FC = () => {
	// ⬇️ Refactored to use RHF structure from useLogin hook
	const { form, handleSubmit, isSubmitting } = useLogin();
	const { handleGoogleSignInClick } = useGoogleSignIn();

	const {
		register,
		formState: { errors },
	} = form;

	// RHF places general submission errors on the 'root' object
	const generalError = errors.root?.message;

	return (
		<div className="flex flex-col md:flex-row bg-[#E1F4FF] min-h-screen">
			{/* LEFT: three vertical bands (top / image / bottom) */}
			<div className="w-full md:w-1/2 flex flex-col">
				<div className="flex-1 bg-[#F6FCFF]" />
				<div className="flex-1 flex items-center justify-center bg-white">
					<img
						src={LoginPageMainImg}
						alt="Illustration"
						className="max-w-full hidden md:block"
					/>
				</div>
				<div className="flex-1 bg-[#E1F4FF]" />
			</div>

			{/* 2. RIGHT: Form Container (White Background, Centered) */}
			<div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6">
				<Card className="w-sm max-w-lg border-none shadow-none rounded-none">
					<CardHeader className="text-center pt-8">
						<div className="text-[52px] font-medium leading-tight">
							<span className="text-custom-tertiary">My</span>
							<span className="text-[#E53935]">Chart</span>
						</div>
						<h2 className="mt-2 text-3xl font-bold text-[#1E293B]">Log in</h2>
					</CardHeader>

					<CardContent className="px-8 pb-8 pt-6">
						{/* ⬇️ Use RHF's handleSubmit function which wraps the async submission */}
						<form onSubmit={handleSubmit} className="space-y-4">
							{/* Email Input */}
							<div className="space-y-1">
								<Input
									id="email"
									type="email"
									placeholder="Username or Email"
									// ⬇️ RHF Integration
									{...register("email")}
									className="h-12 rounded-lg border border-[#D1D5DB] placeholder:text-form-placeholder text-gray-800"
								/>
								{/* ⬇️ RHF Validation Error Display */}
								{errors.email && (
									<p className="text-sm text-red-500">{errors.email.message}</p>
								)}
							</div>

							{/* Password Input */}
							<div className="space-y-1">
								<Input
									id="password"
									type="password"
									placeholder="Password"
									// ⬇️ RHF Integration
									{...register("password")}
									className="h-12 rounded-lg border border-[#D1D5DB] placeholder:text-form-placeholder text-gray-800"
								/>
								{/* ⬇️ RHF Validation Error Display */}
								{errors.password && (
									<p className="text-sm text-red-500">
										{errors.password.message}
									</p>
								)}
							</div>

							{/* Remember + Forgot */}
							<div className="flex items-center justify-between text-sm mt-3">
								<label className="inline-flex items-center gap-2 text-gray-500">
									{/* Note: Checkbox state should ideally be managed by RHF if needed */}
									<Checkbox id="remember" />
									<span className="select-none">Remember me</span>
								</label>

								<Link
									to="/forgot-password"
									className="text-custom-tertiary font-normal hover:underline"
								>
									Forgot password?
								</Link>
							</div>

							{/* General Submission Error Message (from API or root RHF error) */}
							{generalError && (
								<div className="p-3 bg-red-50 text-red-600 border border-red-300 rounded-lg text-sm text-center">
									{generalError}
								</div>
							)}

							{/* Primary login button (Branded Blue) */}
							<div className="flex flex-col items-center mt-7">
								<Button
									type="submit"
									className="w-[clamp(200px,15vw,500px)] h-12 bg-primaryForm hover:bg-[#004080] text-white font-semibold rounded-lg"
									// ⬇️ RHF isSubmitting flag
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<Loader2 className="mr-2 h-5 w-5 animate-spin" />
									) : (
										"Log In"
									)}
								</Button>
							</div>
						</form>

						<div className="flex flex-col items-center">
							{/* Login with Google */}
							<Button
								variant="outline"
								onClick={handleGoogleSignInClick}
								className="w-[clamp(200px,15vw,500px)] h-12 mt-2 rounded-lg border-[#F0EDFF] text-[#1C1C1C] text-md p-0 flex items-center justify-center gap-1"
							>
								<FcGoogle size={32} />
								<span>Login with Google</span>
							</Button>
						</div>

						{/* Create account text */}
						<p className="text-center text-sm text-gray-600 mt-2">
							Don’t have an account?{" "}
							<Link
								to="/register"
								className="text-custom-tertiary hover:underline"
							>
								Create one
							</Link>
						</p>

						{/* Footer: Language & Accessibility */}
						<div className="flex justify-between items-center mt-6 text-sm text-custom-tertiary font-medium">
							<div className="flex items-center gap-2">
								<span role="img" aria-label="globe">
									🌐
								</span>
								<span>Language</span>
							</div>
							<div className="flex items-center gap-2">
								<span role="img" aria-label="accessibility">
									♿
								</span>
								<span>Accessibility</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
