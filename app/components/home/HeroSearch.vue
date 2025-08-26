<script setup>
import { reactive, ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Search, MapPin, Building2, DollarSign, Bed, Filter, ChevronDown, X } from 'lucide-vue-next';
import Button from '~/components/ui/Button.vue';
import { regions, subcities, propertyTypes, bedroomOptions, bathroomOptions, priceOptions } from '~/utils/searchData.js';
import FormField from '../ui/FormField.vue';


const router = useRouter();
const showMoreFilters = ref(false);

// Local reactive state for the form. This will NOT be connected to `useSearch`.
// We only want to update the URL when the user explicitly clicks "Search".
const form = reactive({
  listingType: 'rent',
  keyword: '',
  region: '',
  subcity: '',
  propertyType: '',
  minPrice: '',
  maxPrice: '',
  bedrooms: '',
  bathrooms: '',
  minArea: '', 
  maxArea: '',
  isFurnished: false,
});

// Watch for changes to create dependent dropdowns
const availableSubcities = computed(() => form.region ? subcities[form.region] || [] : []);
watch(() => form.region, () => { form.subcity = ''; });
watch(() => form.listingType, () => { form.minPrice = ''; form.maxPrice = ''; });

// Construct the URL and navigate on search
function handleSearch() {
  const query = {};
  for (const [key, value] of Object.entries(form)) {
    if (value && value !== 'all' && (typeof value !== 'boolean' || value === true)) {
      query[key] = value;
    }
  }
  router.push({ path: '/properties', query });
}

function clearFilters() {
    const status = form.listingType;
    Object.assign(form, {
      listingType: 'rent', keyword: '', region: '', subcity: '', propertyType: '',
      minPrice: '', maxPrice: '', bedrooms: '', bathrooms: '',
      minArea: '', maxArea: '', isFurnished: false,
    });
    form.listingType = status;
}

const activeFiltersCount = computed(() => {
  return Object.entries(form).filter(([key, value]) => {
        // Exclude listingType from count unless it's explicitly part of the document requirement
        if (key === 'listingType') return false; 
        if (typeof value === 'boolean') return value === true;
        return !!value;
    }).length;
});
</script>

<template>
  <div class="relative w-full h-auto min-h-[550px] md:h-[600px] flex items-center justify-center rounded-lg overflow-hidden py-12">
    <!-- Background Image -->
    <div class="absolute inset-0">
       <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" 
           alt="Modern house exterior" 
           class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/60"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 w-full max-w-5xl mx-auto px-4 text-center">
      <h1 class="font-display text-4xl md:text-6xl font-bold tracking-tight text-white">
        Find Your Next Home in Addis
      </h1>
      <p class="mt-4 md:mt-6 max-w-2xl text-lg text-white/90 mx-auto">
        Discover apartments, villas, and houses for rent and sale.
      </p>

      <div class="mt-8 md:mt-10 p-4 bg-background/90 backdrop-blur-sm rounded-xl shadow-2xl w-full">
         <form @submit.prevent="handleSearch" class="space-y-4">
            <!-- Rent/Sale Toggle -->
            <div class="flex justify-center p-1 bg-secondary rounded-lg w-fit mx-auto">
               <button type="button" @click="form.listingType = 'rent'" :class="['px-6 py-1.5 rounded-md text-sm font-medium', form.listingType === 'rent' ? 'bg-background shadow' : 'text-muted-foreground']">For Rent</button>
               <button type="button" @click="form.listingType = 'sale'" :class="['px-6 py-1.5 rounded-md text-sm font-medium', form.listingType === 'sale' ? 'bg-background shadow' : 'text-muted-foreground']">For Sale</button>
            </div>
            
            <!-- Main Filters -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2">
                <div class="relative lg:col-span-6">
                    <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input v-model="form.keyword" type="text" placeholder="Search by keyword, neighborhood, etc..." class="w-full form-input pl-10 h-12"/>
                </div>
                <select v-model="form.region" class="lg:col-span-3 form-input h-12">
                    <option value="">Select Region</option>
                    <option v-for="r in regions" :key="r.value" :value="r.value">{{ r.label }}</option>
                </select>
                <select v-model="form.subcity" :disabled="!form.region" class="lg:col-span-3 form-input h-12">
                     <option value="">Select Sub-City</option>
                    <option v-for="s in availableSubcities" :key="s.value" :value="s.value">{{ s.label }}</option>
                </select>
            </div>
            
            <!-- Collapsible "More Filters" -->
            <div v-if="showMoreFilters" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-2">
                <select v-model="form.propertyType" class="form-input h-12"><option value="">Property Type</option><option v-for="pt in propertyTypes" :key="pt.value" :value="pt.value">{{ pt.label }}</option></select>
                <select v-model="form.minPrice" class="form-input h-12"><option v-for="p in priceOptions[form.listingType]" :key="p.value" :value="p.value">{{ p.label }}</option></select>
                <select v-model="form.maxPrice" class="form-input h-12"><option value="">Max Price</option><option v-for="p in priceOptions[form.listingType].max" :key="p.value" :value="p.value">{{ p.label }}</option></select>

                <select v-model="form.bedrooms" class="form-input h-12"><option v-for="b in bedroomOptions" :key="b.value" :value="b.value">{{ b.label }}</option></select>
                <select v-model="form.bathrooms" class="form-input h-12"><option value="">Bathrooms</option><option v-for="b in bathroomOptions" :key="b.value" :value="b.value">{{ b.label }}</option></select>

                <input v-model.number="form.minArea" type="number" placeholder="Min Area (m²)" class="form-input h-12"/>
                <input v-model.number="form.maxArea" type="number" placeholder="Max Area (m²)" class="form-input h-12"/>
                <div class="flex items-center justify-center bg-secondary rounded-md h-12 p-2">
                  <FormField label="Furnished" class="flex items-center space-x-2">
                    <input type="checkbox" v-model="form.isFurnished" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"/>
                  </FormField>
                </div>
                

            </div>
            
            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-2">
               <Button type="submit" size="lg" class="w-full h-12 sm:w-auto flex-grow"><Search class="h-5 w-5 mr-2"/> Search Properties</Button>
               <Button type="button" variant="outline" size="lg" @click="showMoreFilters = !showMoreFilters" class="h-12">
                   <Filter class="h-5 w-5 mr-2" />
                   <span>{{ showMoreFilters ? 'Less' : 'More' }} Filters</span>
                   <ChevronDown :class="['h-4 w-4 ml-2 transition-transform', { 'rotate-180': showMoreFilters }]" />
                </Button>
                <Button v-if="activeFiltersCount > 0" type="button" variant="ghost" size="lg" @click="clearFilters" class="h-12 text-destructive hover:bg-destructive/10 hover:text-destructive">
                   <X class="h-5 w-5 mr-2"/>
                   Clear ({{ activeFiltersCount }})
                </Button>
            </div>

         </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-input { @apply block w-full rounded-md border-0 bg-secondary py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6; }
</style> 