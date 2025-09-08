<script setup>
import '~/types/api.js';
import { useCurrencyStore } from '~/stores/currency';
import get from 'lodash-es/get';


const props = defineProps({
  ids: { type: Array, required: true },
});

const currencyStore = useCurrencyStore();


// Fetch full property data for the selected IDs
const { data: propertiesResult, pending } = useAsyncData(`compare-${props.ids.join('-')}`,
  () => {
    if (!props.ids || props.ids.length === 0) return [];
    const { $api } = useNuxtApp();
    console.log(`Fetching properties for comparison with IDs: ${props.ids.join(',')}`);
    
    // We call our flexible search endpoint with the `ids` parameter
    return $api.get(`/property-search`, { 
      params: { 
        ids: props.ids.join(',') 
      }
    });
  }
);
const properties = computed(() => propertiesResult.value?.data || []);

console.log('properties' , properties);

const features = [
    { label: 'Price', key: 'price.rawAmount' },
    { label: 'Listing Type', key: 'listing_type' },
    { label: 'Property Type', key: 'property_type' },
    { label: 'Bedrooms', key: 'bedrooms' },
    { label: 'Bathrooms', key: 'bathrooms' },
    { label: 'Area (m²)', key: 'area' },
    { label: 'Furnished', key: 'isFurnished' },
];

function getFeatureValue(prop, feature) {
  // Use `get` from lodash to safely access nested keys like 'price.raw'
  const value = get(prop, feature.key, '-'); 
  
  if (feature.key === 'price.raw') {
    return currencyStore.convert(value).amount;
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  if (value === null || value === undefined) {
      return '-';
  }
  
  // Capitalize first letter for display
  return value.toString().charAt(0).toUpperCase() + value.slice(1);
} 

</script>

<template>
  <div v-if="pending" class="flex items-center justify-center h-full">
    <p class="text-muted-foreground">Loading comparison data...</p>
  </div>
  <div v-else-if="properties" class="grid grid-cols-1 md:grid-cols-5 h-full">
     
     <!-- Feature Labels Column (Vertical Headers) -->
     <aside class="hidden md:block col-span-1 border-r">
        <!-- Image Spacer -->
        <div class="h-48 border-b"></div>
        <!-- Feature labels -->
        <div v-for="feature in features" :key="feature.key" class="p-4 border-b font-semibold text-muted-foreground">
             {{ feature.label }}
        </div>
     </aside>
     
     <!-- Property Columns -->
     <div class="col-span-1 md:col-span-4 grid" :class="`grid-cols-${properties.length}`">
         <div v-for="prop in properties" :key="prop.id" class="border-r last:border-r-0">
             <!-- Property Image and Title -->
              <div class="h-48 p-4 border-b">
                 <img :src="prop.media?.[0]?.url" alt="Property Image" class="object-cover w-full h-full rounded-md bg-secondary"/>
              </div>
               <div class="p-4 border-b">
                 <NuxtLink :to="`/properties/${prop.id}`" class="font-bold hover:text-primary transition-colors">
                    {{ prop.title }}
                </NuxtLink>
              </div>

              <!-- Feature values for this property -->
              <div v-for="feature in features" :key="feature.key" class="p-4 border-b flex justify-between md:block">
                 <strong class="md:hidden text-muted-foreground">{{ feature.label }}</strong>
                 <span>{{ getFeatureValue(prop, feature) }}</span>
              </div>
         </div>
     </div>
  </div>
</template>