<script setup lang="ts">
  interface ImageProps {
    src: string
    alt: string
    caption?: string
  }
  const props = defineProps<ImageProps>()

  const eventData = {
    name: `lightbox image|>${props.alt}`,
    event_type: "click",
    object_type: "image",
    object_subtype: "lightbox image",
    meta: props,
  }

  const isModalOpen = ref(false)
  const imageRef = ref<HTMLImageElement | null>(null)
  const captionRef = ref<HTMLDivElement | null>(null)

  function toggleModal() {
    isModalOpen.value = !isModalOpen.value
    if (isModalOpen.value) {
      nextTick(() => {
        adjustCaptionWidth()
      })
    }
  }

  function adjustCaptionWidth() {
    if (imageRef.value && captionRef.value) {
      captionRef.value.style.width = `${imageRef.value.offsetWidth}px`
    }
  }

  onMounted(() => {
    window.addEventListener("resize", adjustCaptionWidth)
    window.addEventListener("keyup", (event) => {
      if (event.key === "Escape" && isModalOpen.value) {
        toggleModal()
      }
    })
  })

  onUnmounted(() => {
    window.removeEventListener("resize", adjustCaptionWidth)
    window.removeEventListener("keyup", (event) => {
      if (event.key === "Escape" && isModalOpen.value) {
        toggleModal()
      }
    })
  })
</script>

<template>
  <div>
    <div
      @click="toggleModal"
      v-umami="eventData"
      class="cursor-pointer flex flex-col items-center justify-center"
    >
      <NuxtImg
        provider="cloudflare"
        :src="src"
        :alt="alt"
        class="w-full h-auto"
      />
      <p
        v-if="caption"
        class="text-sm text-center my-auto font-semibold prose text-gray-600"
      >
        {{ caption }}
      </p>
    </div>

    <Teleport to="body">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
        @click="toggleModal"
      >
        <div class="relative w-[90vw] h-[90vh]">
          <div
            class="relative w-full h-full flex flex-col items-center justify-center"
          >
            <div class="flex flex-col items-center">
              <NuxtImg
                ref="imageRef"
                provider="cloudflare"
                :src="src"
                :alt="alt"
                class="max-w-full max-h-[80vh] object-contain"
                @load="adjustCaptionWidth"
              />
              <div
                v-if="caption"
                ref="captionRef"
                class="mt-4 text-white p-4 text-center"
              >
                <p class="text-sm">{{ caption }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
