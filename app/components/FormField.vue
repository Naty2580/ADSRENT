<script setup>
defineProps({
  label: { type: String, required: true },
  error: { type: String, required: false },
});
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-foreground">
      {{ label }}
    </label>
    <div class="mt-1">
      <slot />
    </div>
    <p v-if="error" class="mt-2 text-sm text-destructive" role="alert">
      {{ error }}
    </p>
  </div>
</template>