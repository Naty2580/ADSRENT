<template>
  <div
    data-slot="navigation-menu-indicator"
    :class="[
      'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
      'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
      className,
    ]"
  >
    <div class="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
  </div>
</template>

<script setup>
defineProps({ className: String })
</script>