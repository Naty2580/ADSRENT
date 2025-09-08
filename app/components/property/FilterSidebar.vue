<script setup>
import { SlidersHorizontal } from 'lucide-vue-next';
import { useSearch } from '~/composables/useSearch';
import { regions, subcities, areas, propertyTypes, bedroomOptions, bathroomOptions, priceOptions } from '~/utils/searchData.js';
import Button from '~/components/ui/Button.vue';
import FormField from '~/components/ui/FormField.vue';

// The sidebar now gets its state from our upgraded composable
const { filters } = useSearch();

const availableSubcities = computed(() => filters.address_region ? subcities[filters.address_region] || [] : []);
watch(() => filters.address_region, () => { filters.address_subcity = ''; });

</script>

<template>
  <aside class="w-full bg-card p-6 rounded-lg shadow-md border space-y-6">
    <div class="flex items-center justify-between pb-4 border-b">
       <h3 class="font-display text-xl font-semibold">Filters</h3>
       <SlidersHorizontal class="h-5 w-5 text-primary" />
    </div>

    <!-- Keyword -->
    <FormField label="Keyword">
      <input v-model="filters.keywords" type="text" placeholder="e.g. Garden, CMC" class="form-input">
    </FormField>

    <!-- Listing Type -->
    <div>
      <div class="flex space-x-2 rounded-md bg-secondary p-1">
        <button type="button" @click="filters.listing_type = 'rent'" :class="['w-full rounded py-1.5 text-sm font-medium', filters.listing_type === 'rent' ? 'bg-background shadow' : 'hover:bg-background/50']">For Rent</button>
        <button type="button" @click="filters.listing_type = 'sale'" :class="['w-full rounded py-1.5 text-sm font-medium', filters.listing_type === 'sale' ? 'bg-background shadow' : 'hover:bg-background/50']">For Sale</button>
      </div>
    </div>
    
    <!-- Location -->
    <FormField label="Region"><select v-model="filters.address_region" class="form-input"><option value="">All Regions</option><option v-for="r in regions" :key="r.value" :value="r.value">{{ r.label }}</option></select></FormField>
    <FormField label="Sub-City"><select v-model="filters.address_subcity" :disabled="!filters.address_region" class="form-input"><option value="">All Sub-Cities</option><option v-for="s in availableSubcities" :key="s.value" :value="s.value">{{ s.label }}</option></select></FormField>
    
    <!-- Property -->
    <FormField label="Property Type"><select v-model="filters.property_type" class="form-input capitalize"><option value="all">All Types</option><option v-for="t in propertyTypes" :key="t.value" :value="t.value">{{ t.label }}</option></select></FormField>

    <!-- Price Range -->
    <div class="grid grid-cols-2 gap-2">
       <FormField label="Min Price"><select v-model="filters.min_price" class="form-input"><option v-for="p in priceOptions[filters.listing_type].min" :key="p.value" :value="p.value">{{ p.label }}</option></select></FormField>
       <FormField label="Max Price"><select v-model="filters.max_price" class="form-input"><option v-for="p in priceOptions[filters.listing_type].max" :key="p.value" :value="p.value">{{ p.label }}</option></select></FormField>
    </div>

    <!-- Beds & Baths -->
     <div class="grid grid-cols-2 gap-2">
        <FormField label="Bedrooms"><select v-model="filters.bedrooms" class="form-input"><option v-for="b in bedroomOptions" :key="b.value" :value="b.value">{{ b.label }}</option></select></FormField>
        <FormField label="Bathrooms"><select v-model="filters.bathrooms" class="form-input"><option v-for="b in bathroomOptions" :key="b.value" :value="b.value">{{ b.label }}</option></select></FormField>
     </div>
     
     <!-- Furnished -->
     <div class="flex items-center justify-between pt-4 border-t">
       <label for="furnished-check" class="font-medium text-foreground">Furnished</label>
       <input id="furnished-check" type="checkbox" v-model="filters.is_furnished" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"/>
     </div>
  </aside>
</template>

<style scoped>
.form-input { @apply block w-full rounded-md border-0 bg-secondary py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6; }
</style>