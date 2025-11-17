// src/components/layout/Header.tsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import logo from "../../assets/my-chart-logo.svg";
import mychartEpicLogo from "../../assets/mychart-epic-logo.svg";
import { useAuthStore } from "../../store/authStore"; // ⬅️ IMPORT STORE

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header: React.FC = () => {
	const navigate = useNavigate();
	// ⬇️ Use state and actions from the global store
	const { user, isAuthenticated, logout } = useAuthStore();

	const handleLogout = () => {
		logout(); // Implement logout action from useAuthStore()
	};

	// ⬇️ Derive data safely from the store
	const userName = user ? `${user?.firstName} ${user?.lastName}` : "Guest";
	const userEmail = user?.email || "N/A";

	const userInitials = user
		? `${user?.firstName[0].toUpperCase()}${user?.lastName[0].toUpperCase()}`
		: "G";

	// NOTE: If your backend response only provides 'userName' as a single string,
	// you'll need to adjust the initials logic accordingly.

	return (
		<header className="sticky top-0 z-40 w-full border-b shadow-lg bg-custom-primary text-white">
			<div className="relative flex h-16 items-center justify-between px-4 lg:px-10 mx-auto">
				{/* Logo / Brand - Centered on desktop */}
				<div></div>
				<div className="absolute left-1/2 transform -translate-x-1/2">
					<Link to="/dashboard">
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
						{/* Display first name */}
						<span className="hidden sm:inline">
							Hi,{" "}
							{user?.firstName
								.split(" ")[0]
								.split("")
								.map((char, i) => {
									if (i == 0) return char.toUpperCase();
									return char;
								})}
						</span>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="relative h-9 w-9 rounded-full text-white hover:bg-gray-700/50"
								>
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
											{userEmail}
										</p>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									className="cursor-pointer"
									onClick={() => navigate("/profile")}
								>
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
