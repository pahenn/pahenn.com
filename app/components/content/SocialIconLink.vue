<script lang="ts" setup>
  interface Props {
    to: string
    icon: string
  }
  const props = defineProps<Props>()

  const eventName = `social-icon-link|>${props.to}`
</script>

<template>
  <NuxtLink
    :to="props.to"
    target="_blank"
    v-umami="eventName"
    external
    class="flex items-center justify-center"
  >
    <Icon
      :name="props.icon"
      class="size-6"
    />
  </NuxtLink>
</template>
