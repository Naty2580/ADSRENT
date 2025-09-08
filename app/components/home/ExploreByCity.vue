<script setup>
import '~/types/api.js';
import { useAsyncData } from '#imports';
import { MapPin, ArrowRight } from 'lucide-vue-next';

// This is a client-side mapping of city names to beautiful placeholder images.
// It's more performant than storing and serving these images from your backend.
// Key names should be lowercase to make matching easier.
const cityImageMap = {
  'addis ababa': "https://images.unsplash.com/photo-https://www.google.com/imgres?q=addis%20ababa%20photo&imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F2155763302%2Fphoto%2Fgrowing-development-of-central-business-district-with-modern-skyscrapers-of-downtown-of-adis.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3Dnwl7KgTITNnrfAlYCl3FCRU8USHBcJs9UztDWehzJGQ%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Faddis-ababa-city&docid=nRo4F338_0EmsM&tbnid=j648c33EPE_zVM&vet=12ahUKEwjZod_mlb-PAxU_U6QEHbaYACIQM3oECBsQAA..i&w=612&h=408&hcb=2&ved=2ahUKEwjZod_mlb-PAxU_U6QEHbaYACIQM3oECBsQAA-48f60103fc96?w=400&h=300&fit=crop",

  'bahir dar': "https://www.google.com/imgres?q=bahirdar%20photo&imgurl=https%3A%2F%2Fwww.shutterstock.com%2Fimage-photo%2Fpanoramic-view-bahir-dar-ethiopia-600nw-1620872395.jpg&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fbahir-dar-city&docid=nXnt0S4SHHtDwM&tbnid=r0c--wMXdgflrM&vet=12ahUKEwj_h7KQlr-PAxUQNPsDHdJHBIwQM3oECBsQAA..i&w=600&h=300&hcb=2&ved=2ahUKEwj_h7KQlr-PAxUQNPsDHdJHBIwQM3oECBsQAA",

  'hawassa': "https://www.google.com/imgres?q=hawasa%20photo&imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D506590428149590&imgrefurl=https%3A%2F%2Fwww.facebook.com%2FInsideafricas%2Fposts%2Fthe-charming-city-of-hawasa-ethiopia-%2F506590734816226%2F&docid=CrQozm2sN8J5FM&tbnid=0w-wufjdkswIpM&vet=12ahUKEwig4LKglr-PAxUBUaQEHfvhKUUQM3oECCEQAA..i&w=739&h=415&hcb=2&ved=2ahUKEwig4LKglr-PAxUBUaQEHfvhKUUQM3oECCEQAA",
  'dire dawa': "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?w=400&h=300&fit=crop",

  'mekelle': "https://www.google.com/imgres?q=mekele%20photo&imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D603479081461903&imgrefurl=https%3A%2F%2Fwww.facebook.com%2FGreatafrica6%2Fposts%2Fmekelle-ethiopia-mekelle-or-mekele-is-the-capital-of-the-tigray-region-of-ethiop%2F603481348128343%2F&docid=wusvYu80tEi39M&tbnid=Y6GqyQqfMYvzfM&vet=12ahUKEwiUh_qtlr-PAxViUaQEHaTgAPAQM3oECB8QAA..i&w=800&h=445&hcb=2&ved=2ahUKEwiUh_qtlr-PAxViUaQEHaTgAPAQM3oECB8QAA",

  'adama': "https://www.google.com/imgres?q=adama%20photo&imgurl=https%3A%2F%2Fportal.adamacity.gov.et%2Fgallery_images%2F1721139717.jpg&imgrefurl=https%3A%2F%2Fportal.adamacity.gov.et%2Fgallery&docid=3S4ACwe1Ipn5CM&tbnid=UYeL4qptZ10WVM&vet=12ahUKEwj8uua5lr-PAxVsVaQEHWQZG3sQM3oECBcQAA..i&w=720&h=408&hcb=2&ved=2ahUKEwj8uua5lr-PAxVsVaQEHWQZG3sQM3oECBcQAA",

  'jimma': 'https://www.google.com/imgres?q=jimma%20photo&imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D1112064650967715&imgrefurl=https%3A%2F%2Fwww.facebook.com%2Fvisitoromia%2Fposts%2Fjimma-is-a-rapidly-growing-city-with-a-bright-future-and-strong-potential-in-tou%2F1112065517634295%2F&docid=pyIbdIvASq18OM&tbnid=tvijNm3AIaJYrM&vet=12ahUKEwi3oaHSlr-PAxXiWqQEHfaYNRUQM3oECBsQAA..i&w=2048&h=1152&hcb=2&ved=2ahUKEwi3oaHSlr-PAxXiWqQEHfaYNRUQM3oECBsQAA',

  'default': "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
};

