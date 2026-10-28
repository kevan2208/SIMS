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
        // Taken from the salon's printed menu (peach paper) and the logo (script red, hair black).
        paper: "#fbf3ee",
        sheet: "#fffaf7",
        blush: "#f3e2d9",
        line: "#e6d3c9",
        ink: "#21161a",
        muted: "#6b585c",
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
