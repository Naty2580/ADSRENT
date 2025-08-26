<template>
  <ol
    data-slot="breadcrumb-list"
    :class="['text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5', className]"
  >
    <slot />
  </ol>
</template>

<script setup>
const props = defineProps({ className: String })
</script>