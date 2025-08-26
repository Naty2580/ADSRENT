<template>
  <div
    data-slot="dialog-overlay"
    class="fixed inset-0 z-40 bg-black/50 transition-opacity"
    @click="$emit('click')"
  />
</template>