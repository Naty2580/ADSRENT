<template>
  <div class="flex items-center justify-center gap-2 mt-4">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
    >
      Prev
    </button>
    <span class="text-sm text-gray-700">
      Page {{ currentPage }} of {{ totalPages }}
    </span>
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  total: Number,
  perPage: {
    type: Number,
    default: 10,
  },
});

const emit = defineEmits(['page-change']);
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(props.total / props.perPage));

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    emit('page-change', currentPage.value);
  }
};
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    emit('page-change', currentPage.value);
  }
};
</script>
