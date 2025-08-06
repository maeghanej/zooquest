/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'magnetic-navy': '#0D1B2A',
        'compass-gold': '#D4A54F', 
        'warm-sand': '#F1E9DC',
        'stone-gray': '#B2B8C3',
        'signal-black': '#1A1A1A',
        // Semantic color mappings
        primary: '#0D1B2A',        // magnetic-navy
        secondary: '#D4A54F',      // compass-gold
        accent: '#F1E9DC',         // warm-sand
        neutral: '#B2B8C3',        // stone-gray
        dark: '#1A1A1A',          // signal-black
      },
      fontFamily: {
        'heading': ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'body': ['IBM Plex Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'sans': ['IBM Plex Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'], // Override default
      },
    },
  },
  plugins: [],
} 