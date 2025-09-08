<script setup>
import { propertyLinks } from '~/utils/navigationData.js';
import { ArrowRight } from 'lucide-vue-next';

defineProps({
    listingType: { type: String, required: true, default: 'rent' }
});
</script>

<template>
  <div class="grid grid-cols-3 gap-6 bg-white/90 backdrop-blur-md rounded-lg p-6">
      <!-- Left side: Links -->
      <div class="col-span-2 grid grid-cols-2 gap-x-6 gap-y-4 ">
        <div v-for="group in propertyLinks" :key="group.category">
          <h3 class="font-semibold text-foreground mb-3">{{ group.category }}</h3>
          <ul class="space-y-2">
            <li v-for="link in group.links" :key="link.name">
              <NuxtLink :to="`${link.to}&listing_type=${listingType}`"
                class="flex items-center gap-3 p-2 rounded-md transition-colors hover:bg-muted"
              >
                <component :is="link.icon" class="h-5 w-5 text-primary flex-shrink-0"/>
                <span class="text-sm font-medium text-muted-foreground group-hover:text-foreground">{{ link.name }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Right side: Promotional Image -->
      <div class="col-span-1">
          <NuxtLink :to="`/properties?listing_type=${listingType}`" class="block relative h-full w-full rounded-lg overflow-hidden group">
             <img src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800" class="absolute h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"/>
             <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
             <div class="relative h-full flex flex-col justify-end p-4 text-white">
                <h4 class="font-bold text-lg">View All Properties</h4>
                <p class="text-sm opacity-90 mb-2">Explore our full catalog for {{ listingType }}</p>
                <div class="flex items-center text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                  <span>Explore Now</span>
                  <ArrowRight class="w-4 h-4 ml-1" />
                </div>
             </div>
          </NuxtLink>
      </div>
  </div>
</template>