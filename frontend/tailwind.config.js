/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#002045",
        "on-secondary-fixed": "#241a00",
        "on-tertiary-fixed": "#191c1e",
        "surface-dim": "#ccdbf4",
        "on-surface": "#0d1c2f",
        "primary-container": "#1a365d",
        "on-secondary": "#ffffff",
        "on-tertiary": "#ffffff",
        "surface-container-high": "#dde9ff",
        "surface-tint": "#455f88",
        background: "#f8f9ff",
        "surface-container-lowest": "#ffffff",
        "tertiary-fixed": "#e0e3e5",
        "on-primary-container": "#86a0cd",
        "on-surface-variant": "#43474e",
        "inverse-surface": "#233144",
        "on-secondary-container": "#745c00",
        surface: "#f8f9ff",
        "surface-container": "#e6eeff",
        "error-container": "#ffdad6",
        "inverse-on-surface": "#ebf1ff",
        "primary-fixed-dim": "#adc7f7",
        error: "#ba1a1a",
        "outline-variant": "#c4c6cf",
        tertiary: "#1d2123",
        "secondary-fixed": "#ffe088",
        "secondary-fixed-dim": "#e9c349",
        "on-background": "#0d1c2f",
        "on-error-container": "#93000a",
        "surface-bright": "#f8f9ff",
        "on-tertiary-container": "#9c9fa1",
        outline: "#74777f",
        "on-secondary-fixed-variant": "#574500",
        "surface-container-highest": "#d5e3fd",
        "secondary-container": "#fed65b",
        "on-tertiary-fixed-variant": "#444749",
        "tertiary-container": "#333638",
        "on-primary-fixed-variant": "#2d476f",
        "primary-fixed": "#d6e3ff",
        "on-error": "#ffffff",
        "tertiary-fixed-dim": "#c4c7c9",
        "on-primary": "#ffffff",
        "surface-container-low": "#eff4ff",
        secondary: "#735c00",
        "inverse-primary": "#adc7f7",
        "on-primary-fixed": "#001b3c",
        "surface-variant": "#d5e3fd"
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px"
      },
      spacing: {
        "container-max": "1280px",
        "section-padding": "80px",
        "margin-mobile": "16px",
        gutter: "24px",
        base: "8px"
      },
      fontFamily: {
        "body-lg": ["Public Sans"],
        h1: ["Newsreader"],
        button: ["Public Sans"],
        "body-sm": ["Public Sans"],
        h2: ["Newsreader"],
        "label-caps": ["Public Sans"],
        h3: ["Newsreader"],
        "body-md": ["Public Sans"]
      },
      fontSize: {
        "body-lg": ["18px", {lineHeight: "1.6", fontWeight: "400"}],
        h1: ["48px", {lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600"}],
        button: ["14px", {lineHeight: "1", fontWeight: "600"}],
        "body-sm": ["14px", {lineHeight: "1.5", fontWeight: "400"}],
        h2: ["36px", {lineHeight: "1.25", fontWeight: "600"}],
        "label-caps": ["12px", {lineHeight: "1", letterSpacing: "0.05em", fontWeight: "700"}],
        h3: ["28px", {lineHeight: "1.3", fontWeight: "500"}],
        "body-md": ["16px", {lineHeight: "1.5", fontWeight: "400"}]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
