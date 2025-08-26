<template>
  <button
    :class="[
      'px-4 py-2 rounded border transition',
      active
        ? 'bg-blue-600 text-white border-blue-600'
        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
    ]"
    @click="$emit('toggle')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  active: Boolean,
});
defineEmits(['toggle']);
</script>
