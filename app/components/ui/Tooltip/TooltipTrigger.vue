<script setup lang="ts">
import { TooltipTrigger as RadixTooltipTrigger } from '@radix-vue/tooltip'
</script>

<template>
  <RadixTooltipTrigger data-slot="tooltip-trigger">
    <slot />
  </RadixTooltipTrigger>
</template>