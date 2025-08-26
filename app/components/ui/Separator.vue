<script setup lang="ts">
import { cn } from '@/lib/cn.ts'

const props = defineProps<{
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  class?: string
}>()

const orientation = props.orientation || 'horizontal'
</script>

<template>
  <div
    role="separator"
    :aria-hidden="props.decorative"
    data-slot="separator-root"
    :data-orientation="orientation"
    :class="cn(
      'bg-border shrink-0',
      orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
      props.class
    )"
  />
</template>