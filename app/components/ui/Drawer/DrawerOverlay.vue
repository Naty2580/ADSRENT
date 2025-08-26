<template>
  <div
    data-slot="drawer-overlay"
    class="fixed inset-0 z-40 bg-black/50 transition-opacity"
    @click="$emit('click')"
  />
</template>