<script lang="ts" setup>
  import { format, parse } from "@formkit/tempo"
</script>
<template>
  <main class="flex flex-col w-full max-w-3xl">
    <div class="mb-16 p-2">
      <p>Just some thoughts</p>
    </div>
    <ContentList
      path="/"
      v-slot="{ list }"
    >
      <div class="flex flex-col">
        <NuxtLink
          v-for="entry in list.sort((a, b) => b.date.localeCompare(a.date))"
          :key="`${entry.date}-${entry._path}`"
          class="flex justify-between items-baseline hover:bg-gray-100 p-2 rounded-md"
          :to="`${entry._path}`"
        >
          <div class="flex items-baseline flex-row space-x-4">
            <h2 class="text-lg align-text-bottom">{{ entry.title }}</h2>
            <p class="text-xs font-light align-text-bottom">
              {{ entry.subtitle }}
            </p>
          </div>
          <p class="text-xs font-light align-text-bottom">
            {{
              format({
                date: parse(entry.date, "YYYY-MM-DD", "en-US"),
                format: "long",
              })
            }}
          </p>
        </NuxtLink>
      </div>
    </ContentList>
  </main>
</template>
