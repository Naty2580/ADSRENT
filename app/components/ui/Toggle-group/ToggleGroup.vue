<script setup lang="ts">
import { ToggleGroupRoot } from '@radix-vue/toggle-group'
import { cn } from '@/lib/utils'
import { provideToggleGroupContext } from './useToggleGroupContext'
import type { VariantProps } from 'class-variance-authority'
import { toggleVariants } from '@/components/ui/toggle'

const props = defineProps<{
  class?: string
  variant?: VariantProps<typeof toggleVariants>['variant']
  size?: VariantProps<typeof toggleVariants>['size']
}>()

provideToggleGroupContext({
  variant: props.variant ?? 'default',
  size: props.size ?? 'default',
})
</script>

<template>
  <ToggleGroupRoot
    data-slot="toggle-group"
    :data-variant="props.variant"
    :data-size="props.size"
    :class="cn(
      'group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs',
      props.class
    )"
  >
    <slot />
  </ToggleGroupRoot>
</template>