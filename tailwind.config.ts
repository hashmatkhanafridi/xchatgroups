import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b", // zinc-950
        foreground: "#fafafa", // zinc-50
        primary: {
          DEFAULT: "#06b6d4", // cyan-500
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#27272a", // zinc-800
          foreground: "#fafafa",
        },
        muted: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          foreground: "#a1a1aa", // zinc-400
        },
        accent: {
          DEFAULT: "rgba(255, 255, 255, 0.1)",
          foreground: "#fafafa",
        },
        card: {
          DEFAULT: "rgba(255, 255, 255, 0.03)",
          foreground: "#fafafa",
        },
        border: "rgba(255, 255, 255, 0.1)",
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
