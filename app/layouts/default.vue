<script lang="ts" setup></script>

<template>
  <div class="flex flex-col items-center">
    <div class="flex flex-col w-full max-w-5xl">
      <header class="flex justify-between items-baseline py-4 w-full">
        <h1 class="text-3xl font-bold">pahenn.com</h1>
        <nav>
          <ul class="flex">
            <li class="space-x-1">
              <NuxtLink
                class="p-2 hover:bg-gray-200 rounded-md"
                to="/"
              >
                Home
              </NuxtLink>
            </li>
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
