<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{
  orientation?: 'vertical' | 'horizontal'
  class?: string
}>()

const isVertical = props.orientation === 'vertical'
</script>

<template>
  <div
    data-slot="scroll-area-scrollbar"
    :class="cn(
      'absolute flex touch-none p-px transition-colors select-none',
      isVertical
        ? 'right-0 top-0 h-full w-2.5 border-l border-l-transparent'
        : 'bottom-0 left-0 w-full h-2.5 flex-col border-t border-t-transparent',
      props.class
    )"
  >
    <div
      data-slot="scroll-area-thumb"
      class="bg-border relative flex-1 rounded-full"
    />
  </div>
</template>