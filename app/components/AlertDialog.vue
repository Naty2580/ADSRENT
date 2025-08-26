<!-- components/ui/AlertDialog.vue -->
<template>
  <div>
    <button
      @click="openDialog"
      :class="buttonVariants"
      data-slot="alert-dialog-trigger"
    >
      Open Dialog
    </button>

    <dialog
      ref="dialogRef"
      class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      data-slot="alert-dialog"
    >
      <div
        class="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg"
        data-slot="alert-dialog-content"
      >
        <header class="text-lg font-semibold mb-2" data-slot="alert-dialog-title">
          Confirm Action
        </header>
        <p class="text-sm text-gray-600 mb-4" data-slot="alert-dialog-description">
          Are you sure you want to proceed? This action cannot be undone.
        </p>
        <footer class="flex justify-end gap-2" data-slot="alert-dialog-footer">
          <button
            @click="closeDialog"
            :class="buttonVariantsOutline"
            data-slot="alert-dialog-cancel"
          >
            Cancel
          </button>
          <button
            @click="confirmAction"
            :class="buttonVariants"
            data-slot="alert-dialog-action"
          >
            Confirm
          </button>
        </footer>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dialogRef = ref(null)

function openDialog() {
  dialogRef.value?.showModal()
}

function closeDialog() {
  dialogRef.value?.close()
}

function confirmAction() {
  // Your action logic here
  closeDialog()
}

// Tailwind button styles
const buttonVariants = 'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
const buttonVariantsOutline = 'px-4 py-2 border border-gray-300 rounded hover:bg-gray-100'
</script>