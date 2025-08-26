<template>
  <div
    data-slot="input-otp-slot"
    :data-active="isActive"
    :class="[
      'relative flex h-9 w-9 items-center justify-center border-y border-r text-sm transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md',
      isActive ? 'border-ring ring-ring/50 ring-[3px] z-10' : 'border-input',
      'bg-input-background dark:bg-input/30',
      className,
    ]"
  >
    {{ char }}
    <div
      v-if="hasFakeCaret"
      class="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <div class="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  index: Number,
  char: String,
  isActive: Boolean,
  hasFakeCaret: Boolean,
  className: String,
})
</script>