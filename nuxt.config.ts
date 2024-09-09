// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxthub/core",
    "@nuxt/image",
    "nuxt-umami",
  ],

  future: {
    compatibilityVersion: 4,
  },

  umami: {
    id: "0e40aaed-b9c3-49c0-90ad-31aa1700d062",
    host: "https://pahenn.com",
    autoTrack: true,
  },

  compatibilityDate: "2024-09-06",
})
