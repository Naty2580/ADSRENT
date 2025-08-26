<template>
  <div
    data-slot="drawer-footer"
    class="mt-auto flex flex-col gap-2 p-4"
    :class="className"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({ className: String })
</script>