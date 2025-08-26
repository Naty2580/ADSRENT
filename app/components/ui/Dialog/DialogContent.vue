<template>
  <div
    data-slot="dialog-content"
    class="fixed top-1/2 left-1/2 z-50 w-full max-w-[calc(100%-2rem)] sm:max-w-lg translate-x-[-50%] translate-y-[-50%] bg-background border rounded-lg p-6 shadow-lg grid gap-4"
  >
    <slot />
    <button
      data-slot="dialog-close"
      class="absolute top-4 right-4 opacity-70 hover:opacity-100 transition-opacity"
      @click="$emit('close')"
    >
      <XIcon class="size-4" />
      <span class="sr-only">Close</span>
    </button>
  </div>
</template>

<script setup>
import {XIcon} from 'lucide-vue-next'
</script>