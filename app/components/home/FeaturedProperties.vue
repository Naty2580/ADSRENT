<script setup>
import '~/types/api.js';
import { useAsyncData } from '#imports';
import Button from '../ui/button/Button.vue';

// --- LIVE API FETCH ---
// We fetch data directly within the component.
// 'featuredProperties' is a unique key for caching this specific data.
const { data: featuredProperties, pending, error } = await useAsyncData(
    'featuredProperties',
    async () => {
        const { $api } = useNuxtApp();
        try {
            console.log("Fetching featured properties from the API...");
            
            // Call the search endpoint with the 'is_featured' flag.
            // Your backend's pagination might wrap this in a 'data' object.
            const response = await $api.get('/property-search', {
                params: {
                    is_featured: 1,
                    // You might want to add a 'limit' parameter to your backend
                    // for efficiency, e.g., limit: 6
                    limit: 6
                }
            });
            
            // Your API returns paginated data, so the properties are in the `data` array.
            // We also map the price field for consistency with our PropertyCard component.
            return response.data.map(property => {
                if (property.price && property.price.rawAmount) {
                    property.price.raw = property.price.rawAmount;
                }
                return property;
            });

        } catch (e) {
            console.error("Failed to fetch featured properties:", e);
            return []; // Return an empty array on error to prevent crashes
        }
    }
);
</script>

<template>
  <section class="py-20 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Featured Properties</h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-8">Handpicked properties from our experts. Find your dream home from our popular choices.</p>
      </div>

      <!-- PENDING (Loading) State -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PropertyCardSkeleton v-for="i in 3" :key="`feat-skel-${i}`" />
      </div>
      
      <!-- ERROR State --> 
      <div v-else-if="error" class="text-center text-destructive">
          Failed to load featured properties. Please try again later.
      </div>

      <!-- SUCCESS State -->
      <div v-else-if="featuredProperties && featuredProperties.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PropertyCard1 
            v-for="property in featuredProperties" 
            :key="property.id"
            :property="property"
        />
      </div>

       <!-- EMPTY State -->
       <div v-else class="text-center mt-10">
        <p class="text-muted-foreground">No featured properties are available at the moment.</p>
      </div>
      
      <div class="text-center mt-12">
        <Button
          as="NuxtLink"
          to="/properties"
          variant="outline"
          size="lg"
          class="border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white"
        >
          View All Properties
        </Button>
      </div>
    </div>
  </section>
</template>