/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        tng: {
          primary: "#123B70",
          "primary-dark": "#0C274B",
          "primary-light": "#1A4E94",
          secondary: "#2F80ED",
          "secondary-hover": "#256FD0",
          accent: "#37C99A",
          "accent-dark": "#2BA880",
          "accent-light": "#EAF9F4",
          bg: "#F5F8FC",
          surface: "#FFFFFF",
          text: "#10233F",
          muted: "#64748B",
          border: "#E2E8F0",
          "border-subtle": "#EDF2F7",
        },
      },
      borderRadius: {
        "card": "1.5rem", // 24px
        "card-lg": "1.75rem", // 28px
      },
      boxShadow: {
        "soft-sm": "0 4px 14px rgba(18, 59, 112, 0.04)",
        "soft": "0 12px 30px rgba(18, 59, 112, 0.08)",
        "soft-lg": "0 20px 40px rgba(18, 59, 112, 0.12)",
        "soft-card": "0 10px 25px -3px rgba(18, 59, 112, 0.07), 0 4px 6px -2px rgba(18, 59, 112, 0.03)",
        "soft-inset": "inset 0 2px 4px 0 rgba(18, 59, 112, 0.04)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        heading: ["var(--font-heading)", "Plus Jakarta Sans", "sans-serif"],
        handwriting: ["Caveat", "Playwrite", "cursive"],
      },
    },
  },
  plugins: [],
};
