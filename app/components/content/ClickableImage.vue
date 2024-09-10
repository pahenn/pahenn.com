<script setup lang="ts">
  import { ref, computed } from "vue"

  interface ImageProps {
    src: string
    alt: string
    caption?: string
  }

  const props = defineProps<ImageProps>()

  const isModalOpen = ref(false)

  function toggleModal() {
    isModalOpen.value = !isModalOpen.value
  }

  const imageStyle = computed(() => ({
    backgroundImage: `url(${props.src})`,
  }))
</script>

<template>
  <div>
    <div
      @click="toggleModal"
      class="cursor-pointer"
    >
      <img
        :src="src"
        :alt="alt"
        class="w-full h-auto"
      />
      <p
        v-if="caption"
        class="text-sm text-gray-600 mt-2"
      >
        {{ caption }}
      </p>
    </div>

    <Teleport to="body">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      >
        <div class="relative w-[90vw] h-[90vh]">
          <button
            @click="toggleModal"
            class="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2 z-10"
          >
            <UIcon name="i-heroicons-x-mark-20-solid" />
          </button>
          <div class="relative w-full h-full">
            <div
              class="w-full h-full bg-center bg-no-repeat bg-contain"
              :style="imageStyle"
            >
              <div
                v-if="caption"
                class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4"
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
