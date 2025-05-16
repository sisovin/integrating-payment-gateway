import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,html}",
        "./components/**/*.{js,ts,jsx,tsx,html}",
        "./lib/**/*.{js,ts,jsx,tsx,html}",
        "./pages/**/*.{js,ts,jsx,tsx,html}",
        "./public/index.html"
    ],
    darkMode: "class",
    theme: {
        extend: {},
    },
    plugins: [],
}

export default config