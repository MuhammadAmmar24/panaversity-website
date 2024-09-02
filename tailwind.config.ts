import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#002F5C', // Start of the gradient
        secondary: '#E0E0E0', // Light blue for secondary sections
        accent: '#1cd98e', // Bright accent color
        textPrimary: '#050316', // White for text on dark background
        textSecondary: '#4b5563', // Light grey for less contrast areas
      },
      backgroundImage: {
        'hero': "url('/hero.jpeg')",
      }
    },
  },
  plugins: [],
};
export default config;
