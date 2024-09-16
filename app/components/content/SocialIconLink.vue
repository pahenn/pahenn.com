<script lang="ts" setup>
  interface Props {
    to: string
    icon: string
  }
  const props = defineProps<Props>()

  const eventData = {
    name: `social link|>${props.to}`,
    event_type: "click",
    object_type: "link",
    object_subtype: "social link",
    meta: props,
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
