/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    { pattern: /bg-grayCustom-(100|200|300)/ },
    { pattern: /text-grayCustom-(100|200|300)/ },
    { pattern: /bg-blueCustom-(100|500)/ },
    { pattern: /text-blueCustom-(100|500)/ },
  ],
  theme: {
    extend: {
      fontFamily: {
        reboto: ["Roboto", "sans-serif"],
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      safelist: [
        { pattern: /bg-grayCustom-(100|200|300)/ },
        { pattern: /text-grayCustom-(100|200|300)/ },
        { pattern: /bg-blueCustom-(100|500)/ },
        { pattern: /text-blueCustom-(100|500)/ },
      ],
      colors: {
        grayCustom: {
          DEFAULT: "#DBDBDB",
          100: "#F8F8F8",
          200: "#DBDBDB",
          300: "#989898",
        },
        blueCustom: {
          DEFAULT: "#0056A6",
          100: "#0587FF",
          500: "#0056A6",
        },
      },
      animation: {
        "slide-up": "slideUp 0.4s ease-in-out forwards",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
