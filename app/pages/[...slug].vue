<script lang="ts" setup>
  import { format, parse } from "@formkit/tempo"
</script>

<template>
  <div class="flex flex-col w-full items-center max-w-4xl">
    <ContentDoc>
      <template v-slot="{ doc }">
        <article class="flex flex-col gap-4 px-8">
          <h1 class="text-4xl font-bold">{{ doc.title }}</h1>

          <h3>
            {{
              format({
                date: parse(doc.date, "YYYY-MM-DD", "en-US"),
                format: "long",
              })
            }}
          </h3>
          <div class="flex flex-row gap-2">
            <h3
              v-for="tag in doc.tags"
              class="outline outline-gray-200 rounded-md px-3 py-1 text-sm bg-slate-200"
            >
              {{ tag }}
            </h3>
          </div>
          <div class="w-full border-b border-gray-200"></div>
          <ContentRenderer
            :value="doc"
            class="prose-lg"
          />
        </article>
      </template>
      <template #not-found>
        <h1>Document not found</h1>
      </template>
    </ContentDoc>
  </div>
</template>
