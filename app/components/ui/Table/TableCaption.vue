<script setup lang="ts">
import { cn } from '@/lib/utils'
defineProps<{ class?: string }>()
</script>

<template>
  <caption :class="cn('text-muted-foreground mt-4 text-sm', $props.class)" data-slot="table-caption">
    <slot />
  </caption>
</template>