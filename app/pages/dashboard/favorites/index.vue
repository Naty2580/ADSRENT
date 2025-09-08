<script setup>
import { useFavoritesStore } from '~/stores/favorites';

import Button from '~/components/ui/Button.vue'; 

definePageMeta({
  layout: 'dashboard',
  middleware: 'authed',
}); 



const favoritesStore = useFavoritesStore();
// const favoriteIds = computed(() => Array.from(favoritesStore.favoriteIds));

const { data: favoriteData, pending, error } = await useAsyncData(
  'favorite-properties-page',
  () => {
      console.log("Fetching full favorite properties for the page...");
      const { $api } = useNuxtApp();
      return $api.get('/favorites');
  },
  {
      // This is the KEY to keeping the page in sync.
      // Whenever the user favorites/unfavorites something, the count of IDs
      // changes, and this watch will trigger a re-fetch of the full list.
      watch: [() => favoritesStore.favoriteIds.size]
  }
);

const favoriteProperties = computed(() => favoriteData.value?.data || []);

onMounted(() => {
    if (!favoritesStore.isLoaded) {
        favoritesStore.fetchFavorites();
    }
});

// const displayedFavorites = computed(() => {
//     if (!favoriteProperties.value) return [];
//     // Only show properties that are still in our local 'favoriteIds' set.
//     return favoriteProperties.value.filter(p => favoritesStore.isFavorite(p.id));
// });

// onMounted(() => {
//     favoritesStore.fetchFavorites();
// });

</script>

<template>
  <div>
    <h1 class="font-display text-3xl font-bold">My Favorite Properties</h1>
    <p class="mt-2 text-muted-foreground">Your personal collection of properties you're interested in.</p>
    
    <div class="mt-8">
        <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <PropertyCardSkeleton v-for="i in 3" :key="`skel-${i}`" />
        </div>
        <div v-else-if="!favoriteProperties || favoriteProperties.length === 0" class="text-center py-16 bg-card rounded-lg border">
            <h3 class="text-xl font-semibold">No Favorites Yet</h3>
            <p class="mt-2 text-muted-foreground">Click the heart icon on any property to save it here.</p>
            <NuxtLink to="/properties" class="mt-4"><Button variant="outline">Start Searching </Button></NuxtLink>
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             <PropertyCard1
                v-for="property in favoriteProperties"
                :key="property.id"
                :property="property"
            />
        </div>
    </div> 
  </div>
</template>