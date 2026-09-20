import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#8B5CF6",
          black: "#0A0A0B",
          darker: "#000000",
          gray: "#1A1A1B",
          border: "#262626",
        },
      },
    },
  },
  plugins: [],
};
export default config;
