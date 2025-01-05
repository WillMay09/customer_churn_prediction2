import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customDarkBlue: "#16113A",
        customHighlightBlue:"#36385F",
        customBorder: "#6E5B57"

      },
    },
  },
  plugins: [],
} satisfies Config;
