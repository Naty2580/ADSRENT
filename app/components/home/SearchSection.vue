<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Search, MapPin, Building2, DollarSign, Bed, Bath, Maximize, X, Filter, ChevronDown } from 'lucide-vue-next';

import { regions, subcities, areas, propertyTypes, priceRanges, bedroomOptions, bathroomOptions, heroImages } from '~/utils/searchData.js';

const currentImageIndex = ref(0);
const router = useRouter();
const showMoreFilters = ref(false);

const form = reactive({
  searchQuery: "",
  selectedStatus: "rent",
  selectedRegion: "",
  selectedSubcity: "",
  selectedArea: "",
  selectedPropertyType: "",
  minPrice: "",
  maxPrice: "",
  minArea: "",
  maxArea: "",
  bedrooms: "",
  bathrooms: "",
  isFurnished: false,
});

const availableSubcities = computed(() => subcities[form.selectedRegion] || []);
const availableAreas = computed(() => areas[form.selectedSubcity] || []);

watch(() => form.selectedRegion, () => {
  form.selectedSubcity = "";
  form.selectedArea = "";
});
watch(() => form.selectedSubcity, () => { form.selectedArea = ""; });
watch(() => form.selectedStatus, () => { form.minPrice = ""; form.maxPrice = ""; });

onMounted(() => {
  const interval = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % heroImages.length;
  }, 4000);
  onUnmounted(() => clearInterval(interval));
});

function handleSearch() {
  // 1. Create a clean query object for the backend.
  const queryParams = {};

  // 2. Map frontend names to backend names.
  if (form.selectedStatus) queryParams.listing_type = form.selectedStatus === 'buy' ? 'sale' : form.selectedStatus;
  if (form.selectedRegion) queryParams.address_region = form.selectedRegion;
  if (form.selectedSubcity) queryParams.address_subcity = form.selectedSubcity;
  if (form.selectedArea) queryParams.address_specific_area = form.selectedArea;
  if (form.selectedPropertyType && form.selectedPropertyType !== 'all') queryParams.property_type = form.selectedPropertyType;
  if (form.minPrice) queryParams.min_price = form.minPrice;
  if (form.maxPrice) queryParams.max_price = form.maxPrice;
  if (form.minArea) queryParams.min_area = form.minArea;
  if (form.maxArea) queryParams.max_area = form.maxArea;
  if (form.bedrooms && form.bedrooms !== 'any') queryParams.bedrooms = form.bedrooms;
  if (form.bathrooms && form.bathrooms !== 'any') queryParams.bathrooms = form.bathrooms;
  if (form.isFurnished) queryParams.is_furnished = form.isFurnished;
  if (form.searchQuery) queryParams.keywords = form.searchQuery;

  // 3. Navigate to the properties page with the correct query string.
  router.push({ 
    path: '/properties', 
    query: queryParams 
  });
}



 
const clearAllFilters = () => {
  const status = form.selectedStatus;
  Object.assign(form, {
    searchQuery: "",
    selectedRegion: "",
    selectedSubcity: "",
    selectedArea: "",
    selectedPropertyType: "",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
    bedrooms: "",
    bathrooms: "",
    isFurnished: false,
  });
  form.selectedStatus = status;
};

const activeFiltersCount = computed(() =>
  Object.entries(form).filter(([key, value]) => {
    if (key === 'selectedStatus') return false;
    if (typeof value === 'boolean') return value === true;
    return !!value;
  }).length
);
</script>

