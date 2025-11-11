// tailwind.config.js (Ensuring full string format and unique keys)

/** @type {import('tailwindcss').Config} */
module.exports = {
	// Or module.exports if you renamed to .cjs
	content: [
		// Verify these paths cover ALL your React files:
		"./src/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				// Renamed to darkHeaderBg to avoid any old conflicts
				darkHeaderBg: {
					DEFAULT: "#3F5164",
					font: "#FFFFFF",
				},
				// Renaming all custom entries for safety
				brandPrimaryBg: {
					DEFAULT: "#00529C",
					font: "#FFFFFF",
				},
				brandSecondaryBg: {
					DEFAULT: "#E2F1FE",
					font: "#00529C",
				},
				brandAccent: "#0085F2",
				destructive: "#D80000",

				// Ensure standard theme colors are not interfering
				// If you define 'primary' here, it will conflict with your new 'brandPrimaryBg'
				// Let's rely only on the new descriptive names for customization.
			},
			boxShadow: {
				inset: "inset 0 0 10px rgba(0,0,0,1.3)",
				glow: "0 0 20px rgba(0, 255, 255, 0.6)",
			},
		},
	},
	// ... (plugins)
};
