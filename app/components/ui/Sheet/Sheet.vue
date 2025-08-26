<script setup lang="ts">
import { ref, provide } from 'vue'

const isOpen = ref(false)
provide('sheetOpen', isOpen)
provide('toggleSheet', (val: boolean) => (isOpen.value = val))
</script>

<template>
  <div data-slot="sheet">
    <slot />
  </div>
</template>