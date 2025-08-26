<template>
  <div
    data-slot="command-group"
    class="text-foreground overflow-hidden p-1"
    :class="className"
  >
    <div class="px-2 py-1.5 text-xs font-medium text-muted-foreground">
      {{ heading }}
    </div>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  heading: String,
  className: String,
})
</script>