export default defineNuxtRouteMiddleware(() => {
  // Reset meta tags -- using Nuxt Content creates some scenario where it doesn't reset
  useSeoMeta({
    title: "pahenn.com",
    description: "pahenn.com",
  })
})
