<script setup>
import '~/types/api.js';

/**
 * @type {import('vue').defineProps<{
 *   city: City,
 *   imageUrl: string
 * }>}
 */
defineProps({
  city: {
    type: Object,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  }
});
</script>

<template>
  <NuxtLink 
    :to="`/properties?city=${city.slug}`" 
    class="group relative flex h-64 items-end justify-start overflow-hidden rounded-lg bg-card text-card-foreground shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
  >
    <NuxtImg
      :src="imageUrl"
      :alt="`View properties in ${city.name}`"
      class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
      width="300"
      height="256"
      loading="lazy"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
    <div class="relative z-10 p-4 text-white">
      <h3 class="font-display text-xl font-semibold">{{ city.name }}</h3>
      <p class="text-sm text-white/90">{{ city.propertyCount }} Properties</p>
    </div>
  </NuxtLink>
</template>