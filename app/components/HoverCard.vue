<template>
  <div
    data-slot="hover-card"
    @mouseenter="open = true"
    @mouseleave="open = false"
    class="relative inline-block"
  >
    <slot name="trigger" :open="open" />
    <teleport to="body">
      <transition name="fade">
        <div
          v-if="open"
          data-slot="hover-card-content"
          class="z-50 w-64 rounded-md border p-4 shadow-md bg-popover text-popover-foreground absolute"
          :style="positionStyle"
        >
          <slot />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const open = ref(false)

const props = defineProps({
  align: { type: String, default: 'center' },
  sideOffset: { type: Number, default: 4 },
})

const positionStyle = computed(() => {
  // You can enhance this with actual positioning logic
  return {
    top: `${props.sideOffset}px`,
    left: props.align === 'center' ? '50%' : props.align === 'left' ? '0' : 'auto',
    transform: props.align === 'center' ? 'translateX(-50%)' : '',
  }
})
</script>