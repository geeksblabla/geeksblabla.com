/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["selector", "[data-theme='dark']"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        mono: ["CommitMono", "monospace"],
      },

      typography: {
        DEFAULT: {
          css: {
            pre: {
              color: false,
            },
            code: {
              color: false,
            },
          },
        },
      },
      colors: {
        blue: {
          10: "#10294C",
          20: "#12386E",
          30: "#114997",
          40: "#0C57C1",
          50: "#066CF9",
          60: "#2980FA",
          70: "#5198FB",
        },
        "blue-light": {
          10: "#5198FB",
          20: "#6BA8FC",
          30: "#85B8FD",
          40: "#9FC8FD",
          50: "#B9D8FE",
          60: "#D3E8FE",
          70: "#EDF8FF",
        },
        teal: {
          10: "#082620",
          20: "#104439",
          30: "#125343",
          40: "#136953",
          50: "#188365",
          60: "#29AE86",
          70: "#49BE97",
        },
        "teal-light": {
          10: "#649687",
          20: "#6F9F91",
          30: "#83ADA0",
          40: "#AFCAC2",
          50: "#D4E3DE",
          60: "#ECF2F0",
          70: "#FCFDFD",
        },
        violet: {
          10: "#593789",
          20: "#6B3EA9",
          30: "#804CC9",
          40: "#915EDF",
          50: "#AE8DF0",
          60: "#BEAAF3",
          70: "#D2C6F7",
        },
        "neutral-dark": {
          0: "#000000",
          10: "#0E0F10",
          20: "#1A1C1E",
          30: "#292D33",
          40: "#32373E",
          50: "#3B4149",
        },
        "neutral-light": {
          0: "#C3CAD4",
          10: "#D3DAE5",
          20: "#E2E7EE",
          30: "#F2F4F7",
          40: "#FAFBFD",
          50: "#FFFFFF",
        },
      },
      fontSize: {
        title: [
          "clamp(3rem, 2.5rem + 2.5vw, 4.75rem)",
          {
            lineHeight: "105%",
            letterSpacing: "-0.01em",
          },
        ],
        "heading-lg": [
          "clamp(2rem, 1.75rem + 1.25vw, 2.75rem)",
          {
            lineHeight: "125%",
            letterSpacing: "0",
          },
        ],
        "heading-sm": [
          "clamp(1.5rem, 1.375rem + 0.625vw, 2rem)",
          {
            lineHeight: "115%",
            letterSpacing: "0",
          },
        ],
        "label-lg": [
          "clamp(1.25rem, 1.1875rem + 0.3125vw, 1.5rem)",
          {
            lineHeight: "150%",
            letterSpacing: "0",
          },
        ],
        "label-sm": [
          "clamp(1.125rem, 1.0938rem + 0.1563vw, 1.25rem)",
          {
            lineHeight: "135%",
            letterSpacing: "0.01em",
          },
        ],
        "paragraph-lg": [
          "clamp(1rem, 0.9688rem + 0.1563vw, 1.125rem)",
          {
            lineHeight: "165%",
            letterSpacing: "-0.01em",
          },
        ],
        "paragraph-sm": [
          "clamp(0.875rem, 0.8594rem + 0.0781vw, 1rem)",
          {
            lineHeight: "155%",
            letterSpacing: "-0.02em",
          },
        ],
        "paragraph-xs": [
          "clamp(0.75rem, 0.7344rem + 0.0781vw, 0.875rem)",
          {
            lineHeight: "155%",
            letterSpacing: "-0.01em",
          },
        ],
      },
      animation: {
        marquee: "marquee 10s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
