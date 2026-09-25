// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        motteco: {
          red: "#C8202F",   // ロゴのECO赤（微調整可）
          dark: "#1F3A44",  // ロゴの黒（mott部分）
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
