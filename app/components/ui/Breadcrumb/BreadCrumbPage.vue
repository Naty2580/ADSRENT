<template>
  <span
    data-slot="breadcrumb-page"
    role="link"
    aria-disabled="true"
    aria-current="page"
    :class="['text-foreground font-normal', className]"
  >
    <slot />
  </span>
</template>

<script setup>
const props = defineProps({ className: String })
</script>