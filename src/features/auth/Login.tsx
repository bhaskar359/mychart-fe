import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { FcGoogle } from "react-icons/fc";
import LoginPageMainImg from "../../assets/LoginMyChartImg.png";

export const Login: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
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

      {/* RIGHT: form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6">
        <Card className="w-full max-w-lg border-none shadow-none rounded-none">
          <CardHeader className="text-center pt-8">
            <div className="text-[42px] font-medium leading-tight">
              <span className="text-primaryForm">My</span>
              <span className="text-[#E53935]">Chart</span>
            </div>
            <h2 className="mt-4 text-4xl font-bold text-dark-blue">Log in</h2>
          </CardHeader>

          <CardContent className="px-8 pb-8 pt-6">
            <form className="space-y-4">
              {/* Username (placeholder only) */}
              <Input
                id="username"
                type="text"
                placeholder="Username"
                className="h-14 rounded-lg border border-[#D1D5DB] placeholder:text-form-placeholder text-gray-800"
                required
              />

              {/* Password (placeholder only) */}
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="h-14 rounded-lg border border-[#D1D5DB] placeholder:text-form-placeholder text-gray-800"
                required
              />

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-2 text-gray-700">
                  <Checkbox id="remember" />
                  <span className="select-none">Remember me</span>
                </label>

                <a
                  href="#"
                  className="text-primaryForm font-medium hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* Primary login button */}
              <Button
                type="submit"
                className="w-full h-12 bg-primaryForm hover:bg-[#004080] text-white font-semibold rounded-lg"
              >
                Login
              </Button>

              {/* Login with Google */}
              <Button
                variant="outline"
                className="w-full h-12 mt-2 rounded-lg border-[#F0EDFF] text-[#1C1C1C] font-semibold flex items-center justify-center gap-3"
              >
                <FcGoogle size={24} />
                <span>Login with Google</span>
              </Button>

              {/* Create account text */}
              <p className="text-center text-sm text-gray-600 mt-2">
                Don’t have an account?{" "}
                <a
                  href="/register"
                  className="text-primaryForm font-medium hover:underline"
                >
                  Create one
                </a>
              </p>

              {/* Footer: Language & Accessibility */}
              <div className="flex justify-between items-center mt-6 text-sm text-primaryForm font-medium">
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
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
