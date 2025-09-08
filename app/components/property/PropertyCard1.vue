<script setup>
import '~/types/api.js'; // This line imports our JSDoc types for VS Code
import Button from '../ui/button/Button.vue';
import { useFavoritesStore } from '~/stores/favorites';
import { useAuthStore } from '~/stores/auth';
import { useCompareStore } from '~/stores/compare';
import { Scale, MapPin, Bed, Bath, Car, Maximize, Star, Clock, Heart,Eye } from 'lucide-vue-next';
// import { useCurrencyStore } from '~/stores/currency';
//...
const compareStore = useCompareStore();
const authStore = useAuthStore();
// const cuurencyStore = useCurrencyStore();
const isComparing = computed(() => compareStore.isComparing(props.property.id));
const isLoggedIn = computed(() => authStore.isLoggedIn);
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

const cityText = computed(() =>
  props.property?.location?.city ||
  props.property?.city ||
  props.property?.location?.name ||
  '—'
);

const titleText = computed(() => props.property?.title || 'Untitled Property');
const priceAmountText = computed(() => (props.property?.price?.amount ?? '—'));
const priceSuffixText = computed(() => '/perMonth'); // keep your literal text exactly
const listedDateText = computed(() => props.property?.listedDate || '');
const typeText = computed(() => props.property?.type || (props.property?.listing_type ?? ''));
const bedrooms = computed(() => props.property?.bedrooms);
const bathrooms = computed(() => props.property?.bathrooms);
const area = computed(() => props.property?.area);
const parking = computed(() => props.property?.parking);


</script>

<template>
  <!-- Uniform height card -->
  <UiCard class="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-shadow duration-300 hover:shadow-lg">
    <!-- Media -->
    <div class="relative aspect-[4/3] w-full overflow-hidden bg-muted">
      <NuxtLink :to="`/properties/${property.id}`" class="block h-full w-full">
        <NuxtImg
          :src="mainImage"
          :alt="titleText"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          :placeholder="[48, 36, 70, 5]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </NuxtLink>

      <!-- Top-left badge -->
      <div v-if="typeText" class="absolute left-3 top-3">
        <UiBadge variant="secondary" class="rounded-full bg-black/70 px-3 py-1 text-white backdrop-blur">
          {{ typeText }}
        </UiBadge>
      </div>

      <!-- Top-right quick actions -->
      <div class="absolute right-2 top-2 flex flex-col gap-2">
        <Button
          v-if="isLoggedIn"
          variant="ghost"
          size="icon"
          class="h-10 w-10 rounded-full bg-white/95 shadow-md transition hover:shadow-lg"
          @click.stop.prevent="handleFavoriteClick"
          aria-label="Toggle Favorite"
        >
          <Heart :class="['h-5 w-5 transition-all', isFavorited ? 'fill-red-500 text-red-500' : 'text-red-500']" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          @click.stop.prevent="compareStore.toggleCompare(property.id)"
          :class="[
            'h-10 w-10 rounded-full bg-white/95 shadow-md transition hover:shadow-lg',
            isComparing ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
          ]"
          aria-label="Toggle Compare"
        >
          <Scale :class="['h-5 w-5', isComparing && 'fill-current']" />
        </Button>
      </div>

      <!-- Bottom-left listed date -->
      <div
        v-if="listedDateText"
        class="absolute bottom-3 left-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-1.5 text-xs font-medium text-white shadow"
      >
        <div class="flex items-center gap-1.5">
          <Clock class="h-4 w-4" />
          <span>{{ listedDateText }}</span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <UiCardContent class="flex flex-1 flex-col p-5">
      <!-- Title -->
      <h3 class="mb-1 text-base font-semibold leading-snug clamp-2">
        {{ titleText }}
      </h3>

      <!-- Location -->
      <div class="flex  mb-3   gap-2 w-full items-start  text-sm text-muted-foreground clamp-1">
        <MapPin class="mr-1.5 h-4 w-4 " />
        <span>{{ cityText }}</span>
      </div>

      <!-- Price -->
      <div class="mb-4">
        <div class="flex items-baseline gap-1">
          <div class="text-2xl font-bold text-orange-600">
            {{ priceAmountText }}
          </div>
          <span class="text-xs font-medium text-muted-foreground">{{ priceSuffixText }}</span>
        </div>
      </div>

      <!-- Feature grid (auto-hides empty values) -->
      <div class="mb-4 grid grid-cols-2 gap-3 text-sm text-foreground/80">
        <div v-if="bedrooms !== undefined && bedrooms !== null" class="flex items-center gap-2">
          <Bed class="h-4 w-4 text-orange-600" />
          <span>{{ bedrooms }} bedrooms</span>
        </div>
        <div v-if="bathrooms !== undefined && bathrooms !== null" class="flex items-center gap-2">
          <Bath class="h-4 w-4 text-orange-600" />
          <span>{{ bathrooms }} bathrooms</span>
        </div>
        <div v-if="area !== undefined && area !== null" class="flex items-center gap-2">
          <Maximize class="h-4 w-4 text-orange-600" />
          <span>{{ area }}m²</span>
        </div>
        <div v-if="parking && parking > 0" class="flex items-center gap-2">
          <Car class="h-4 w-4 text-orange-600" />
          <span>{{ parking }} parking</span>
        </div>
      </div>


      <!-- Compare status (kept as-is: v-if="true") -->
      <div v-if="isComparing" class="mt-3 text-xs font-medium text-blue-600">
        <div class="flex items-center gap-1">
          <Scale class="h-4 w-4" />
          <span>Comparing</span>
        </div>
      </div>
    </UiCardContent>

    <!-- Footer pinned to bottom -->
    <UiCardFooter class="mt-auto flex gap-3 p-5 pt-0">
      <NuxtLink :to="`/properties/${property.id}`" class="flex-1">
        <Button variant="outline" class="w-full">
          <Eye class="h-4 w-4" />
          view
        </Button>
      </NuxtLink>
      <Button class="flex-1">contact</Button>
    </UiCardFooter>

  </UiCard>
</template>

<style scoped>
/* Safe line clamp utilities (no plugin required) */
.clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>