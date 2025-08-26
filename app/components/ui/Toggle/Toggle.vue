<script setup lang="ts">
import { ToggleRoot } from '@radix-vue/toggle'
import { cn } from '@/lib/utils'
import { toggleVariants } from './toggleVariants'
import type { VariantProps } from 'class-variance-authority'

const props = defineProps<{
  class?: string
  variant?: VariantProps<typeof toggleVariants>['variant']
  size?: VariantProps<typeof toggleVariants>['size']
}>()
</script>

<template>
  <ToggleRoot
    data-slot="toggle"
    :class="cn(toggleVariants({ variant: props.variant, size: props.size }), props.class)"
  >
    <slot />
  </ToggleRoot>
</template>