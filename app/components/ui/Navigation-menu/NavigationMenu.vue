<template>
  <nav
    data-slot="navigation-menu"
    :data-viewport="viewport"
    :class="[
      'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
      className,
    ]"
  >
    <slot />
    <NavigationMenuViewport v-if="viewport" />
  </nav>
</template>

<script setup>
import NavigationMenuViewport from './NavigationMenuViewport.vue'
defineProps({
  className: String,
  viewport: { type: Boolean, default: true },
})
</script>