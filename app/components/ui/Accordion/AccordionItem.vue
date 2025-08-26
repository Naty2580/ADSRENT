<script setup>
import { ref } from 'vue'

const props = defineProps({
  value: String,
  open: Boolean,
})

const isOpen = ref(props.open ?? false)

function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div
    data-slot="accordion-item"
    class="border-b last:border-b-0"
  >
    <slot name="trigger" :isOpen="isOpen" :toggle="toggle" />
    <slot name="content" :isOpen="isOpen" />
  </div>
</template>