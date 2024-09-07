import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#668863', // ミディアムグリーン
        secondary: '#b6c0a8', // ペールグリーン
        accent: '#b38a59', // ウォームベージュ
        neutral: '#edefea', // ライトグレー
        background: '#ffffff', // ホワイトバックグラウンド
      },
      fontFamily: {
        stylish: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
