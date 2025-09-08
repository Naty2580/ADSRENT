<script setup>
import { TabsContent } from 'radix-vue';
import { cn } from '../utils';

// --- FIX: Add the 'value' prop ---
// This is essential for the component to know when to be visible.
const props = defineProps({
  class: String,
  value: String, // The value of the tab it belongs to
});
</script>

<template>
  <TabsContent 
    :value="props.value"
    :class="cn('flex-1 outline-none', props.class)"
  >
    <slot />
  </TabsContent>
</template>