<template>
  <Button
    data-slot="carousel-previous"
    :variant="variant"
    :size="size"
    :disabled="!canScrollPrev"
    :class="[
      'absolute size-8 rounded-full',
      orientation === 'horizontal'
        ? 'top-1/2 -left-12 -translate-y-1/2'
        : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
      className,
    ]"
    @click="scrollPrev"
  >
    <ArrowLeft />
    <span class="sr-only">Previous slide</span>
  </Button>
</template>

<script setup>
import { inject } from 'vue'
import {ArrowLeft} from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

defineProps({
  className: String,
  variant: { type: String, default: 'outline' },
  size: { type: String, default: 'icon' },
})

const { scrollPrev, canScrollPrev, orientation } = inject('carousel')
</script>