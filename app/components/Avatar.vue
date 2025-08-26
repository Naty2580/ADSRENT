<template>
  <div
    data-slot="avatar"
    :class="['relative flex size-10 shrink-0 overflow-hidden rounded-full', className]"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      data-slot="avatar-image"
      :class="['aspect-square size-full', imageClass]"
      @error="onError"
    />
    <div
      v-else
      data-slot="avatar-fallback"
      :class="['bg-muted flex size-full items-center justify-center rounded-full', fallbackClass]"
    >
      <slot name="fallback">{{ fallbackText }}</slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  src: String,
  alt: {
    type: String,
    default: 'Avatar',
  },
  fallbackText: {
    type: String,
    default: '👤',
  },
  className: String,
  imageClass: String,
  fallbackClass: String,
})

const showFallback = ref(false)

function onError() {
  showFallback.value = true
}
</script>