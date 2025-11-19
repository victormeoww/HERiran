import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDFCF8', // Lighter, cleaner
        charcoal: '#1A1A1A', // Darker for better contrast
        burgundy: '#8B1538', // Deep red (classic)
        saffron: '#E6AF2E', // Muted gold
        teal: '#2E8B8B', // Deep teal
        'light-gray': '#E8E8E8',
        sand: '#F5F5F0', // Slightly darker cream for cards/sections
      },
      fontFamily: {
        serif: ['var(--font-crimson)', 'Georgia', 'serif'],
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'article': '720px', // Slightly wider for readability
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
export default config
