<script setup lang="ts">
  interface Props {
    href: string
    newTab?: string
  }
  const props = defineProps<Props>()

  const eventData = {
    name: `inline link|>${props.href}`,
    event_type: "click",
    object_type: "link",
    object_subtype: "inline link",
    meta: props,
  }

  const openInNewTab = computed(() => props.newTab === "true")
</script>

<template>
  <NuxtLink
    :to="href"
    :target="openInNewTab ? '_blank' : undefined"
    v-umami="eventData"
    class="text-primary-600 hover:text-primary-800 underline inline-flex items-center hover:no-underline"
  >
    <slot />
    <Icon
      v-if="openInNewTab"
      name="tabler:external-link"
      class="size-4 mt-1 ml-0.5"
      aria-hidden="true"
    />
  </NuxtLink>
</template>
