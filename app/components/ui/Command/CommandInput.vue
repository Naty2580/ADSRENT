<template>
  <div data-slot="command-input-wrapper" class="flex h-9 items-center gap-2 border-b px-3">
    <SearchIcon class="size-4 shrink-0 opacity-50" />
    <input
      v-model="query"
      type="text"
      placeholder="Type a command..."
      data-slot="command-input"
      class="placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {SearchIcon} from 'lucide-vue-next'

const query = ref('')
</script>