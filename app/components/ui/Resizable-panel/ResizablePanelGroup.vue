<script setup lang="ts">
import { cn } from '@/lib/cn.ts'

const props = defineProps<{
  direction?: 'horizontal' | 'vertical'
  class?: string
}>()

const directionClass = props.direction === 'vertical' ? 'flex-col' : 'flex-row'
</script>

<template>
  <div
    data-slot="resizable-panel-group"
    :class="cn('flex h-full w-full', directionClass, props.class)"
  >
    <slot />
  </div>
</template>