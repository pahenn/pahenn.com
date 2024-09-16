<script lang="ts" setup>
  defineProps<{
    menuItems: { label: string; to: string }[]
    socialLinks: { icon: string; to: string; label: string }[]
  }>()
</script>

<template>
  <header class="flex justify-between py-2 w-full">
    <div class="flex md:space-x-4 items-center justify-center">
      <NuxtLink
        class="px-2 min-w-8 rounded-md text-center"
        to="/"
      >
        <NuxtImg
          src="/favicon.svg"
          alt="Home"
          class="size-6 m-auto"
        />
      </NuxtLink>
      <div
        class="flex space-x-4"
        v-if="menuItems && menuItems.length > 0"
      >
        <template
          v-for="item in menuItems"
          :key="item.label"
        >
          <NuxtLink
            :to="item.to"
            class="px-2 min-w-8 hover:bg-gray-200 rounded-md text-center"
          >
            {{ item.label }}
          </NuxtLink>
        </template>
      </div>
    </div>
    <nav class="flex items-center justify-center">
      <ul class="flex space-x-4">
        <template
          v-for="item in socialLinks"
          :key="item.label"
        >
          <li>
            <SocialIconLink
              :to="item.to"
              :icon="item.icon"
            />
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>
