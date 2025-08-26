<template>
  <div
    data-slot="menubar-radio-item"
    :class="[
      'relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-none select-none',
      'focus:bg-accent focus:text-accent-foreground',
      className,
    ]"
    @click="$emit('select')"
  >
    <span class="absolute left-2 flex size-3.5 items-center justify-center">
      <div v-if="selected" class="size-2 rounded-full bg-current" />
    </span>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  className: String,
  selected: Boolean,
});
defineEmits(['select']);
</script>