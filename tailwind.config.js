module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    container: {
      padding: "2rem",
    },
    screens: {
      sm: "600px",
      md: "900px",
      lg: "1440px",
    },
    colors: {
      white: "#f7fafc",
      primary: {
        dark: "#166534",
        default: "#61973f",
        light: "#76af53",
      },
      yellow: {
        default: "#FBBF24",
        light: "#FDE68A",
        dark: "#F59E0B",
      },
      red: {
        default: "#EF4444",
        light: "#FCA5A5",
        dark: "#DC2626",
      },
      foreground: "#f7fafc",
      gray: "#d1d5db",
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
    borderRadius: {
      none: "0",
      sm: "0.25rem",
      DEFAULT: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      full: "9999px",
      large: "12px",
    },
  },
  variants: {
    extend: {
      textDecoration: ["focus-visible"],
      ringWidth: ["focus-visible"],
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
