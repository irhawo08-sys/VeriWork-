import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#1B4332",
          light: "#2D6A4F",
          dark: "#12291F",
        },
        beige: {
          DEFAULT: "#F5F1E8",
          dark: "#EAE2D0",
        },
        gold: {
          DEFAULT: "#D4A017",
          light: "#E8C158",
          dark: "#A87A0E",
        },
        ink: "#20241F",
        mist: "#6B7A70",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        card: "0 2px 10px rgba(27, 67, 50, 0.06)",
        cardHover: "0 12px 30px rgba(27, 67, 50, 0.12)",
      },
      backgroundImage: {
        "compass-ring":
          "conic-gradient(from 0deg, #D4A017 0deg, #E8C158 60deg, #1B4332 60deg, #1B4332 360deg)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        ringDraw: {
          "0%": { strokeDashoffset: "283" },
          "100%": { strokeDashoffset: "var(--ring-offset)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
        ringDraw: "ringDraw 1.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
