<script lang="ts" setup>
  defineProps<{
    menuItems: { label: string; to: string }[]
    socialLinks: { icon: string; to: string; label: string }[]
  }>()

  const isMenuOpen = ref(false)

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
  }
</script>

<template>
  <header class="relative w-full">
    <div class="flex justify-between py-2">
      <div class="flex items-center">
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

        <!-- Desktop Menu -->
        <div
          class="hidden md:flex md:space-x-4"
          v-if="menuItems && menuItems.length > 0"
        >
          <NuxtLink
            v-for="item in menuItems"
            :key="item.label"
            :to="item.to"
            class="px-2 min-w-8 hover:bg-gray-200 rounded-md text-center"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>

      <div class="flex items-center">
        <!-- Desktop Social Links -->
        <nav class="hidden md:flex items-center justify-center">
          <ul class="flex space-x-4">
            <li
              v-for="item in socialLinks"
              :key="item.label"
            >
              <SocialIconLink
                :to="item.to"
                :icon="item.icon"
              />
            </li>
          </ul>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden px-2 rounded-md ml-2"
          @click="toggleMenu"
          aria-label="Toggle menu"
        >
          <UIcon
            :name="isMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
            class="size-6"
          />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-show="isMenuOpen"
      class="md:hidden border-t bg-white/30"
    >
      <div class="p-4 space-y-4">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.label"
          :to="item.to"
          class="block px-4 py-2 hover:bg-gray-100 rounded-md text-center"
          @click="isMenuOpen = false"
        >
          {{ item.label }}
        </NuxtLink>

        <div class="border-t pt-4">
          <ul class="flex space-x-4 justify-center">
            <li
              v-for="item in socialLinks"
              :key="item.label"
            >
              <SocialIconLink
                :to="item.to"
                :icon="item.icon"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>
