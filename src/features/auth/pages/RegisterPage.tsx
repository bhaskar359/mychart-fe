// src/features/auth/pages/RegisterPage.tsx

import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

// Import the custom hook for registration logic
import { useRegister } from "../hooks/useRegister";

// Assuming the image path is correct relative to the frontend root
import LoginPageMainImg from "../../../assets/LoginMyChartImg.png";

// Define colors used in the design (using hex values from your previous code)
const PRIMARY_BLUE = "#00529C"; // Corresponds to text-primaryForm/button background
const BRAND_RED = "#E53935";
const BG_LIGHT_BLUE_TOP = "#F6FCFF";
const BG_LIGHT_BLUE_BOTTOM = "#E1F4FF";

// The component name is exported as 'Register' for compatibility with your App.tsx import
export const Register: React.FC = () => {
	const { formData, loading, error, handleChange, handleSubmit } =
		useRegister();

	// NOTE: The backend API expects: firstName, lastName, email, password, confirmPassword.
	// The previous design included a Phone Number input which is excluded here
	// to match the API structure, but you can uncomment it if your backend supports it.

	return (
		<div className="flex flex-col md:flex-row min-h-screen bg-white">
			{/* 1. LEFT: Illustration and Blue Backgrounds (Matching Login/Signup Aesthetic) */}
			<div className="w-full md:w-1/2 flex flex-col">
				{/* Top background stripe */}
				<div className={`h-1/5 md:h-1/3 bg-[${BG_LIGHT_BLUE_TOP}]`} />

				{/* Center: Image (Illustration) */}
				<div className="flex-1 flex items-center justify-center bg-white p-6 md:p-12 relative overflow-hidden">
					<img
						src={LoginPageMainImg}
						alt="Health Portal Illustration"
						className="max-w-xs md:max-w-md w-full"
					/>
				</div>

				{/* Bottom background stripe */}
				<div className={`h-1/5 md:h-1/3 bg-[${BG_LIGHT_BLUE_BOTTOM}]`} />
			</div>

			{/* 2. RIGHT: Form Container (White Background, Centered) */}
			<div className="w-full md:w-1/2 flex items-center justify-center bg-white p-5">
				<Card className="w-full max-w-lg border-none shadow-none rounded-none">
					{/* LOGO and Title */}
					<CardHeader className="text-center pt-1">
						<div className="text-[32px] font-bold leading-none mb-2">
							<span style={{ color: PRIMARY_BLUE }}>My</span>
							<span style={{ color: BRAND_RED }}>Chart</span>
						</div>
						<h2 className="mt-2 text-3xl font-bold text-[#1C1C1C]">Sign up</h2>

						{/* SUBTITLE */}
						<p className="text-[#4B5563] text-[16px] font-normal text-left pt-2">
							Access your health information, schedule visits, and view results
							securely.
						</p>
					</CardHeader>

					<CardContent className="px-0 pb-8 pt-4">
						<form onSubmit={handleSubmit} className="space-y-3">
							{/* Error Message Display */}
							{error && (
								<div className="p-3 bg-red-50 text-red-600 border border-red-300 rounded-lg text-sm text-center">
									{error}
								</div>
							)}

							{/* Name Fields */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
								<Input
									name="firstName"
									placeholder="First Name"
									value={formData.firstName}
									onChange={handleChange}
									className="h-11 border-gray-300 placeholder:text-gray-400 focus:border-blue-500"
									required
								/>
								<Input
									name="lastName"
									placeholder="Last Name"
									value={formData.lastName}
									onChange={handleChange}
									className="h-11 border-gray-300 placeholder:text-gray-400 focus:border-blue-500"
									required
								/>
							</div>

							{/* Email Input */}
							<Input
								name="email"
								type="email"
								placeholder="Email Address"
								value={formData.email}
								onChange={handleChange}
								className="h-11 border-gray-300 placeholder:text-gray-400 focus:border-blue-500"
								required
							/>

							{/* Password Input */}
							<Input
								name="password"
								type="password"
								placeholder="Password (min 8 characters)"
								value={formData.password}
								onChange={handleChange}
								className="h-11 border-gray-300 placeholder:text-gray-400 focus:border-blue-500"
								required
							/>

							{/* Confirm Password Input */}
							<Input
								name="confirmPassword"
								type="password"
								placeholder="Confirm Password"
								value={formData.confirmPassword}
								onChange={handleChange}
								className="h-11 border-gray-300 placeholder:text-gray-400 focus:border-blue-500"
								required
							/>

							{/* TERMS & CONDITIONS */}
							<div className="flex items-start gap-2 pt-2">
								<Checkbox
									id="terms"
									className="mt-1"
									style={{ borderColor: PRIMARY_BLUE }}
									required
								/>
								<label
									htmlFor="terms"
									className="text-[#374151] text-[14px] leading-snug"
								>
									I agree to the{" "}
									<Link
										to="/terms"
										style={{ color: PRIMARY_BLUE }}
										className="font-medium hover:underline"
									>
										Terms & Conditions
									</Link>{" "}
									and{" "}
									<Link
										to="/privacy"
										style={{ color: PRIMARY_BLUE }}
										className="font-medium hover:underline"
									>
										Privacy Policy
									</Link>
								</label>
							</div>

							{/* SUBMIT BUTTON */}
							<Button
								type="submit"
								className="w-full h-[52px] text-white text-[18px] font-semibold rounded-lg mt-5 transition-colors"
								style={{
									backgroundColor: PRIMARY_BLUE,
									hover: { backgroundColor: "#004080" },
								}}
								disabled={loading}
							>
								{loading ? (
									<Loader2 className="mr-2 h-5 w-5 animate-spin" />
								) : (
									"Create Account"
								)}
							</Button>

							{/* LOGIN LINK */}
							<p className="text-center text-gray-500 text-[16px] pt-2">
								Already have an account?{" "}
								<Link
									to="/login"
									style={{ color: PRIMARY_BLUE }}
									className="font-medium hover:underline"
								>
									Log In
								</Link>
							</p>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
