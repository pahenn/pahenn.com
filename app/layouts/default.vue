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
      <header class="flex justify-between items-baseline py-2 w-full">
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
        <nav>
          <ul class="flex space-x-4 items-center justify-center">
            <template
              v-for="item in externalLinks"
              :key="item.label"
            >
              <li>
                <NuxtLink
                  :to="item.to"
                  target="_blank"
                  external
                >
                  <Icon
                    :name="item.icon"
                    class="size-6 m-auto"
                  />
                </NuxtLink>
              </li>
            </template>
          </ul>
        </nav>
      </header>
    </div>
    <div class="w-full border-b border-gray-200"></div>
    <div class="flex flex-col w-full mt-20 py-4 items-center">
      <slot />
    </div>
  </div>
</template>
