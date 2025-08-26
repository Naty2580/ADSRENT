<template>
  <a
    data-slot="pagination-link"
    :data-active="isActive"
    :aria-current="isActive ? 'page' : undefined"
    :class="[
      'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'border border-ring bg-background text-foreground'
        : 'hover:bg-accent hover:text-accent-foreground',
      className,
    ]"
  >
    <slot />
  </a>
</template>

<script setup>
defineProps({
  className: String,
  isActive: Boolean,
})
</script>