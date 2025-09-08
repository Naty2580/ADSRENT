<!-- File: src/component/ui/Primitive.vue -->
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  asChild: {
    type: Boolean,
    default: false,
  },
  as: {
    type: String,
    default: 'div',
  },
});
</script>

<template>
  <slot v-if="props.asChild" />
  
  <component :is="props.as" v-else>
    <slot />
  </component>
</template>