<script setup>
defineProps({
  property: Object
})
</script>

<template>
  <div
    class="border border-dividerGray rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] transition-transform duration-200"
  >
    <img
      :src="property.image"
      alt="Property Image"
      class="h-48 w-full object-cover"
    />
    <div class="p-5 space-y-2 text-darkText">
      <h2 class="text-lg font-semibold">{{ property.title }}</h2>
      <p class="text-sm text-gray-600">{{ property.location }}</p>
      <p class="text-orangeAccent font-bold text-lg">{{ property.price }} ETB/month</p>
      <div class="flex space-x-6 text-sm text-gray-600">
        <span>🛏️ {{ property.bedrooms }} Beds</span>
        <span>🛁 {{ property.bathrooms }} Baths</span>
        <span>📐 {{ property.size }} sqm</span>
      </div>
      <div class="flex items-center justify-between mt-3">
        <button
          class="bg-orangeAccent text-white px-4 py-2 rounded-lg hover:bg-orangeAccent/90 transition font-semibold"
        >
          View Details
        </button>
        <div
          class="text-orangeAccent cursor-pointer hover:scale-110 transition-transform select-none"
          title="Add to favorites"
        >
          ❤️
        </div>
      </div>
    </div>
  </div>
</template>
