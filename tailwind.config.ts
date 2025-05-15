import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}", // include your component and page files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
