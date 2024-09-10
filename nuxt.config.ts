// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ["@nuxt/ui-pro"],
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
    ignoreLocalhost: true,
  },

  compatibilityDate: "2024-09-06",

  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    "components:extend": (components) => {
      const globals = components.filter((c) =>
        ["UButton", "UCallout", "UAlert"].includes(c.pascalName)
      )

      globals.forEach((c) => (c.global = true))
    },
  },

  runtimeConfig: {
    public: {
      mdc: {
        useNuxtImage: true,
      },
    },
  },
})
