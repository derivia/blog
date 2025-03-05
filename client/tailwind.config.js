/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				leafgreen: "var(--accent-1)",
				firered: "var(--accent-2)",
			},
		},
	},
	plugins: [],
};
