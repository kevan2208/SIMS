/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#151213",
          red: "#a82f32",
          cream: "#fcf8f3",
          stone: "#ece5de",
          mist: "#6f6664",
          petal: "#f6ece8",
          blush: "#eddcd7",
          shell: "#fffaf6",
          rose: "#f3e4df"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "Cambria", "Times New Roman", "serif"],
        body: [
          "var(--font-body)",
          "Avenir Next",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ]
      },
      boxShadow: {
        soft: "0 18px 46px rgba(123, 94, 90, 0.09), 0 6px 18px rgba(123, 94, 90, 0.05)",
        lift: "0 26px 60px rgba(123, 94, 90, 0.12), 0 8px 24px rgba(123, 94, 90, 0.08)"
      },
      keyframes: {
        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translate3d(0, 18px, 0)"
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0)"
          }
        },
        drift: {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0)"
          },
          "50%": {
            transform: "translate3d(0, -12px, 0)"
          }
        }
      },
      animation: {
        fadeUp: "fadeUp 720ms ease-out both",
        drift: "drift 12s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
