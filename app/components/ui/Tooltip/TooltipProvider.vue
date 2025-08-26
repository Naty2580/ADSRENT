<script setup lang="ts">
import { TooltipProvider as RadixTooltipProvider } from '@radix-vue/tooltip'

const props = defineProps<{
  delayDuration?: number
}>()
</script>

<template>
  <RadixTooltipProvider
    data-slot="tooltip-provider"
    :delay-duration="props.delayDuration ?? 0"
  >
    <slot />
  </RadixTooltipProvider>
</template>