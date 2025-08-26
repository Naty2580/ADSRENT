<!-- RadioGroupItem.vue -->
<script setup>
import { ref, useAttrs } from 'vue'
import { CircleIcon } from 'lucide-vue-next'
import { cn } from '@/lib/cn.ts'

const attrs = useAttrs()
const isChecked = ref(false)
</script>

<template>
  <label
    data-slot="radio-group-item"
    class="inline-flex items-center"
  >
    <input
      type="radio"
      :value="attrs.value"
      :name="attrs.name"
      :checked="attrs.checked"
      @change="isChecked = true"
      class="sr-only"
      v-bind="attrs"
    />
    <div
      class="border-orange-300 text-black focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-orange-100 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-60"
      :class="attrs.class"
    >
      <div
        v-if="attrs.checked"
        data-slot="radio-group-indicator"
        class="relative flex items-center justify-center"
      >
        <CircleIcon class="fill-orange-500 absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  </label>
</template>