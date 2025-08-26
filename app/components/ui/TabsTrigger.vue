<script setup>
import { inject } from 'vue';

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
});

const activeTab = inject('activeTab');
const selectTab = inject('selectTab');
</script>

<template>
  <button
    @click="selectTab(value)"
    :class="[
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      activeTab === value ? 'bg-background text-foreground shadow-sm' : ''
    ]"
  >
    <slot />
  </button>
</template>