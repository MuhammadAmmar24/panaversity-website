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
<<<<<<< HEAD
        accent: '#1cd98e', // Bright accent color
=======
        accent: '#00BC72', // Bright accent color
>>>>>>> 8f78f373dbefb3f31a756adb60acf3e05cfd9535
        textPrimary: '#050316', // White for text on dark background
        textSecondary: '#4F4F4F', // Light grey for less contrast areas
      },
    },
  },
  plugins: [],
};
export default config;
