<script setup lang="ts">
import { defineProps } from 'vue';

interface PrimitiveProps {
  /**
   * If true, the component will merge its props and behavior onto its immediate child.
   */
  asChild?: boolean;

  /**
   * The HTML tag to use for the component.
   * @default 'div'
   */
  as?: string;
}

const props = withDefaults(defineProps<PrimitiveProps>(), {
  as: 'div',
});
</script>

<template>
  <!-- 
    If asChild is true, we render only the slot, effectively passing our props down.
    Vue's attribute inheritance handles the merging.
  -->
  <slot v-if="asChild" />
  
  <!-- 
    Otherwise, we use Vue's dynamic <component> tag to render the specified HTML element.
  -->
  <component :is="as" v-else>
    <slot />
  </component>
</template>