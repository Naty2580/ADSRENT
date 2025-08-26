<template>
  <div
    data-slot="dropdown-menu-item"
    class="flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm select-none hover:bg-accent hover:text-accent-foreground"
    :class="[
      variant === 'destructive' ? 'text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20' : '',
      inset ? 'pl-8' : '',
      className,
    ]"
    @click="$emit('select')"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  className: String,
  inset: Boolean,
  variant: { type: String, default: 'default' },
})
defineEmits(['select'])
</script>