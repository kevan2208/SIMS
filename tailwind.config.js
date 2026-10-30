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
        // The logo: script red, hair black. The pink carries over from the original site.
        ink: "#1a1416",
        plum: "#6e4651",
        mauve: "#765360",
        petal: "#fbe3e9",
        rose: "#f5ccd7",
        blush: "#fdf3f5",
        seam: "#f1dde2",
        dash: "#e6b9c5",
        sims: {
          red: "#af2830",
          deep: "#8c1f27"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"]
      },
      maxWidth: {
        page: "72rem"
      }
    }
  },
  plugins: []
};
