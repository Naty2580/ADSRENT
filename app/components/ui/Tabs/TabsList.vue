<!-- src/components/ui/tabs/TabsList.vue -->
<script setup>
import { TabsList } from 'radix-vue';
import { cn } from '../utils';

const props = defineProps({
  class: String,
});
</script>

<template>
  <TabsList
    :class="cn(
      'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] flex',
      props.class,
    )"
  >
    <slot />
  </TabsList>
</template>