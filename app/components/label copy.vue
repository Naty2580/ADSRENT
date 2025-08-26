<template>
  <label :for="forId" class="block text-sm font-medium text-gray-700">
    <slot />
  </label>
</template>

<script>
import { defineProps } from 'vue'

export default {
  name: 'Label',
  props: {
    forId: String
  }
}
</script>
