<!-- src/components/ui/dropdown-menu/DropdownMenuTrigger.vue -->
<script setup>
import { DropdownMenuTrigger } from 'radix-vue';
import Primitive from '../Primitive.vue';
</script>

<template>
  <DropdownMenuTrigger as-child>
    <Primitive as="button">
      <slot />
    </Primitive>
  </DropdownMenuTrigger>
</template>