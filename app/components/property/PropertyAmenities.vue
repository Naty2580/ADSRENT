<script setup>
import '~/types/api.js';
import { Check, X } from 'lucide-vue-next';

/**
 * @type {import('vue').defineProps<{
 *   amenities: Amenity[]
 * }>}
 */
const props = defineProps({
    amenities: {
        type: Array,
        required: true,
    }
});

const available = computed(() => props.amenities.filter(a => a.available));
const unavailable = computed(() => props.amenities.filter(a => !a.available));

</script>

<template>
  <div class="bg-card p-6 rounded-lg shadow-sm border space-y-6">
    <div>
        <h2 class="font-display text-2xl font-semibold leading-none tracking-tight">Amenities & Features</h2>
    </div>

    <!-- Available Amenities -->
    <div v-if="available.length">
        <h3 class="text-lg font-semibold mb-4 text-accent">Available</h3>
        <ul class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <li v-for="amenity in available" :key="amenity.name" class="flex items-center p-3 bg-secondary rounded-md">
                <Check class="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                <span class="text-foreground text-sm font-medium">{{ amenity.name }}</span>
            </li>
        </ul>
    </div>

    <!-- Unavailable Amenities -->
    <div v-if="unavailable.length">
        <h3 class="text-lg font-semibold mb-4 text-muted-foreground">Not Included</h3>
        <ul class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <li v-for="amenity in unavailable" :key="amenity.name" class="flex items-center p-3 bg-secondary/50 rounded-md text-muted-foreground line-through">
                <X class="h-5 w-5 text-muted-foreground mr-3 flex-shrink-0" />
                <span class="text-sm">{{ amenity.name }}</span>
            </li>
        </ul>
    </div>
  </div>
</template>