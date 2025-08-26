<template>
  <div ref="emblaRef" class="overflow-hidden" data-slot="carousel-content">
    <div :class="['flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className]">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'
defineProps({ className: String })

const { emblaRef, orientation } = inject('carousel')
</script>