<script setup lang="ts">
import { cn } from '@/lib/utils'
import ScrollBar from './ScrollBar.vue'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    data-slot="scroll-area"
    :class="cn('relative overflow-hidden', props.class)"
  >
    <div
      data-slot="scroll-area-viewport"
      class="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1 overflow-auto"
    >
      <slot />
    </div>
    <ScrollBar orientation="vertical" />
    <ScrollBar orientation="horizontal" />
    <!-- Corner element for styling overlap -->
    <div
      data-slot="scroll-area-corner"
      class="absolute bottom-0 right-0 h-2.5 w-2.5 bg-transparent"
    />
  </div>
</template>