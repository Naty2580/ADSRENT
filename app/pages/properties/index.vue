<script setup>
import { useRoute } from 'vue-router';
import '~/types/api.js';

const route = useRoute();
const isFilterSidebarOpen = ref(false); // For mobile view
const resultLayout = ref('grid'); // 'grid' | 'list'

const { data: searchResults, pending, error } = await useAsyncData(
  'property-search',
  () => {
    const { $api } = useNuxtApp();
    return $api.get('/property-search', { params: route.query });
  }, 
  { watch: [() => route.query] }
);

const properties = computed(() => searchResults.value?.data || []);
const totalResults = computed(() => searchResults.value?.meta.total || 0);
const pagination = computed(() => searchResults.value?.meta);

</script>
<template>
  <div class="bg-secondary/30 pt-20"> 

    <div class="border-b bg-background">
        <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <h1 class="font-display text-4xl font-bold">Properties for Sale & Rent</h1>
            <p class="mt-2 text-muted-foreground">Browse our catalog of available listings or use the filters to find your perfect match.</p>
        </div>
     </div>

     <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <!-- Main Grid Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

        <!-- Sticky Sidebar for Desktop -->
        <div class="hidden lg:block lg:col-span-1 sticky top-24">
          <PropertySearchHeader />
        </div>

        <div class="lg:col-span-3">
          <!-- Results Header with Mobile Filter Button -->
          <div class="flex flex-col md:flex-row items-center justify-between p-4 bg-card rounded-lg shadow-sm mb-6 border">
            <p class="text-sm text-muted-foreground mb-4 md:mb-0">
              <span class="font-bold text-foreground">{{ totalResults }}</span> properties found
            </p>

            <div class="flex items-center space-x-2 w-full md:w-auto">
                <select v-model="sortBy" class="form-input h-9 text-sm">
                    <option value="newest">Sort by: Newest</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                </select>
                <div class="hidden md:flex items-center space-x-1 p-1 bg-secondary rounded-md">
                   <Button :variant="resultLayout === 'grid' ? 'default' : 'ghost'" size="sm" @click="resultLayout = 'grid'"><LayoutGrid class="h-4 w-4"/></Button>
                   <Button :variant="resultLayout === 'list' ? 'default' : 'ghost'" size="sm" @click="resultLayout = 'list'"><ListIcon class="h-4 w-4"/></Button>
                </div>
                 <Button variant="outline" class="lg:hidden" @click="isFilterSidebarOpen = true"><FilterIcon class="h-4 w-4" />Filters</Button>
            </div>
          </div>

      <div v-if="pending" class="grid-view">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <PropertyCardSkeleton v-for="i in 8" :key="`skel-${i}`" />
          </div>
      </div>

      <div v-else-if="error" class="text-center py-20">Error loading properties.</div>

      <div v-else-if="properties.length > 0" :class="[resultLayout === 'grid' ? 'grid-view' : 'list-view']">
              <PropertyCard1 v-for="property in properties" :key="property.id" :property="property"/>
          </div>
          
          <div v-else class="text-center py-20 bg-card rounded-lg">
                      <h3 class="text-xl font-semibold">No Properties Found</h3>
                      <p class="mt-2 text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
                  </div>
                  </div>

                  <div v-if="isFilterSidebarOpen" class="fixed inset-0 z-50 ...">
            ... mobile sidebar ...
        </div>

      <!-- 2. The main content area that toggles between grid and map -->
      <!-- <main v-else>
          <div v-if="viewMode === 'grid'">
              <div class="container mx-auto px-4 py-8">
                  <div v-if="properties.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      <PropertyCard1 v-for="property in properties" :key="property.id" :property="property"/>
                  </div>
                  <div v-else class="text-center py-20 bg-card rounded-lg">
                      <h3 class="text-xl font-semibold">No Properties Found</h3>
                      <p class="mt-2 text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
                  </div>
              </div>
          </div>
          <div v-else-if="viewMode === 'map'">
              <PropertyMapView :properties="properties" />
          </div>
      </main> -->
      
       <!-- Pagination will be added here -->
    </div>
</div>

  </div> 
</template>

<style scoped>
.form-input { @apply h-9 rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors; }
.grid-view { @apply grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6; }
.list-view { @apply flex flex-col gap-6; /* Add list styles for property card here */ }
</style>
