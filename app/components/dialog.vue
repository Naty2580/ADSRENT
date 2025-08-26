<template>
  <div v-if="modelValue" class="dialog-backdrop" @click.self="emit('update:modelValue', false)">
    <div class="dialog-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(['update:modelValue']);
</script>

<style scoped>
.dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.dialog-content {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
}
</style>
