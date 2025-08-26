<template>
  <div
    role="group"
    aria-roledescription="slide"
    data-slot="carousel-item"
    :class="[
      'min-w-0 shrink-0 grow-0 basis-full',
      orientation === 'horizontal' ? 'pl-4' : 'pt-4',
      className,
    ]"
  >
    <slot />
  </div>
</template>

<script setup>
import { inject } from 'vue'
defineProps({ className: String })

const { orientation } = inject('carousel')
</script>