<template>
 <section class="relative min-h-[800px] md:min-h-screen flex items-center justify-center pt-48 pb-2 overflow-hidden">
    <!-- Background Image & Overlay -->
    <div class="absolute inset-0">
      <TransitionGroup name="fade">
        <div v-for="(image, index) in heroImages" :key="image.url">
          <div v-if="index === currentImageIndex" class="absolute inset-0">
            <img :src="image.url" :alt="image.alt" class="w-full h-full object-cover"/>
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          </div>
        </div>
      </TransitionGroup>
    </div>
 
    <!-- Content -->
    <div class="relative z-10 pt-48   container mx-auto px-4 w-full ">
      
        <!-- Hero Text -->
        <div class="absolute  top-[18vh]  left-1/2 -translate-x-1/2 text-center w-full px-4">
          <h1 class="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-xl">
            Find Your Perfect <span class="text-orange-400">Home</span>
          </h1>
          <p class="text-lg md:text-xl text-white/90 drop-shadow-lg">
            The key to your future home is just a click away.
          </p>
        </div>

        <!-- Search UiCard -->
        <div class="   max-w-6xl mx-auto">
        <UiCard class="shadow-2xl bg-white/75 dark:bg-gray-900/90 backdrop-blur-lg dark:border dark:border-gray-700 mt-12 px-8 ">
          <UiCardContent class="p-4 sm:p-6">
            <form @submit.prevent="handleSearch" class="space-y-3">

              <!-- Rent/Buy Toggle -->
              <!-- <div class="flex justify-center">
                <div class="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl inline-flex">
                  <UiButton type="button" @click="form.selectedStatus = 'rent'" :variant="form.selectedStatus === 'rent' ? 'default' : 'ghost'" class="dark:text-white">For Rent</UiButton>
                  <UiButton type="button" @click="form.selectedStatus = 'buy'" :variant="form.selectedStatus === 'buy' ? 'default' : 'ghost'" class="dark:text-white">For Sale</UiButton>
                </div>
              </div> -->
              
              <div class="flex flex-col sm:flex-row gap-2">
                 <!-- Main Search Input -->
                <div class="relative flex-grow">
                  <Search class="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                  <UiInput v-model="form.searchQuery" type="text" placeholder="Enter a keyword, neighborhood, or city..." class="h-14 pl-12 text-lg"/>
                </div>

                <!-- Main Search Button -->
                <UiButton type="submit" size="lg" class="w-full sm:w-auto h-14">
                    <Search class="w-5 h-5 mr-2" />
                    <span>Search</span>
                </UiButton>
              </div>


              <!-- Search UiInput -->
              <!-- <div class="relative">
                <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                <UiInput v-model="form.searchQuery" type="text" placeholder="Search properties..." class="pl-12 h-14 text-lg"/>
              </div> -->

              <UiCollapsible v-model:open="showMoreFilters">
              

                <!-- UiCollapsible Content -->
                <UiCollapsibleContent class="pt-4 space-y-4">

                  <div class="p-1 rounded-lg bg-secondary inline-flex">
                    <UiButton type="button" @click="form.selectedStatus = 'rent'" :variant="form.selectedStatus === 'rent' ? 'default' : 'ghost'" size="sm">For Rent</UiButton>
                    <UiButton type="button" @click="form.selectedStatus = 'buy'" :variant="form.selectedStatus === 'buy' ? 'default' : 'ghost'" size="sm">For Sale</UiButton>
                  </div>


                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div class="space-y-1.5">
                    <UiLabel class="dark:text-gray-300"><MapPin class="size-4 mr-1 inline"/>Region</UiLabel>
                    <UiSelect v-model="form.selectedRegion">
                      <UiSelectTrigger><UiSelectValue placeholder="Select Region" /></UiSelectTrigger>
                      <UiSelectContent>
                        <UiSelectItem v-for="r in regions" :key="r.value" :value="r.value">{{ r.label }}</UiSelectItem>
                      </UiSelectContent>
                    </UiSelect>
                  </div>

                  <div class="space-y-1.5">
                     <UiLabel class="dark:text-gray-300">Subcity</UiLabel>
                     <UiSelect v-model="form.selectedSubcity" :disabled="!form.selectedRegion">
                       <UiSelectTrigger><UiSelectValue placeholder="Select Subcity" /></UiSelectTrigger>
                       <UiSelectContent class="max-h-60">
                         <UiSelectItem v-for="s in availableSubcities" :key="s.value" :value="s.value">{{ s.label }}</UiSelectItem>
                       </UiSelectContent>
                     </UiSelect>
                  </div>

                  <div class="space-y-1.5">
                    <UiLabel class="dark:text-gray-300"><Building2 class="size-4 mr-1 inline"/>Property Type</UiLabel>
                    <UiSelect v-model="form.selectedPropertyType">
                      <UiSelectTrigger><UiSelectValue placeholder="Select Property Type" /></UiSelectTrigger>
                      <UiSelectContent class="max-h-60">
                        <UiSelectItem v-for="pt in propertyTypes" :key="pt.value" :value="pt.value">{{ pt.label }}</UiSelectItem>
                      </UiSelectContent>
                    </UiSelect>
                  </div>

                  <div class="space-y-1.5">
                    <UiLabel class="dark:text-gray-300"><DollarSign class="size-4 mr-1 inline"/>Min Price</UiLabel>
                    <UiSelect v-model="form.minPrice">
                      <UiSelectTrigger><UiSelectValue placeholder="Min Price" /></UiSelectTrigger>
                      <UiSelectContent class="max-h-60">
                        <UiSelectItem v-for="p in priceRanges[form.selectedStatus].min" :key="p.value" :value="p.value">{{ p.label }}</UiSelectItem>
                      </UiSelectContent>
                    </UiSelect>
                  </div>

                  <div class="space-y-1.5">
                    <UiLabel class="dark:text-gray-300"><DollarSign class="size-4 mr-1 inline"/>Max Price</UiLabel>
                    <UiSelect v-model="form.maxPrice">
                      <UiSelectTrigger><UiSelectValue placeholder="Max Price" /></UiSelectTrigger>
                      <UiSelectContent class="max-h-60">
                        <UiSelectItem v-for="p in priceRanges[form.selectedStatus].max" :key="p.value" :value="p.value">{{ p.label }}</UiSelectItem>
                      </UiSelectContent>
                    </UiSelect>
                  </div>

                    <div class="space-y-1.5">
                       <UiLabel class="dark:text-gray-300">Area</UiLabel>
                       <UiSelect v-model="form.selectedArea" :disabled="!form.selectedSubcity">
                         <UiSelectTrigger><UiSelectValue placeholder="Select Area" /></UiSelectTrigger>
                         <UiSelectContent class="max-h-60">
                           <UiSelectItem v-for="a in availableAreas" :key="a.value" :value="a.value">{{ a.label }}</UiSelectItem>
                         </UiSelectContent>
                       </UiSelect>
                    </div>
                    <div class="space-y-1.5">
                      <UiLabel class="dark:text-gray-300"><Bed class="size-4 mr-1 inline"/>Bedrooms</UiLabel>
                      <UiSelect v-model="form.bedrooms">
                        <UiSelectTrigger><UiSelectValue placeholder="Bedrooms" /></UiSelectTrigger>
                        <UiSelectContent>
                          <UiSelectItem v-for="b in bedroomOptions" :key="b.value" :value="b.value">{{ b.label }}</UiSelectItem>
                        </UiSelectContent>
                      </UiSelect>
                    </div>
                     <div class="space-y-1.5">
                      <UiLabel class="dark:text-gray-300"><Bath class="size-4 mr-1 inline"/>Bathrooms</UiLabel>
                      <UiSelect v-model="form.bathrooms">
                        <UiSelectTrigger><UiSelectValue placeholder="Bathrooms" /></UiSelectTrigger>
                        <UiSelectContent>
                          <UiSelectItem v-for="b in bathroomOptions" :key="b.value" :value="b.value">{{ b.label }}</UiSelectItem>
                        </UiSelectContent>
                      </UiSelect>
                    </div>
                    <div class="space-y-1.5">
                      <UiLabel class="dark:text-gray-300"><Maximize class="size-4 mr-1 inline"/>Min Area (m²)</UiLabel>
                      <UiInput v-model="form.minArea" type="number" placeholder="Min Area" />
                    </div>
                    <div class="space-y-1.5">
                      <UiLabel class="dark:text-gray-300"><Maximize class="size-4 mr-1 inline"/>Max Area (m²)</UiLabel>
                      <UiInput v-model="form.maxArea" type="number" placeholder="Max Area" />
                    </div>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <UiLabel for="furnished-switch" class="dark:text-gray-300">Furnished</UiLabel>
                    <UiSwitch id="furnished-switch" v-model:checked="form.isFurnished" />
                  </div>
                </UiCollapsibleContent>

                <!-- Action Buttons -->
                <div class="flex items-center justify-between pt-4 mt-4 border-t">
                  <!-- <UiButton type="submit" size="lg" class="w-full h-14 flex-1">
                    <Search class="size-5 mr-2" /> Search Properties
                  </UiButton> -->
                  <UiCollapsibleTrigger as-child>
                    <UiButton type="button" @click="" variant="link" size="lg" class="p-0">
                      <Filter class="w-4 h-4 mr-2" />
                      <span>{{ showMoreFilters ? ' Less Filters' : ' More Filters' }}</span>
                      <ChevronDown :class="['size-4 ml-2 transition-transform', showMoreFilters && 'rotate-180']" />
                    </UiButton>
                  </UiCollapsibleTrigger>

                  <UiButton v-if="activeFiltersCount > 0" type="button" variant="ghost" size="lg" @click="clearAllFilters" class="h-14 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400">
                    <X class="size-5 mr-2" /> Clear ({{ activeFiltersCount }})
                  </UiButton>
                </div>

              </UiCollapsible>
            </form>
          </UiCardContent> 
        </UiCard>
        </div>
      
    </div>

  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.2s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
 