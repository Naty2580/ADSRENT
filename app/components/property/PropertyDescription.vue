<script setup>
import '~/types/api.js';
import { CheckCircle, Home, MapPin, Wrench } from 'lucide-vue-next';

/**
 * @type {import('vue').defineProps<{
 *   description: PropertyDescription
 * }>}
 */
defineProps({
    description: {
        type: Object,
        required: true,
    }
});
</script>

<template>
  <div class="bg-card p-6 rounded-lg shadow-sm border space-y-8">
    <!-- Main Title -->
    <div>
        <h2 class="font-display text-2xl font-semibold leading-none tracking-tight">Property Description</h2>
    </div>

    <!-- Overview -->
    <div v-if="description.overview">
        <h3 class="text-xl font-semibold mb-3 text-primary flex items-center">
            Overview
        </h3>
        <p class="text-muted-foreground leading-relaxed">{{ description.overview }}</p>
    </div>

    <!-- Location Advantages -->
    <div v-if="description.locationAdvantages && description.locationAdvantages.length">
        <h3 class="text-xl font-semibold mb-3 text-primary flex items-center">
            <MapPin class="h-5 w-5 mr-2" />
            Location Advantages
        </h3>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            <li v-for="(advantage, index) in description.locationAdvantages" :key="index" class="flex items-start space-x-3">
                <CheckCircle class="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span class="text-muted-foreground">{{ advantage }}</span>
            </li>
        </ul>
    </div>
    
    <!-- Room Details -->
     <div v-if="description.roomDetails && description.roomDetails.length">
        <h3 class="text-xl font-semibold mb-3 text-primary flex items-center">
            <Home class="h-5 w-5 mr-2" />
            Room Details
        </h3>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            <li v-for="(detail, index) in description.roomDetails" :key="index" class="flex items-start space-x-3">
                <CheckCircle class="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span class="text-muted-foreground">{{ detail }}</span>
            </li>
        </ul>
    </div>

    <!-- Utilities -->
    <div v-if="description.utilities && description.utilities.length" class="bg-primary/5 p-6 rounded-lg">
        <h3 class="text-xl font-semibold mb-3 text-primary flex items-center">
            <Wrench class="h-5 w-5 mr-2" />
            Utilities & Services Included
        </h3>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            <li v-for="(utility, index) in description.utilities" :key="index" class="flex items-start space-x-3">
                <CheckCircle class="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span class="text-muted-foreground">{{ utility }}</span>
            </li>
        </ul>
    </div>

  </div>
</template>