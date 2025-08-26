<script setup lang="ts">
import { TooltipRoot } from '@radix-vue/tooltip'
</script>

<template>
  <TooltipRoot data-slot="tooltip">
    <slot />
  </TooltipRoot>
</template>