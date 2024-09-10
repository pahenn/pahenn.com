<script lang="ts" setup>
  const route = useRoute()

  useHead(() => ({
    title: route.path === "/" ? "pahenn.com" : undefined,
    description: "pahenn.com",
    link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
  }))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
