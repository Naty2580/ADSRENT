<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useSearch } from '~/composables/useSearch.js';
import FilterSidebar from '~/components/property/FilterSidebar.vue';
import PropertyCard from '~/components/property/PropertyCard.vue';
import PropertyCardSkeleton from '~/components/property/PropertyCardSkeleton.vue';
import { List, Grip, Filter } from 'lucide-vue-next';

const route = useRoute();
const { queryKey } = useSearch();

// For Mobile: state to control the filter sidebar's visibility
const isFilterSidebarOpen = ref(false);

// --- MOCK API FETCH ---
// We use `useAsyncData` to fetch data. It's Nuxt's SSR-friendly data fetching method.
// The `watch` property tells it to re-run the fetch whenever `route.query` changes.
const { data: properties, pending, error } = await useAsyncData(
  'properties',
  () => {
    // In a real app, this would be an API call:
    // return $fetch('/api/properties', { params: route.query })
    
    // For now, we simulate a network delay and return mock data.
    console.log("Simulating API fetch with query:", route.query);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          // This array would be our API response
          { id: 1, title: 'Spacious Villa in Bole', listingType: 'rent', price: { amount: '85,000.00', raw: 85000, currency: 'ETB' }, location: { specificArea: 'Bole', city: 'Addis Ababa' }, bedrooms: 4, bathrooms: 5, area: 300, media: [{ id: 1, url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be', type: 'image'}] },
          { id: 2, title: 'Modern Apartment in CMC', listingType: 'sale', price: { amount: '12,500,000.00', raw: 12500000, currency: 'ETB' }, location: { specificArea: 'CMC', city: 'Addis Ababa' }, bedrooms: 3, bathrooms: 2, area: 150, media: [{ id: 2, url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', type: 'image'}] },
          { id: 3, title: 'Cozy Guesthouse in Kazanchis', listingType: 'rent', price: { amount: '45,000.00', raw: 45000, currency: 'ETB' }, location: { specificArea: 'Kazanchis', city: 'Addis Ababa' }, bedrooms: 2, bathrooms: 2, area: 120, media: [{ id: 3, url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', type: 'image'}] },
        ]);
      }, 1000); // 1-second delay
    });
  },
  { watch: [() => route.query] }
);

</script>

<template>
  <div class="bg-secondary/50">
    <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

        <!-- Filter Sidebar (Desktop) -->
        <div class="hidden lg:block lg:col-span-1">
          <FilterSidebar />
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3">
          <!-- Search Results Header -->
          <div class="flex flex-col md:flex-row items-center justify-between p-4 bg-card rounded-lg shadow-sm mb-6">
            <h2 class="text-lg font-medium text-foreground mb-4 md:mb-0">
              <span v-if="!pending">{{ properties.length }}</span> 
              <span v-else>Loading</span> 
              results found
            </h2>
            <div class="flex items-center space-x-2 w-full md:w-auto">
                <Button variant="outline" class="lg:hidden w-full" @click="isFilterSidebarOpen = true">
                  <Filter class="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <!-- Sort and view controls will go here -->
                <div class="hidden md:flex items-center space-x-1 p-1 bg-secondary rounded-md">
                   <Button variant="ghost" size="sm" class="bg-background shadow"><Grip class="h-4 w-4"/></Button>
                   <Button variant="ghost" size="sm"><List class="h-4 w-4"/></Button>
                </div>
            </div>
          </div>
          
          <!-- Results Grid / Skeletons -->
          <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <PropertyCardSkeleton v-for="i in 6" :key="`skel-${i}`" />
          </div>
          <div v-else-if="error" class="text-center py-20">
              <p class="text-destructive">An error occurred while fetching properties.</p>
          </div>
          <div v-else-if="properties.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <PropertyCard v-for="prop in properties" :key="prop.id" :property="prop" />
          </div>
          <div v-else class="text-center py-20 bg-card rounded-lg">
             <h3 class="text-xl font-semibold">No Properties Found</h3>
             <p class="mt-2 text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
          </div>

          <!-- Pagination will go here later -->
        </div>

        <!-- Filter Sidebar (Mobile - Modal) -->
        <div v-if="isFilterSidebarOpen" class="fixed inset-0 z-50 bg-black/60 lg:hidden" @click="isFilterSidebarOpen = false">
            <div class="fixed inset-y-0 left-0 w-full max-w-sm bg-background p-6 overflow-y-auto" @click.stop>
                <FilterSidebar />
                 <Button class="mt-4 w-full" @click="isFilterSidebarOpen = false">
                    View Results
                 </Button>
            </div>
        </div>

      </div>
    </div>
  </div>
</template>


