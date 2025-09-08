<!-- src/components/ui/sheet/SheetTrigger.vue -->
<script setup>
import { DialogTrigger } from 'radix-vue';
import Primitive from '../Primitive.vue';
</script>

<template>
  <DialogTrigger as-child>
    <Primitive as="button">
      <slot />
    </Primitive>
  </DialogTrigger>
</template>