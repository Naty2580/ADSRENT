<script setup lang="ts">
import { ToggleGroupItem as RadixToggleGroupItem } from '@radix-vue/toggle-group'
import { cn } from '@/lib/utils'
import { toggleVariants } from '@/components/ui/toggle'
import { useToggleGroupContext } from './useToggleGroupContext'
import type { VariantProps } from 'class-variance-authority'

const props = defineProps<{
  class?: string
  variant?: VariantProps<typeof toggleVariants>['variant']
  size?: VariantProps<typeof toggleVariants>['size']
}>()

const context = useToggleGroupContext()
</script>

<template>
  <RadixToggleGroupItem
    data-slot="toggle-group-item"
    :data-variant="context.variant || props.variant"
    :data-size="context.size || props.size"
    :class="cn(
      toggleVariants({
        variant: context.variant || props.variant,
        size: context.size || props.size,
      }),
      'min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l',
      props.class
    )"
  >
    <slot />
  </RadixToggleGroupItem>
</template>