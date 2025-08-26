<template>
  <div
    data-slot="progress"
    :class="[
      'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
      class,
    ]"
  >
    <div
      data-slot="progress-indicator"
      class="bg-primary h-full w-full flex-1 transition-all"
      :style="{ transform: `translateX(-${100 - (value || 0)}%)` }"
    />
  </div>
</template>

<script setup>
defineProps({
  value: {
    type: Number,
    default: 0,
  },
  class: {
    type: String,
    default: '',
  },
})
</script>