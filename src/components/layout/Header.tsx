// src/components/layout/Header.tsx

import React from "react";
import { Link } from "react-router-dom";
import { LogOut, User, Menu } from "lucide-react"; // Added Menu icon for mobile/sidebar toggle
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import logo from "../../assets/my-chart-logo.svg"; // Assuming this path is correct
import mychartEpicLogo from "../../assets/mychart-epic-logo.svg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// TODO: Replace hardcoded values with state from useAuthStore
const isAuthenticated = true;
const userName = "Sai Reddy";
const userInitials = userName
  .split(" ")
  .map((n) => n[0])
  .join("");

const handleLogout = () => {
  // TODO: Implement logout action from useAuthStore()
  console.log("Logging out...");
};

export const Header: React.FC = () => {
  return (
    <header
      // FINAL FIX: Use the direct CSS variable for high precedence background color (#3F5164).
      // Text color is explicitly white to contrast with the dark background.
      className="sticky top-0 z-40 w-full border-b shadow-lg bg-custom-primary text-white"
    >
      <div className="relative flex h-16 items-center justify-between px-4 lg:px-10 mx-auto">
        {/* Mobile Menu Icon (Placeholder for sidebar toggle) */}
        <Button variant="ghost" className="text-white">
          <Menu className="h-6 w-6" />
        </Button>

        {/* Logo / Brand - Centered on desktop */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/dashboard">
            {/* Filter brightness-[3] ensures the logo is white/light on the dark background */}
            <img
              src={logo}
              alt="MyChart Logo"
              className="p-5 w-[clamp(200px,15vw,500px)] filter brightness-[3]"
            />
          </Link>
        </div>

        {/* User Controls - Aligned to the right */}
        {isAuthenticated && (
          <div className="flex items-center space-x-4">
            {/* Text is white due to parent class (text-white) */}
            <span className="hidden sm:inline">
              Hi, {userName.split(" ")[0]}
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* Button uses text-white/text-headerBackground-font for the icon/text color */}
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full text-white hover:bg-gray-700/50"
                >
                  {/* Avatar uses a white background and the brand primary color for the initials text */}
                  <Avatar className="h-9 w-9 bg-white text-custom-secondary font-semibold">
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {/* TODO: Add user email */}
                      sai.reddy@portal.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <img
              src={mychartEpicLogo}
              alt="MyChart Logo"
              className="p-3 w-[clamp(90px,8vw,140px)] h-auto object-contain hidden sm:inline"
            />
          </div>
        )}
      </div>
    </header>
  );
};
