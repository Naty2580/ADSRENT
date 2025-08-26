<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const props = defineProps()

const { theme } = useTheme()
</script>


<template>
  <Sonner
    :theme="theme ?? 'system'"
    class="toaster group"
    :style="{ 
      '--normal-bg': 'var(--popover)',
      '--normal-text': 'var(--popover-foreground)',
      '--normal-border': 'var(--border)',
    }"
    v-bind="props"
  />
</template>