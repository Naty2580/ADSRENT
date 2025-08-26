<template>
  <AccordionPrimitive.Root v-bind="$attrs" data-slot="accordion">
    <slot />
  </AccordionPrimitive.Root>
</template>

<script>
import * as AccordionPrimitive from "@radix-ui/vue-accordion";

export default {
  name: "Accordion",
};
</script>