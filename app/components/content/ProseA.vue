<script setup lang="ts">
  interface Props {
    href: string
    target?: string
  }
  const props = defineProps<Props>()

  const eventName = `inline link`
  const eventData = {
    name: eventName,
    href: props.href,
    type: "click",
  }

  const openInNewTab = computed(() => props.target === "_blank")
</script>

<template>
  <NuxtLink
    :to="href"
    :target="target"
    v-umami="eventData"
    class="text-primary-600 hover:text-primary-800 underline inline-flex items-center"
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
