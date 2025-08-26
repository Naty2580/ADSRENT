<script setup>
import CityCard from './CityCard.vue';
import '~/types/api.js';

// --- MOCK DATA ---
// This will eventually come from our homepage API endpoint.
const cities = ref([
  { id: 1, name: 'Addis Ababa', slug: 'addis-ababa', propertyCount: 127 },
  { id: 2, name: 'Adama', slug: 'adama', propertyCount: 45 },
  { id: 3, name: 'Hawassa', slug: 'hawassa', propertyCount: 32 },
  { id: 4, name: 'Bahir Dar', slug: 'bahir-dar', propertyCount: 28 },
]);

// As planned, we map slugs to local images for high performance and control.
// Remember to add these images to the specified path!
const cityImageMap = {
  'addis-ababa': '/images/cities/addis-ababa.jpg',
  'adama': '/images/cities/adama.jpg',
  'hawassa': '/images/cities/hawassa.jpg',
  'bahir-dar': '/images/cities/bahir-dar.jpg',
};

// You can find placeholder images at unsplash.com, or use these links:
// Addis Ababa: https://images.unsplash.com/photo-1547863584-c18753e1a052
// Adama: https://images.unsplash.com/photo-1594918295054-d3d622616212
// Hawassa: https://images.unsplash.com/photo-1563810444372-e1d5108b3353
// Bahir Dar: https://images.unsplash.com/photo-1628043691653-5bcb04983050

function getCityImageUrl(slug) {
  return cityImageMap[slug] || '/images/cities/default.jpg';
}
</script>

<template>
  <div class="py-12 md:py-20">
    <div class="text-center">
      <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground">
        Explore by City
      </h2>
      <p class="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
        Find your future home in one of Ethiopia's vibrant cities.
      </p>
    </div>
    <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <CityCard
        v-for="city in cities"
        :key="city.id"
        :city="city"
        :image-url="getCityImageUrl(city.slug)"
      />
    </div>
  </div>
</template>