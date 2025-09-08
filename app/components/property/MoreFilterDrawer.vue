<script setup>
import FilterSidebar from '~/components/property/FilterSidebar.vue';

defineProps({ open: Boolean });
defineEmits(['update:open']);
</script>
<template>
  <UiSheet :open="open" @update:open="$emit('update:open', $event)">
    <UiSheetContent class="w-full sm:max-w-md">
        <UiSheetHeader>
          <UiSheetTitle>All Filters</UiSheetTitle>
          <UiSheetDescription>Refine your search to find the perfect property.</UiSheetDescription>
        </UiSheetHeader>
        <div class="py-4"><FilterSidebar /></div>
    </UiSheetContent>
  </UiSheet>
</template>