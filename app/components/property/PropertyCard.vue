<script setup>
import { Files,BedDouble, Bath, Framer, Heart } from 'lucide-vue-next';
import '~/types/api.js'; // This line imports our JSDoc types for VS Code
import Button from '../ui/Button.vue';
import { useFavoritesStore } from '~/stores/favorites';

import { useCompareStore } from '~/stores/compare'; 
// import { useCurrencyStore } from '~/stores/currency';
//...
const compareStore = useCompareStore();
// const cuurencyStore = useCurrencyStore();
const isComparing = computed(() => compareStore.isComparing(props.property.id));

/**
 * Defines the props for this component using JSDoc for type safety.
 * @type {import('vue').defineProps<{
 *   property: Property
 * }>}
 */
const props = defineProps({
  property: {
    type: Object,
    required: true,
  }
});

const mainImage = computed(() => {
  const firstImage = props.property.media?.find(m => m.type === 'image');
  return firstImage ? firstImage.url : 'https://via.placeholder.com/400x300.png?text=No+Image';
});

const favoritesStore = useFavoritesStore(); // <-- Use the store
const isFavorited = computed(() => favoritesStore.isFavorite(props.property.id));

function handleFavoriteClick() {
  // Prevent interaction if user isn't logged in, or redirect them
  const authStore = useAuthStore();
  if (!authStore.isLoggedIn) {
      return navigateTo('/auth/login');
  }
  favoritesStore.toggleFavorite(props.property);
}

</script>

<template>
  <div class="group relative block overflow-hidden rounded-lg bg-card text-card-foreground shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div class="relative">
      <NuxtLink :to="`/properties/${property.id}`" class="block">
        <NuxtImg
          :src="mainImage"
          :alt="property.title"
          class="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          width="400"
          height="300"
          loading="lazy"
          :placeholder="[40, 30, 75, 5]"
        />
      </NuxtLink>

      <!-- Overlay content -->
      <div class="absolute top-3 left-3">
        <span
          class="rounded-full px-3 py-1 text-xs font-semibold"
          :class="property.listingType === 'rent' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'"
        >
          For {{ property.listingType === 'rent' ? 'Rent' : 'Sale' }}
        </span>
      </div>

      <div class="absolute top-2 right-2">
        <Button @click.prevent="handleFavoriteClick" variant="secondary" size="sm" class="h-8 w-8 rounded-full p-0 bg-white/80 backdrop-blur-sm hover:bg-white">
          <Heart  :class="[
                  'h-4 w-4 transition-all', 
                  isFavorited ? 'text-red-500 fill-current' : 'text-muted-foreground'
                ]"  />
                 <span class="sr-only">Favorite</span>
        </Button>

        <Button 
          @click="compareStore.toggleCompare(property.id)" 
          :class="['flex items-center space-x-2 p-2 rounded-md transition-colors',
                   isComparing ? 'bg-primary/10 text-primary' : 'hover:bg-secondary']"
      >
        <Files class="h-4 w-4"/>
        <span>{{ isComparing ? 'Remove' : 'Compare' }}</span>
     </Button>

      </div>

       <div class="absolute bottom-3 left-3 right-3">

        <p class="text-lg font-bold text-white drop-shadow-lg">
           {{ new Intl.NumberFormat('en-US').format(property.price.raw) }} {{ property.price.currency }}
          <span v-if="property.listingType === 'rent'" class="text-sm font-normal">/ month</span>
        </p>

        <!-- <p class="text-lg font-bold text-white drop-shadow-lg">
   {{ currencyStore.convert(property.price.raw).amount }}
  <span v-if="property.listingType === 'rent'" class="text-sm font-normal">/ month</span>
</p> -->


       </div>
    </div>
    
    <div class="p-4">
      <h3 class="font-display text-lg font-semibold leading-tight truncate">
         <NuxtLink :to="`/properties/${property.id}`" class="hover:text-primary transition-colors">
            {{ property.title }}
          </NuxtLink>
      </h3>

      <p class="mt-1 text-sm text-muted-foreground truncate">
        {{ property.location.specificArea }}, {{ property.location.city }}
      </p>

      <div class="mt-4 flex items-center space-x-4 text-sm text-muted-foreground border-t pt-4">
        <div v-if="property.bedrooms" class="flex items-center">
          <BedDouble class="h-4 w-4 mr-1.5 text-primary" />
          <span>{{ property.bedrooms }} Beds</span>
        </div>
        <div v-if="property.bathrooms" class="flex items-center">
          <Bath class="h-4 w-4 mr-1.5 text-primary" />
          <span>{{ property.bathrooms }} Baths</span>
        </div>
        <div class="flex items-center">
          <Framer class="h-4 w-4 mr-1.5 text-primary" />
          <span>{{ property.area }} m²</span>
        </div>
      </div>
    </div>
  </div>
</template>