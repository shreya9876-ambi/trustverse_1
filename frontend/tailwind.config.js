/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Ocean-Steel Palette ── */
        trust: {
          50:  '#CCD0CF',
          100: '#9BA8AB',
          200: '#4A5C6A',
          300: '#253745',
          400: '#11212D',
          500: '#06141B',
          600: '#06141B',
          700: '#06141B',
          800: '#06141B',
          900: '#06141B',
        },
        // Named aliases for easy use in JSX
        navy: {
          950: '#06141B',
          900: '#11212D',
          800: '#253745',
          700: '#4A5C6A',
          600: '#4A9C8A',
        },
        steel: {
          300: '#CCD0CF',
          400: '#9BA8AB',
          500: '#4A5C6A',
        },
        teal: {
          400: '#6BBFAD',
          500: '#4A9C8A',
        },
        darkbg: {
          950: '#06141B',
          900: '#11212D',
          850: '#1B2D3A',
          800: '#253745',
        },
      },
      fontFamily: {
        sans:    ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
