/** @type {import('tailwindcss').Config} */
import tailwindAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
    './*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "sans-serif"],
        agency: ["'Agency FB'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        "agency-compressed": ["'Agency FB Compressed'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      colors: {
        // Portfolio color palette
        portfolio: {
          bg: {
            primary: '#1f1f1f',
            secondary: '#363635',
            dark: '#0f0f0f',
            paper: '#faf9f6',
          },
          text: {
            primary: '#EBEBEB',
            secondary: '#D7CDCC',
          },
          accent: {
            mauve: '#C99CAD',
            blue: '#8FA9B3',
            terracotta: '#C9A68A',
            primary: '#9C528B',
          },
          border: '#474545',
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(201, 156, 173, 0.3)',
        'glow-lg': '0 0 40px rgba(201, 156, 173, 0.4)',
      },
      keyframes: {
        "fade-in-up": {
          from: { 
            opacity: 0,
            transform: "translateY(1rem)",
          },
          to: { 
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: 0.3 },
          "50%": { opacity: 0.5 },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindAnimate],
}
