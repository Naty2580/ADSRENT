<script setup>
defineProps({
  links: Array
})
</script>

<template>
  <div class="flex justify-center mt-8 space-x-3">
    <template v-for="link in links" :key="link.label">
      <button
        v-if="link.url"
        v-html="link.label"
        :class="[
          'px-4 py-2 rounded-lg border text-sm transition',
          link.active
            ? 'bg-orangeAccent text-white border-orangeAccent'
            : 'bg-white text-darkText border-dividerGray hover:bg-orangeAccent hover:text-white',
        ]"
      />
      <span
        v-else
        v-html="link.label"
        class="px-4 py-2 rounded-lg text-gray-400 text-sm select-none"
      />
    </template>
  </div>
</template>

