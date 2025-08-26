<script setup>
defineProps({
  title: String,
  value: [String, Number],
  icon: Object,
  color: { type: String, default: 'text-primary' }
})
</script>
<template>
  <div class="bg-card p-6 rounded-lg border shadow-sm">
    <div class="flex items-center justify-between">
      <p class="text-sm font-medium text-muted-foreground">{{ title }}</p>
      <component :is="icon" :class="['h-6 w-6', color]" />
    </div>
    <div class="mt-2">
      <p class="text-3xl font-bold">{{ value }}</p>
    </div>
  </div>
</template>