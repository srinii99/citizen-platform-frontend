/** @type {import('tailwindcss').Config} */

export default {

  content: [

    "./index.html",

    "./src/**/*.{js,ts,jsx,tsx}",

  ],

  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#0f172a",
        success: "#16a34a",
        warning: "#f59e0b",
        danger: "#dc2626",
        muted: "#64748b",
        surface: "#ffffff",
        background: "#f8fafc",
      },
      borderRadius: {
        xl2: "1rem",
      },
    },

    plugins: [],
  },