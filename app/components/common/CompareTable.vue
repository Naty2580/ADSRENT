<script setup>
import '~/types/api.js';

const props = defineProps({
  ids: { type: Array, required: true },
});

// Fetch full property data for the selected IDs
// const { data: properties, pending } = useAsyncData(`compare-${props.ids.join('-')}`,
//   () => {
//     if (!props.ids || props.ids.length === 0) return [];
//     // This assumes your API supports fetching multiple properties by IDs
//     return $fetch(`/api/properties`, { params: { ids: props.ids.join(',') } });
//   }
// );

const allProperties = ref([
  { id: 1, title: 'Spacious Villa with Garden', listingType: 'rent', price: { amount: '85,000.00', raw: 85000, currency: 'ETB' }, location: { specificArea: 'Bole', city: 'Addis Ababa' }, bedrooms: 4, bathrooms: 5, area: 300, media: [{ id: 1, url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070', type: 'image'}] },
  { id: 2, title: 'Modern Apartment in CMC', listingType: 'sale', price: { amount: '12,500,000.00', raw: 12500000, currency: 'ETB' }, location: { specificArea: 'CMC', city: 'Addis Ababa' }, bedrooms: 3, bathrooms: 2, area: 150, media: [{ id: 2, url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070', type: 'image'}] },
  { id: 3, title: 'Cozy Guesthouse in Kazanchis', listingType: 'rent', price: { amount: '45,000.00', raw: 45000, currency: 'ETB' }, location: { specificArea: 'Kazanchis', city: 'Addis Ababa' }, bedrooms: 2, bathrooms: 2, area: 120, media: [{ id: 3, url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070', type: 'image'}] },
  { id: 4, title: 'Luxury Condominium with Pool', listingType: 'sale', price: { amount: '25,000,000.00', raw: 25000000, currency: 'ETB' }, location: { specificArea: 'Old Airport', city: 'Addis Ababa' }, bedrooms: 4, bathrooms: 4, area: 280, media: [{ id: 4, url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974', type: 'image'}] },
]);

// filter the above properties using the prop ids
const properties = computed(() => {
  return allProperties.value.filter(prop => props.ids.includes(prop.id));
});


const features = [
    { label: 'Price', key: 'price.raw' },
    { label: 'Type', key: 'propertyType' },
    { label: 'Bedrooms', key: 'bedrooms' },
    { label: 'Bathrooms', key: 'bathrooms' },
    { label: 'Area (m²)', key: 'area' },
];
</script>

<template>
  <div v-if="pending">Loading...</div>
  <div v-else-if="properties" class="grid grid-cols-1 md:grid-cols-5 h-full">
     <!-- Feature Labels Column -->
      
     <div class="hidden md:block col-span-1 border-r p-4">
         <div class="h-32 mb-4"><!-- Spacer for image --></div>
         <div v-for="feature in features" :key="feature.key" class="py-3 font-semibold text-muted-foreground">
             {{ feature.label }}
         </div>
     </div>
     
     <!-- Property Columns -->
     <div class="col-span-1 md:col-span-4 grid  " :class="`grid-cols-4`">
         <div v-for="prop in properties" :key="prop.id" class="  p-4 border-r">
              <img :src="prop.media[0].url" class="aspect-video object-cover rounded-md h-32 w-64"/>
              <h3 class="font-bold mt-4">{{ prop.title }}</h3>
              
              <div v-for="feature in features" :key="feature.key" class="py-3 border-b md:border-none">
                 <strong class="md:hidden">{{ feature.label }}: </strong>
                 <span>{{ prop[feature.key] }}</span> <!-- This needs more refined access for nested keys -->
              </div>
         </div>
     </div>
  </div>
</template>