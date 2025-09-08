<template>
  <div
    data-slot="context-menu-radio-item"
    class="relative flex items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm select-none hover:bg-accent hover:text-accent-foreground"
    @click="$emit('select')"
  >
    <span class="absolute left-2 flex size-3.5 items-center justify-center pointer-events-none">
      <CircleIcon v-if="selected" class="size-2 fill-current" />
    </span>
    <slot />
  </div>
</template>

<script setup>
import {CircleIcon} from 'lucide-vue-next'
defineProps({ selected: Boolean })
defineEmits(['select'])
</script>