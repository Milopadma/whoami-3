import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Schibsted Grotesk', 'sans-serif'],
        'mono': ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
