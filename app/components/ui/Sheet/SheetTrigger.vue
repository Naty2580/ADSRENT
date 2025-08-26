<script setup lang="ts">
const toggleSheet = inject('toggleSheet') as (val: boolean) => void
</script>

<template>
  <button data-slot="sheet-trigger" @click="toggleSheet(true)">
    <slot />
  </button>
</template>