// --- LIVE API FETCH ---
const { data: cities, pending } = await useAsyncData(
    'topCities',
    async () => {
        const { $api } = useNuxtApp();
        try {
            console.log("Fetching top cities from API...");
            
            /** @type {ApiCity[]} */
            const apiCities = await $api.get('/top-cities');
            
            // Map the API response to the structure our template expects
            return apiCities.map(city => ({
                name: city.address_city,
                region: city.address_region,
                propertyCount: city.property_count,
                image: cityImageMap[city.address_city.toLowerCase()] || cityImageMap.default
            }));

        } catch (error) {
            console.error("Failed to fetch top cities:", error);
            return []; // Return empty array on error to prevent crashing
        }
    }
);

// We need to define `t` as you were using it for i18n placeholders in the old code.
// Your actual i18n setup might be different. This is a simple placeholder.
const t = (key) => key.split('.').pop();
</script>
 
<template>
  <section class="py-20 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div
        v-motion
        :initial="{ y: 50, opacity: 0 }"
        :visible-once="{ y: 0, opacity: 1 }"
        :transition="{ duration: 800 }"
        class="text-center mb-16"
      >
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Explore Cities
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Find properties in one of Ethiopia's vibrant cities
        </p>
      </div>

      <div v-if="pending" class="text-center text-muted-foreground">Loading cities...</div>
      <div v-else-if="!cities || cities.length === 0" class="text-center text-muted-foreground">No city data available.</div>


      <!-- Grid of city cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink
          v-for="(city, index) in cities"
          :key="city.name"
          :to="`/properties?address_city=${city.name}`"
          v-motion
          :initial="{ y: 50, opacity: 0 }"
          :visible-once="{ y: 0, opacity: 1 }"
          :hovered="{ y: -10 }"
          :transition="{ duration: 600, delay: index * 100 }"
          class="group cursor-pointer"
        >
          <div class="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
            <div class="relative h-64 overflow-hidden">
              <img
                :src="city.image"
                :alt="city.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-500" />

              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div class="transform group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
                  <h3 class="text-2xl font-bold mb-1">{{ city.name }}</h3>
                  <div class="flex items-center text-sm text-gray-200 mb-2">
                    <MapPin class="w-4 h-4 mr-1" />
                    <span>{{ city.region }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium">
                      {{ city.propertyCount }} : properties
                    </span>
                    <div class="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                      <ArrowRight class="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-motion
                :initial="{ scale: 0 }"
                :visible-once="{ scale: 1 }"
                :transition="{ delay: index * 100 + 300, type: 'spring', stiffness: 500 }"
                class="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800 dark:text-white"
              >
                {{ city.propertyCount }}+
              </div>
            </div>

            <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </NuxtLink>
      </div>

      <!-- "View all cities" button -->
      <NuxtLink
        v-motion
        :to="`/properties`"
        :initial="{ y: 30, opacity: 0 }"
        :visible-once="{ y: 0, opacity: 1 }"
        :transition="{ duration: 600, delay: 800 }"
        class="text-center mt-12 mx-auto"
      >
        <button class="group bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white px-8 py-4 rounded-full font-medium inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300">
          <span>viewAll</span>
          <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
/* Add any component-specific styles here if needed */
</style>