<script setup>
import PropertyCard from '../property/PropertyCard.vue';
import '~/types/api.js';

// --- MOCK DATA ---
// This will be replaced by a `useFetch` call to our API: GET /api/v1/page-data/home
const featuredProperties = ref([
  { id: 1, title: 'Spacious Villa with Garden', listingType: 'rent', price: { amount: '85,000.00', raw: 85000, currency: 'ETB' }, location: { specificArea: 'Bole', city: 'Addis Ababa' }, bedrooms: 4, bathrooms: 5, area: 300, media: [{ id: 1, url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070', type: 'image'}] },
  { id: 2, title: 'Modern Apartment in CMC', listingType: 'sale', price: { amount: '12,500,000.00', raw: 12500000, currency: 'ETB' }, location: { specificArea: 'CMC', city: 'Addis Ababa' }, bedrooms: 3, bathrooms: 2, area: 150, media: [{ id: 2, url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070', type: 'image'}] },
  { id: 3, title: 'Cozy Guesthouse in Kazanchis', listingType: 'rent', price: { amount: '45,000.00', raw: 45000, currency: 'ETB' }, location: { specificArea: 'Kazanchis', city: 'Addis Ababa' }, bedrooms: 2, bathrooms: 2, area: 120, media: [{ id: 3, url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070', type: 'image'}] },
  { id: 4, title: 'Luxury Condominium with Pool', listingType: 'sale', price: { amount: '25,000,000.00', raw: 25000000, currency: 'ETB' }, location: { specificArea: 'Old Airport', city: 'Addis Ababa' }, bedrooms: 4, bathrooms: 4, area: 280, media: [{ id: 4, url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974', type: 'image'}] },
]);
</script>

<template>
  <div class="py-12 md:py-20">
    <div class="text-center">
      <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground">
        Featured Properties
      </h2>
      <p class="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
        Handpicked properties from our experts. Find your dream home from our popular choices.
      </p>
    </div>
    <div v-if="featuredProperties && featuredProperties.length > 0" class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <PropertyCard 
        v-for="property in featuredProperties" 
        :key="property.id"
        :property="property"
      />
    </div>
    <div v-else class="text-center mt-10">
      <!-- We can add a nice skeleton loader here later -->
      <p class="text-muted-foreground">Loading properties...</p>
    </div>
  </div>
</template>