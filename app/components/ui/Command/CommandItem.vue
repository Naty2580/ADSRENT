<template>
  <div
    data-slot="command-item"
    class="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none"
    :class="[
      selected ? 'bg-accent text-accent-foreground' : '',
      disabled ? 'pointer-events-none opacity-50' : '',
      className,
    ]"
    @click="!disabled && $emit('select')"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  selected: Boolean,
  disabled: Boolean,
  className: String,
})
defineEmits(['select'])
</script>