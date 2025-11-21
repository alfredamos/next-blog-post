/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}', // For files within the src directory
        './pages/**/*.{js,ts,jsx,tsx,mdx}', // If you still have a pages directory
        './components/**/*.{js,ts,jsx,tsx,mdx}', // If you have a separate components directory outside src
        './app/**/*.{js,ts,jsx,tsx,mdx}', // For Next.js App Router
    ],
  theme: {
    extend: {},
  },
  plugins: [],
}

