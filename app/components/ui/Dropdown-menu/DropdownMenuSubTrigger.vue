<template>
  <div
    data-slot="dropdown-menu-sub-trigger"
    class="flex items-center rounded-sm px-2 py-1.5 text-sm select-none hover:bg-accent hover:text-accent-foreground"
    :class="inset ? 'pl-8' : ''"
    @click="$emit('toggle')"
  >
    <slot />
    <ChevronRightIcon class="ml-auto size-4" />
  </div>
</template>

<script setup>
import {ChevronRightIcon} from 'lucide-vue-next'
defineProps({ inset: Boolean })
defineEmits(['toggle'])
</script>