<template>
  <div
    data-slot="context-menu-checkbox-item"
    class="relative flex items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm select-none hover:bg-accent hover:text-accent-foreground"
    @click="$emit('update:checked', !checked)"
  >
    <span class="absolute left-2 flex size-3.5 items-center justify-center pointer-events-none">
      <CheckIcon v-if="checked" class="size-4" />
    </span>
    <slot />
  </div>
</template>

<script setup>
import {CheckIcon} from 'lucide-vue-next'
defineProps({ checked: Boolean })
defineEmits(['update:checked'])
</script>