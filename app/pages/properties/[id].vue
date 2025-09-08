<script setup>
import { watch } from 'vue';
import '~/types/api.js';
import { useRoute, showError } from '#app';
import { useAsyncData, useHead } from '#imports';
// import PropertyGallery from '~/components/property/PropertyGallery.vue';
// import PropertyPrimaryInfo from '~/components/property/PropertyPrimaryInfo.vue';
// import PropertyDescription from '~/components/property/PropertyDescription.vue';
// import PropertyAmenities from '~/components/property/PropertyAmenities.vue';
// import PropertyMapClient from '~/components/property/PropertyMap.client.vue';
import LessorContactCard from '~/components/property/LessorContactCard.vue';

const route = useRoute();
const propertyId = route.params.id;

// This adapter function transforms the API data into the shape our components expect.
// This is the clean way to handle mismatches.
// This new version is safe and does not mutate the original data.
const transformPropertyData = (apiProperty) => { 
    if (!apiProperty) return null;

    let amenitiesArray = [];
    try {
      // Safely parse amenities, which might be a JSON string or null
      amenitiesArray = JSON.parse(apiProperty.amenities || "[]");
    } catch (e) {
      console.error("Failed to parse amenities JSON:", e);
    }
    
    // Create a NEW object with the final structure our components need.
    return {
        ...apiProperty, // Copy all original properties (id, title, etc.)

        // 1. Safely override the price object
        price: {
            ...apiProperty.price,
            raw: apiProperty.price?.rawAmount || 0 // Use ?. for safety
        },

        // 2. Create the NEW structured description object
        description: {
            overview: apiProperty.description, // The original string becomes the overview
            locationAdvantages: [],
            roomDetails: [],
            utilities: [],
        },

        // 3. Create the NEW structured amenities array
        amenities: amenitiesArray.map(name => ({
            name: name,
            available: true,
        })),
    };
}

// --- LIVE API FETCH ---
const { data: property, pending, error } = await useAsyncData(
  `property-${propertyId}`,
  async () => {
    const { $api } = useNuxtApp();
    try {
        console.log(`Fetching property with id: ${propertyId} from API...`);
        // The API call to your Laravel backend
        const apiProperty = await $api.get(`/properties/${propertyId}`);
        // Transform the data before returning it
        console.log('API Property from inside async:', apiProperty);
        return transformPropertyData(apiProperty.data);
    } catch (e) {
        // If API returns 404 or another error, we'll catch it here
        console.error("Failed to fetch property:", e);
        return null; // Return null to indicate not found
    }
  }
);



</script>

<template>
  <div v-if="pending" class="text-center py-40">Loading...</div>
  <div v-else-if="property" class="bg-secondary/30">
    <div class="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

        <!-- Left / Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <PropertyGallery :media="property.media" :propertyTitle="property.title" />
 
          <!-- Header & Stats -->
          <PropertyPrimaryInfo :property="property" />
          
          <!-- Description -->  
          <PropertyDescription :description="property.description" /> 
          
          <!-- Amenities --> 
          <PropertyAmenities :amenities="property.amenities" />
          
           
          <!-- Map -->
           <div class="bg-card p-6 rounded-lg shadow-sm">
              <h2 class="font-display text-2xl font-semibold mb-4">Location</h2>
              <PropertyMap.client :latitude="property.location.latitude" :longitude="property.location.longitude" />
           </div>

        </div>
 
        <!-- Right / Sidebar -->
        <aside class="lg:col-span-1">
           <div class="sticky top-24 space-y-8">
              <PropertyLessorContactCard :lister="property.lister" :property-id="property.id" />
           </div>
        </aside>

      </div>
    </div>
  </div>
</template>