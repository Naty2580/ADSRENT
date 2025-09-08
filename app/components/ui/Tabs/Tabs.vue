<!-- src/components/ui/tabs/Tabs.vue -->
<script setup>
import { TabsRoot } from 'radix-vue';
import { cn } from '../utils';

const props = defineProps({
  class: String,
});
</script>

<template>
  <TabsRoot :class="cn('flex flex-col gap-2', props.class)">
    <slot />
  </TabsRoot>
</template>