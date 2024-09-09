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
    id: "",
    host: "",
    autoTrack: true,
  },

  compatibilityDate: "2024-09-06",
})
