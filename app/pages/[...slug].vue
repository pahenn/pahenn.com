<script lang="ts" setup>
  import { format, parse } from "@formkit/tempo"
</script>

<template>
  <div class="w-full max-w-4xl px-4 mx-auto">
    <ContentDoc>
      <template v-slot="{ doc }">
        <article class="flex flex-col gap-4">
          <h1 class="text-4xl font-bold">{{ doc.title }}</h1>

          <h3>
            {{
              format({
                date: parse(doc.date, "YYYY-MM-DD", "en-US"),
                format: "long",
              })
            }}
          </h3>
          <div class="flex flex-row gap-2 flex-wrap">
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
            class="prose prose-lg max-w-full"
          />
        </article>
      </template>
      <template #not-found>
        <h1 class="text-center">Document not found</h1>
      </template>
    </ContentDoc>
  </div>
</template>
