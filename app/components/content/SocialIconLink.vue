<script lang="ts" setup>
  interface Props {
    to: string
    icon: string
  }
  const props = defineProps<Props>()

  const eventName = `social link`
  const eventData = {
    name: eventName,
    href: props.to,
    type: "click",
  }
</script>

<template>
  <NuxtLink
    :to="props.to"
    target="_blank"
    v-umami="eventData"
    external
    class="flex items-center justify-center"
  >
    <Icon
      :name="props.icon"
      class="size-6"
    />
  </NuxtLink>
</template>
