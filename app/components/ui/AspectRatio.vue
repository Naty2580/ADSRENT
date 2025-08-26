<template>
  <div
    data-slot="aspect-ratio"
    :style="style"
    :class="['relative w-full overflow-hidden', className]"
  >
    <div class="absolute inset-0">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  ratio: {
    type: Number,
    default: 1, // 1:1 by default
  },
  className: String,
})

const style = {
  paddingTop: `${100 / props.ratio}%`,
}
</script>