import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#000000",
        border: "#e5e7eb",
        input: "#e5e7eb",
        ring: "#1a1a1a",
        primary: {
          DEFAULT: "#1e90ff",
          foreground: "#f8fafc",
        },
        secondary: {
          DEFAULT: "#10b981",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#ff8c00",
          foreground: "#000000",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#f8fafc",
        },
        muted: {
          DEFAULT: "#f8fafc",
          foreground: "#737373",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#000000",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#000000",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
};

export default config; 