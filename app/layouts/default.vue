<script setup lang="ts">
  const menuItems: { label: string; to: string }[] = []

  const externalLinks = [
    {
      icon: "bxl:github",
      to: "https://github.com/pahenn",
    },
    {
      icon: "bxl:linkedin",
      to: "https://www.linkedin.com/in/hennesseypatrick/",
    },
    {
      icon: "bxl:twitter",
      to: "https://x.com/pahennessey",
    },
  ]
</script>

<template>
  <div class="flex flex-col items-center mx-4">
    <div class="flex flex-col w-full">
      <Header
        :menuItems="menuItems"
        :externalLinks="externalLinks"
      />
    </div>
    <div class="w-full border-b border-gray-200"></div>
    <div class="flex flex-col w-full mt-20 py-4 items-center">
      <slot />
    </div>
  </div>
</template>
