/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#0F172A',
        // Growth-focused color palette
        'brand-blue': '#1E40AF',      // Deep professional blue
        'brand-teal': '#0D9488',      // Growth teal
        'brand-emerald': '#059669',   // Success green
        'brand-cyan': '#0891B2',      // Fresh cyan
        'brand-purple': '#7C3AED',    // Innovation purple
        'brand-orange': '#EA580C',    // Energy orange
        'accent-blue': '#3B82F6',     // Bright blue
        'accent-green': '#10B981',    // Bright green
        // Legacy support (will be replaced)
        'primary-dark': '#1E40AF',
        'primary-green': '#059669',
        'primary-blue': '#0891B2',
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['Roboto', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
