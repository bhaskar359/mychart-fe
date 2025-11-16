import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import customMarker from "../../assets/Group 633881.svg"; // 👈 Your SVG marker
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Custom Icon (no shadow)
const customIcon = new L.Icon({
	iconUrl: customMarker,
	iconSize: [40, 40],
	iconAnchor: [20, 40],
	popupAnchor: [0, -35],
	shadowUrl: undefined,
});

// 🔹 Helper component that moves the map when location changes
const FlyToLocation: React.FC<{ position: [number, number] }> = ({
	position,
}) => {
	const map = useMap();
	useEffect(() => {
		map.flyTo(position, 14, { duration: 1.5 });
	}, [position]);
	return null;
};

// 🔹 Main Component
export const UrgentCareView: React.FC = () => {
	const navigate = useNavigate();

	const defaultCenter: [number, number] = [28.0622, -82.4135];

	const [center, setCenter] = useState<[number, number]>(defaultCenter);
	const [pincode, setPincode] = useState("");
	const [showPincodeInput, setShowPincodeInput] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState<{
		id: number;
		name: string;
		position: [number, number];
	} | null>(null);

	// Hardcoded locations (within Tampa area)
	const locations = [
		{ id: 1, name: "USF Tampa Medical Center", position: [28.0622, -82.4135] },
		{ id: 2, name: "Tampa General Hospital", position: [27.9369, -82.4584] },
		{ id: 3, name: "AdventHealth Carrollwood", position: [28.0489, -82.5057] },
		{ id: 4, name: "BayCare Urgent Care", position: [28.0434, -82.4466] },
		{ id: 5, name: "St. Joseph’s Hospital", position: [27.9741, -82.4812] },
		{
			id: 6,
			name: "Memorial Hospital of Tampa",
			position: [27.9532, -82.4934],
		},
		{ id: 7, name: "Fast Track Urgent Care", position: [28.0544, -82.4363] },
		{
			id: 8,
			name: "Tampa Family Health Center",
			position: [27.9895, -82.4657],
		},
		{ id: 9, name: "Florida Hospital Tampa", position: [28.0493, -82.4256] },
		{
			id: 10,
			name: "HealthPoint Medical Group",
			position: [27.9689, -82.4391],
		},
	];

	// ✅ Corrected ZIP-to-coordinate mapping (strings only)
	const zipcodeToCoords: Record<string, [number, number]> = {
		"33612": [28.0622, -82.4135],
		"33606": [27.9369, -82.4584],
		"33614": [28.0489, -82.5057],
		"33607": [27.9741, -82.4812],
		"33647": [27.9532, -82.4934],
		"33610": [28.0544, -82.4363],
		"33613": [28.0493, -82.4256],
		"33634": [27.9689, -82.4391],
		"33617": [28.035, -82.392],
		"33618": [28.083, -82.493],
	};

	// Ref for marker popups
	const markerRefs = useRef<{ [key: number]: L.Marker }>({});

	// Open popup automatically when location selected
	useEffect(() => {
		if (selectedLocation && markerRefs.current[selectedLocation.id]) {
			markerRefs.current[selectedLocation.id].openPopup();
			setCenter(selectedLocation.position);
		}
	}, [selectedLocation]);

	const handlePincodeToggle = () => {
		setShowPincodeInput((prev) => !prev);
	};

	const handlePincodeSearch = () => {
		const trimmed = pincode.trim();
		if (zipcodeToCoords[trimmed]) {
			setCenter(zipcodeToCoords[trimmed]);
			setSelectedLocation(null);
		} else {
			alert("No locations found for the entered pincode!");
		}
	};

	// 🔹 "Show Locations Near Me" → use browser geolocation
	const handleShowNearMe = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					const { latitude, longitude } = pos.coords;
					setCenter([latitude, longitude]);
					setSelectedLocation(null);
				},
				() => {
					alert("Unable to fetch your location. Please allow location access.");
				}
			);
		} else {
			alert("Geolocation is not supported by your browser.");
		}
	};

	return (
		<div className="mx-auto p-8">
			<div>
				<div className="flex items-center">
					<button
						onClick={() => navigate(-1)}
						className="text-[#00529C] hover:text-blue-800 border font-light cursor-pointer rounded-full transition-colors mr-4"
						aria-label="Go back to Schedule an Appointment"
					>
						<ArrowLeft className="w-8 h-8" />
					</button>
					<h1 className="text-2xl font-semibold text-[#003D72]">
						Schedule an Appointment —{" "}
						<span className="font-normal">Find Care Now</span>
					</h1>
				</div>
				<p className="text-sm mt-4 text-gray-600 mb-4">
					If this is a medical emergency,{" "}
					<span className="text-red-600 font-medium">
						call 911 or go to the nearest emergency room.
					</span>
				</p>
			</div>

			<div className="p-6 bg-[#F8F8F8] rounded-2xl">
				<div className="p-4 flex justify-between items-center space-y-4">
					<h2 className="text-2xl font-semibold">Select Near by Location</h2>
					<div className="flex flex-wrap justify-end items-center gap-3">
						{showPincodeInput && (
							<div className="flex items-center gap-2">
								<label
									htmlFor="pincode"
									className="text-sm font-medium text-gray-700"
								>
									Enter Zip code:
								</label>
								<input
									id="pincode"
									type="text"
									value={pincode}
									onChange={(e) => setPincode(e.target.value)}
									placeholder="e.g., 33612"
									className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#00529C] focus:outline-none"
								/>
								<Button
									size="sm"
									onClick={handlePincodeSearch}
									className="bg-[#00529C] text-white text-sm hover:bg-[#004080]"
								>
									Go
								</Button>
							</div>
						)}

						<Button
							onClick={handleShowNearMe}
							className="bg-[#00529C] text-white text-sm font-medium hover:bg-[#004080]"
						>
							Show Locations Near Me
						</Button>

						<Button
							onClick={handlePincodeToggle}
							className="bg-[#003D72] text-white text-sm font-medium hover:bg-[#002A5E]"
						>
							Location Near Zipcode
						</Button>
					</div>
				</div>

				<div className="flex flex-col md:flex-row gap-4">
					{/* Sidebar */}
					<div className="w-full md:w-1/4 bg-[#E8F1FB] rounded-2xl p-4 space-y-2">
						{locations.map((loc) => (
							<button
								key={loc.id}
								onClick={() => setSelectedLocation(loc)}
								className={`w-full border-b border-[#00529C]/40 text-[#003D72] text-center py-2 text-sm hover:bg-[#D9EAFD] transition rounded-md ${
									selectedLocation?.id === loc.id
										? "bg-[#CFE4FF] font-semibold"
										: ""
								}`}
							>
								{loc.name}
							</button>
						))}
					</div>

					{/* Map Container */}
					<div className="sticky w-full md:w-3/4 h-[600px] bg-white rounded-2xl overflow-hidden border border-gray-300">
						<MapContainer
							center={center}
							zoom={13}
							scrollWheelZoom={false}
							className="h-full w-full"
						>
							<TileLayer
								attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>

							<FlyToLocation position={center} />

							{locations.map((loc) => (
								<Marker
									key={loc.id}
									position={loc.position}
									icon={customIcon}
									ref={(ref) => {
										if (ref) markerRefs.current[loc.id] = ref;
									}}
								>
									<Popup>{loc.name}</Popup>
								</Marker>
							))}
						</MapContainer>
					</div>
				</div>
			</div>
		</div>
	);
};
