<script setup>
import '~/types/api.js';
import { useCurrencyStore } from '~/stores/currency';
import { useFavoritesStore } from '~/stores/favorites';
import { useAuthStore } from '~/stores/auth';
import { MapPin, Heart, Share, BedDouble, Bath, Ruler, Sofa } from 'lucide-vue-next';
import Button from '~/components/ui/Button.vue';

/**
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

const currencyStore = useCurrencyStore();
const favoritesStore = useFavoritesStore();
const authStore = useAuthStore();

const isFavorited = computed(() => favoritesStore.isFavorite(props.property.id));
const availableCurrencies = ['ETB', 'USD', 'EUR'];

// Use the global currency store for reactive price updates
const formattedPrice = computed(() => {
    return currencyStore.convert(props.property.price.rawAmount);
});

function toggleFavorite() {
    if (!authStore.isLoggedIn) {
        return navigateTo('/auth/login');
    }
    favoritesStore.toggleFavorite(props.property);
}

// Functionality for "Share" can be added here
function handleShare() {
    if (navigator.share) {
        navigator.share({
            title: props.property.title,
            text: `Check out this property on AddisRent: ${props.property.title}`,
            url: window.location.href,
        }).catch(err => console.error("Share failed", err));
    } else {
        // Fallback for desktop: copy link to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    }
}
</script>

<template>
  <div class="bg-card p-6 rounded-lg shadow-sm border">
    <!-- Top section: Title and Actions -->
    <div class="flex flex-col sm:flex-row items-start justify-between">
        <div>
            <h1 class="font-display text-3xl font-bold text-foreground leading-tight"> {{ property.title }} </h1>
            <div class="mt-2 flex items-center text-muted-foreground">
                <MapPin class="h-5 w-5 mr-2 text-primary" />
                <span class="text-base">{{ property.location.specificArea }}, {{ property.location.subcity }}, {{ property.location.city }}</span>
            </div>
        </div>
        <div class="flex items-center space-x-2 mt-4 sm:mt-0 flex-shrink-0">
            <Button variant="outline" size="sm" @click="toggleFavorite">
                <Heart :class="['h-4 w-4 mr-2', isFavorited ? 'text-red-500 fill-current' : '']"/> Favorite
            </Button>
            <Button variant="outline" size="sm" @click="handleShare"><Share class="h-4 w-4 mr-2"/> Share</Button>
        </div>
    </div>

    <!-- Price section -->
    <div class="mt-6 bg-secondary p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
            
            <p class="text-4xl font-bold text-primary">{{ formattedPrice.amount }}</p>
            <p v-if="property.listingType === 'rent'" class="text-sm text-muted-foreground">per month</p>
        </div>
        <!-- Inline Currency Switcher -->
        <div class="flex items-center p-1 rounded-full bg-background text-sm shadow-inner">
            <button
                v-for="c in availableCurrencies"
                :key="c"
                @click="currencyStore.setCurrency(c)"
                :class="[
                    'px-4 py-1 rounded-full text-xs font-semibold',
                    currencyStore.selectedCurrency === c ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
                ]"
            >
                {{ c }}
            </button>
        </div>
    </div>
    
    <!-- Key Stats section -->
    <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="text-center p-4 bg-secondary/50 rounded-lg">
        <BedDouble class="h-8 w-8 mx-auto mb-2 text-primary" />
        <div class="font-semibold text-lg">{{ property.bedrooms || '-' }}</div>
        <div class="text-sm text-muted-foreground">Bedrooms</div>
      </div>
       <div class="text-center p-4 bg-secondary/50 rounded-lg">
        <Bath class="h-8 w-8 mx-auto mb-2 text-primary" />
        <div class="font-semibold text-lg">{{ property.bathrooms || '-' }}</div>
        <div class="text-sm text-muted-foreground">Bathrooms</div>
      </div>
       <div class="text-center p-4 bg-secondary/50 rounded-lg">
        <Ruler class="h-8 w-8 mx-auto mb-2 text-primary" />
        <div class="font-semibold text-lg">{{ property.area }}m²</div>
        <div class="text-sm text-muted-foreground">Area</div>
      </div>
       <div class="text-center p-4 bg-secondary/50 rounded-lg">
        <Sofa class="h-8 w-8 mx-auto mb-2 text-primary" />
        <div class="font-semibold text-lg capitalize">{{ property.furnished || (property.isFurnished ? 'Yes' : 'No') }}</div>
        <div class="text-sm text-muted-foreground">Furnished</div>
      </div>
    </div>
  </div>
</template>