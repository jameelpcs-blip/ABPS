import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#09203f",
        sea: "#0f4c5c",
        tide: "#136f63",
        sand: "#f3efe0",
        coral: "#ff7f50",
        mist: "#e6f4f1"
      },
      fontFamily: {
        sans: ["Segoe UI", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        panel: "0 18px 40px rgba(9, 32, 63, 0.14)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at 20% 20%, rgba(255,127,80,0.16), transparent 28%), radial-gradient(circle at 80% 0%, rgba(19,111,99,0.14), transparent 24%), linear-gradient(135deg, rgba(9,32,63,1) 0%, rgba(15,76,92,1) 48%, rgba(19,111,99,1) 100%)"
      }
    }
  },
  plugins: []
};

export default config;
