<template>
  <Button
    data-slot="carousel-next"
    :variant="variant"
    :size="size"
    :disabled="!canScrollNext"
    :class="[
      'absolute size-8 rounded-full',
      orientation === 'horizontal'
        ? 'top-1/2 -right-12 -translate-y-1/2'
        : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
      className,
    ]"
    @click="scrollNext"
  >
    <ArrowRight />
    <span class="sr-only">Next slide</span>
  </Button>
</template>

<script setup>
import { inject } from 'vue'

import {ArrowRight} from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

defineProps({
  className: String,
  variant: { type: String, default: 'outline' },
  size: { type: String, default: 'icon' },
})

const { scrollNext, canScrollNext, orientation } = inject('carousel')
</script>