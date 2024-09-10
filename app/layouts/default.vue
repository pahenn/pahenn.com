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
  <div
    class="flex flex-col h-screen pb-48 items-center bg-bone-50 overflow-y-scroll"
  >
    <div class="flex flex-col w-full px-4">
      <Header
        :menuItems="menuItems"
        :externalLinks="externalLinks"
      />
    </div>
    <div class="w-full border-b border-gray-300"></div>
    <div class="flex flex-col w-full mt-20 py-4 items-center">
      <slot />
    </div>
  </div>
</template>
