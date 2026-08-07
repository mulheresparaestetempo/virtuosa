import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8B3A3A',      // Bordo
        'secondary': '#C4A87A',    // Dourado
        'accent': '#D89BB7',       // Rosé
        'dark': '#1A1A1A',
        'light': '#F5F5F5',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'cormorant': ['Cormorant Garamond', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
