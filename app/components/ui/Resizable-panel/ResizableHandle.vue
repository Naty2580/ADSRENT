<script setup lang="ts">
import { GripVerticalIcon } from 'lucide-vue-next'
import { cn } from '@/lib/cn.ts'

const props = defineProps<{
  withHandle?: boolean
  direction?: 'horizontal' | 'vertical'
  class?: string
}>()

const isVertical = props.direction === 'vertical'
</script>

<template>
  <div
    data-slot="resizable-handle"
    :class="cn(
      'bg-border relative flex items-center justify-center focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
      isVertical ? 'h-px w-full' : 'w-px h-full',
      props.class
    )"
  >
    <div
      :class="cn(
        'absolute bg-border',
        isVertical
          ? 'inset-x-0 top-1/2 h-1 -translate-y-1/2'
          : 'inset-y-0 left-1/2 w-1 -translate-x-1/2'
      )"
    />
    <div v-if="props.withHandle" class="z-10 flex h-4 w-3 items-center justify-center rounded-xs border bg-border">
      <GripVerticalIcon class="size-2.5" />
    </div>
  </div>
</template>