<script setup>
import { SlidersHorizontal, Search } from 'lucide-vue-next';
import { useSearch } from '~/composables/useSearch';
import { regions, subcities, areas, propertyTypes, bedroomOptions, bathroomOptions, priceOptions } from '~/utils/searchData.js';
import Button from '~/components/ui/Button.vue';
import FormField from '~/components/ui/FormField.vue';

const { filters } = useSearch();

const availableSubcities = computed(() => filters.address_region ? subcities[filters.address_region] || [] : []);
const availableAreas = computed(() => filters.address_subcity ? areas[filters.address_subcity] || [] : []);
watch(() => filters.address_region, () => { filters.address_subcity = ''; filters.address_specific_area = '' });
watch(() => filters.address_subcity, () => { filters.address_specific_area = '' });

function resetFilters() {
    const status = filters.listing_type;
    // Get all keys from filters
    const keys = Object.keys(filters);
    // Reset each key to a default empty/base state
    keys.forEach(key => {
        if (key === 'is_furnished') filters[key] = false;
        else if (['bedrooms', 'bathrooms'].includes(key)) filters[key] = 'any';
        else if (key === 'property_type') filters[key] = 'all';
        else if (key !== 'listing_type') filters[key] = '';
    });
    filters.listing_type = status;
}
</script>

<template>
  <aside class="w-full bg-card p-6 rounded-xl shadow-lg border space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between pb-4 border-b">
       <h3 class="font-display text-xl font-bold">Search Filters</h3>
       <SlidersHorizontal class="h-5 w-5 text-primary" />
    </div>

    <!-- Keyword Search -->
    <FormField>
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input v-model="filters.keywords" type="text" placeholder="Keyword..." class="form-input pl-9">
        </div>
    </FormField>

    <!-- Rent/Sale Toggle -->
    <div>
      <div class="flex space-x-1 rounded-md bg-secondary p-1">
        <button type="button" @click="filters.listing_type = 'rent'" :class="['w-full rounded py-1.5 text-sm font-medium', filters.listing_type === 'rent' ? 'bg-background shadow' : 'hover:bg-background/50']">For Rent</button>
        <button type="button" @click="filters.listing_type = 'sale'" :class="['w-full rounded py-1.5 text-sm font-medium', filters.listing_type === 'sale' ? 'bg-background shadow' : 'hover:bg-background/50']">For Sale</button>
      </div>
    </div>
    
    <!-- Section: Location -->
    <div class="space-y-4 pt-4 border-t">
        <h4 class="font-semibold text-muted-foreground">Location</h4>
        <FormField label="Region"><select v-model="filters.address_region" class="form-input"><option value="">All Regions</option><option v-for="r in regions" :key="r.value" :value="r.value">{{ r.label }}</option></select></FormField>
        <FormField label="Sub-City"><select v-model="filters.address_subcity" :disabled="!filters.address_region" class="form-input"><option value="">All Sub-Cities</option><option v-for="s in availableSubcities" :key="s.value" :value="s.value">{{ s.label }}</option></select></FormField>
        <FormField label="Area/Woreda"><select v-model="filters.address_specific_area" :disabled="!filters.address_subcity" class="form-input"><option value="">All Areas</option><option v-for="a in availableAreas" :key="a.value" :value="a.value">{{ a.label }}</option></select></FormField>
    </div>
    
    <!-- Section: Property Details -->
    <div class="space-y-4 pt-4 border-t">
      <h4 class="font-semibold text-muted-foreground">Property Details</h4>
      <FormField label="Property Type"><select v-model="filters.property_type" class="form-input capitalize"><option value="all">All Types</option><option v-for="t in propertyTypes" :key="t.value" :value="t.value">{{ t.label }}</option></select></FormField>
      <div class="grid grid-cols-2 gap-2">
         <FormField label="Min Price"><select v-model="filters.min_price" class="form-input"><option value="">Any</option><option v-for="p in priceOptions[filters.listing_type].min" :key="p.value" :value="p.value">{{ p.label }}</option></select></FormField>
         <FormField label="Max Price"><select v-model="filters.max_price" class="form-input"><option value="">Any</option><option v-for="p in priceOptions[filters.listing_type].max" :key="p.value" :value="p.value">{{ p.label }}</option></select></FormField>
         <FormField label="Min Area (m²)"><input v-model.number="filters.min_area" type="number" placeholder="Any" class="form-input"/></FormField>
         <FormField label="Max Area (m²)"><input v-model.number="filters.max_area" type="number" placeholder="Any" class="form-input"/></FormField>
         <FormField label="Bedrooms"><select v-model="filters.bedrooms" class="form-input"><option v-for="b in bedroomOptions" :key="b.value" :value="b.value">{{ b.label }}</option></select></FormField>
         <FormField label="Bathrooms"><select v-model="filters.bathrooms" class="form-input"><option v-for="b in bathroomOptions" :key="b.value" :value="b.value">{{ b.label }}</option></select></FormField>
      </div>
       <div class="flex items-center justify-between pt-2">
         <label for="furnished-check" class="font-medium text-foreground">Furnished</label>
         <input id="furnished-check" type="checkbox" v-model="filters.is_furnished" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"/>
       </div>
    </div>

     <!-- Actions -->
     <div class="pt-4 border-t">
       <Button variant="ghost" @click="resetFilters" class="w-full text-destructive hover:text-destructive hover:bg-destructive/10">Reset All Filters</Button>
     </div>
  </aside>
</template>

<style scoped>
.form-input { @apply h-10 block w-full rounded-md border-0 bg-secondary py-1.5 px-3 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6; }
</style>