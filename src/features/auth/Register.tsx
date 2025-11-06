import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

import LoginPageMainImg from "../../assets/LoginMyChartImg.png";

export const Register: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* LEFT: three vertical bands (top / image / bottom) */}
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="flex-1 bg-[#F6FCFF]" />
        <div className="flex-1 flex items-center justify-center bg-white">
          <img
            src={LoginPageMainImg}
            alt="Login Page Main Image"
            className="max-w-full hidden md:block"
          />
        </div>
        <div className="flex-1 bg-[#E1F4FF]" />
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-5">
        <Card className="w-full max-w-lg border-none shadow-none rounded-none">
          <CardHeader className="text-center pt-1">
            <div className="text-[42px] font-medium leading-tight">
              <span className="text-primaryForm">My</span>
              <span className="text-[#E53935]">Chart</span>
            </div>
            <h2 className="mt-2 text-4xl font-bold text-dark-blue">Sign up</h2>

            {/* SUBTITLE */}
            <p className="text-[#4B5563] text-[18px] font-normal text-left">
              Access your health information, schedule visits, and view results
              securely.
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-8 ">
            <form className="space-y-2">
              <Input
                placeholder="First Name"
                className="h-[52px] border-[#D1D5DB] text-[16px] placeholder:text-form-placeholder"
              />
              <Input
                placeholder="Last Name"
                className="h-[52px] border-[#D1D5DB] text-[16px] placeholder:text-form-placeholder"
              />
              <Input
                type="email"
                placeholder="Email Address"
                className="h-[52px] border-[#D9D9D9] text-[16px] placeholder:text-form-placeholder"
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                className="h-[52px] border-[#D9D9D9] text-[16px] placeholder:text-form-placeholder"
              />
              <Input
                type="password"
                placeholder="Password"
                className="h-[52px] border-[#D9D9D9] text-[16px] placeholder:text-form-placeholder"
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                className="h-[52px] border-[#D9D9D9] text-[16px] placeholder:text-form-placeholder"
              />

              {/* TERMS & CONDITIONS */}
              <div className="flex items-start gap-2 mt-1">
                <Checkbox id="terms" className="mt-1 border-[#00529C]" />
                <label
                  htmlFor="terms"
                  className="text-[#374151] text-[14px] leading-tight"
                >
                  I agree to the{" "}
                  <span className="text-[#00529C] font-medium cursor-pointer">
                    Terms & Conditions
                  </span>{" "}
                  and <br />
                  <span className="text-[#00529C] font-medium cursor-pointer">
                    Privacy Policy
                  </span>
                </label>
              </div>

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                className="w-full h-[52px] bg-[#00529C] text-white text-[18px] font-semibold rounded-lg mt-4"
              >
                Create Account
              </Button>
              <p className="text-center text-form-placeholder text-[16px] mt-2">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#00529C] font-medium hover:underline"
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
