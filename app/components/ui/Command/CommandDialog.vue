<template>
  <Dialog :open="open" @update:open="open = $event">
    <DialogHeader class="sr-only">
      <DialogTitle>{{ title }}</DialogTitle>
      <DialogDescription>{{ description }}</DialogDescription>
    </DialogHeader>
    <DialogContent class="overflow-hidden p-0">
      <Command>
        <slot />
      </Command>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import Dialog from '@/components/ui/Dialog/Dialog.vue'
import DialogHeader from '@/components/ui/Dialog/DialogHeader.vue'
import DialogTitle from '@/components/ui/Dialog/DialogTitle.vue'
import DialogDescription from '@/components/ui/Dialog/DialogDescription.vue'
import DialogContent from '@/components/ui/Dialog/DialogContent.vue'
import Command from './Command.vue'

defineProps({
  title: { type: String, default: 'Command Palette' },
  description: { type: String, default: 'Search for a command to run...' },
})
const open = ref(false)
</script>