import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // Strictly enforced 6px border radius across all UI elements
      borderRadius: {
        none: "0px",
        sm: "6px",
        DEFAULT: "6px",
        md: "6px",
        lg: "6px",
        xl: "6px",
        full: "9999px", // Only for circular avatars / status dots
      },
      // Strictly enforced geometric spacing scale (4px to 64px)
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        6: "24px",
        8: "32px",
        12: "48px",
        16: "64px",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Geist Mono'", "monospace"],
      },
      colors: {
        // Alabaster Porcelain & Clean Modern Foundation
        canvas: {
          light: "#F7F8FA", // Luxurious soft bright background
          dark: "#08090C",  // Deep obsidian dark
        },
        surface: {
          light: "#FFFFFF",
          subtle: "#F8FAFC",
          card: "#FFFFFF",
          dark: "#0D0F14",
          darkMuted: "#13161F",
        },
        border: {
          light: "#E2E8F0",
          lightSubtle: "#F1F5F9",
          dark: "#1E293B",
        },
        // Precision Royal Sapphire Blue Accent
        accent: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
        },
        ink: {
          title: "#0F172A",
          body: "#334155",
          muted: "#64748B",
        },
      },
      boxShadow: {
        none: "none",
        subtle: "0 1px 2px 0 rgba(15, 23, 42, 0.04)",
        porcelain: "0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 1px 2px 0 rgba(15, 23, 42, 0.04), inset 0 1px 0 0 #FFFFFF",
        subpixelDark: "inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.06), 0 2px 4px 0 rgba(0, 0, 0, 0.40)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
