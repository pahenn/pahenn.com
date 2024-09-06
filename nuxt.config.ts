// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/content", "@nuxt/fonts"],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-09-06",
})
