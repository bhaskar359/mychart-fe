import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button"; // from shadcn/ui
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const myChartIcon = new L.Icon({
	iconUrl:
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Blue_circle_icon.svg/120px-Blue_circle_icon.svg.png",
	iconSize: [30, 30],
	iconAnchor: [15, 30],
	popupAnchor: [0, -25],
});

const locations = [
	{ id: 1, name: "Location 1", lat: 17.406, lng: 78.476 },
	{ id: 2, name: "Location 2", lat: 17.409, lng: 78.482 },
	// ...
];

export const UrgentCareView: React.FC = () => {
	const navigate = useNavigate();

	const [selected, setSelected] = useState<number | null>(null);

	return (
		<div className="p-6">
			<div className="flex items-center mb-6">
				<button
					onClick={() => navigate(-1)} // Go back to the previous page (/appointments)
					className="text-[#00529C] hover:text-blue-800 border font-light cursor-pointer rounded-full transition-colors mr-4"
					aria-label="Go back to Schedule an Appointment"
				>
					<ArrowLeft className="w-8 h-8" />
				</button>
				<h1 className="text-2xl font-semibold text-[##003D72]">
					Schedule an Appointment -{" "}
					<span className="font-normal">Find Care Now</span>
				</h1>
			</div>
			<p className="text-md font-light text-black mb-4">
				If this is a medical emergency,{" "}
				<span className="text-red-600 font-light">
					call 911 or go to the nearest emergency room.
				</span>
			</p>

			<div className="bg-[#F9F9F9] rounded-xl border border-gray-200 p-4">
				<div className="flex justify-between items-center mb-3">
					<h2 className="text-lg font-semibold text-[#003D72]">
						Select Near by Location
					</h2>
					<div className="flex gap-3">
						<Button className="bg-[#00529C] text-white">
							Show Locations Near Me
						</Button>
						<Button
							variant="outline"
							className="border border-[#00529C] text-[#00529C]"
						>
							Location Near Pincode
						</Button>
					</div>
				</div>

				<div className="flex flex-col md:flex-row gap-4">
					{/* Left Sidebar */}
					<div className="flex flex-col w-full md:w-1/4 bg-[#E9F2FA] rounded-xl p-3">
						{locations.map((loc) => (
							<button
								key={loc.id}
								onClick={() => setSelected(loc.id)}
								className={`text-left border-b border-[#00529C]/50 py-2 px-3 text-sm hover:bg-[#DDEAF5] transition ${
									selected === loc.id
										? "bg-[#DDEAF5] font-semibold text-[#00529C]"
										: "text-[#003366]"
								}`}
							>
								{loc.name}
							</button>
						))}
					</div>

					{/* Map Section */}
					<div className="w-full md:w-3/4 h-[500px] rounded-xl overflow-hidden">
						<MapContainer
							center={[17.412, 78.478]}
							zoom={13}
							className="h-full w-full"
						>
							<TileLayer
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
							/>
							{locations.map((loc) => (
								<Marker
									key={loc.id}
									position={[loc.lat, loc.lng]}
									icon={myChartIcon}
								>
									<Popup>
										<b>{loc.name}</b>
										<br />
										Click on sidebar for more info.
									</Popup>
								</Marker>
							))}
						</MapContainer>
					</div>
				</div>
			</div>
		</div>
	);
};
