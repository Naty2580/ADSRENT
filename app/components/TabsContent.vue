<script setup>
import { inject } from 'vue';

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
});

const activeTab = inject('activeTab');
</script>

<template>
  <div v-if="activeTab === value">
    <slot />
  </div>
</template>