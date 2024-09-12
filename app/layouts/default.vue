<script setup lang="ts">
  const menuItems: { label: string; to: string }[] = []

  const socialLinks = [
    {
      icon: "bxl:github",
      to: "https://github.com/pahenn",
      label: "GitHub",
    },
    {
      icon: "bxl:linkedin",
      to: "https://www.linkedin.com/in/hennesseypatrick/",
      label: "LinkedIn",
    },
    {
      icon: "bxl:twitter",
      to: "https://x.com/pahennessey",
      label: "X",
    },
  ]
</script>

<template>
  <div class="flex flex-col min-h-screen bg-bone-50">
    <div class="flex flex-col w-full px-4">
      <Header
        :menuItems="menuItems"
        :socialLinks="socialLinks"
      />
    </div>
    <div class="w-full border-b border-gray-300"></div>
    <div class="flex-grow flex flex-col items-center overflow-y-auto py-20">
      <slot />
    </div>
    <div class="pb-48"></div>
  </div>
</template>
