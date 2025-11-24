/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: 'rgb(var(--background))',
                surface: 'rgb(var(--surface))',
                'surface-hover': 'rgb(var(--surface-hover))',
                main: 'rgb(var(--text-main))',
                muted: 'rgb(var(--text-muted))',
                primary: '#3b82f6', // Neon Blue
                secondary: '#34d399', // Neon Mint
                accent: '#8b5cf6', // Electric Purple
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
