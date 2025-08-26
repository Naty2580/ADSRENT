<template>
  <form @submit.prevent="submit">
    <slot />
  </form>
</template>

<script setup>
const emit = defineEmits(['submit']);
const submit = (e) => {
  emit('submit', e);
};
</script>
