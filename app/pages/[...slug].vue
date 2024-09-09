<template>
  <div class="flex flex-col w-full items-center max-w-4xl">
    <ContentDoc>
      <template v-slot="{ doc }">
        <article class="flex flex-col gap-4">
          <h1 class="text-4xl font-bold">{{ doc.title }}</h1>
          <ContentRenderer
            :value="doc"
            class="prose"
          />
        </article>
      </template>
      <template #not-found>
        <h1>Document not found</h1>
      </template>
    </ContentDoc>
  </div>
</template>
