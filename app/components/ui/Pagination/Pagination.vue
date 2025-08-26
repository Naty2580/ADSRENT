<template>
  <nav
    role="navigation"
    aria-label="pagination"
    data-slot="pagination"
    :class="['mx-auto flex w-full justify-center', className]"
  >
    <slot />
  </nav>
</template>

<script setup>
defineProps({ className: String })
</script>