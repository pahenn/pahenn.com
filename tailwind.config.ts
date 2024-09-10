import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          // "DM Sans",
          // "JetBrains Mono",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      colors: {
        bone: {
          "50": "#f9f6f3",
          "100": "#f2ebe3",
          "200": "#e3d4c5",
          "300": "#d2b79f",
          "400": "#be9579",
          "500": "#b17d5e",
          "600": "#a46b52",
          "700": "#885646",
          "800": "#6f483d",
          "900": "#5a3c34",
          "950": "#301e1a",
        },
      },
    },
  },
}
