<template>
  <div
    data-slot="menubar-checkbox-item"
    :class="[
      'relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-none select-none',
      'focus:bg-accent focus:text-accent-foreground',
      className,
    ]"
    @click="$emit('toggle')"
  >
    <span class="absolute left-2 flex size-3.5 items-center justify-center">
      <svg v-if="checked" class="size-4" viewBox="0 0 24 24" fill="none">
        <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" />
      </svg>
    </span>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  className: String,
  checked: Boolean,
});
defineEmits(['toggle']);
</script>