import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@worldcoin/mini-apps-ui-kit-react/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#121B15',
        forest: '#2F4731',
        wine: '#3C141A',
        rosewood: '#9B3E4A',
        amber: '#BD6916',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem', // 16dp
        '2xl': '1.5rem', // for bottom-sheet
      },
      boxShadow: {
        md: '0 4px 12px 0 rgba(18,27,21,0.08)', // soft shadow
      },
      letterSpacing: {
        airy: '0.02em', // +2%
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
