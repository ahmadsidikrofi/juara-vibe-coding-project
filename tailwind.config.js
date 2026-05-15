/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,mdx}",
    "./src/components/**/*.{js,jsx,mdx}",
    "./src/app/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        clay: {
          cream: "oklch(98% 0.01 75)", // Warm cream base
          sage: "oklch(75% 0.08 155)",  // Sage green primary
          ink: "oklch(15% 0.02 240)",    // Dark navy/ink
          pink: "oklch(70% 0.15 10)",   // Vibrant pink
          lavender: "oklch(80% 0.08 280)",
          peach: "oklch(85% 0.1 50)",
          ochre: "oklch(80% 0.12 85)",
        },
        primary: "var(--primary)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        'organic': '1.5rem', // Base organic radius
        '3xl': '1.5rem',     // Explicitly mapping 3xl to the organic feel
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
