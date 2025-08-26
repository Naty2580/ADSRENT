<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, watch } from 'vue';


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
  const query = {};
  for (const [key, value] of Object.entries(form)) {
    if (value && value !== 'all' && (typeof value !== 'boolean' || value === true)) {
      query[key] = value;
    }
  }
  router.push({ path: '/properties', query });
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
  <section class="relative min-h-[600px] pt-20 overflow-hidden ">
    <!-- Background Image & Overlay -->
    <div class="absolute inset-0">
      <TransitionGroup name="fade">
        <div v-for="(image, index) in heroImages" :key="image.url">
          <div v-if="index === currentImageIndex" class="absolute inset-0">
            <img :src="image.url" :alt="image.alt" class="w-full h-full object-cover"/>
            <div class="absolute inset-0 bg-black/50"></div>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- Content -->
    <div class="relative z-10 container mx-auto px-4 py-12 ">
      <div class="max-w-6xl mx-auto">
        <!-- Hero Text -->
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
            Find Your Perfect Property
          </h1>
          <p class="text-xl md:text-2xl text-white/90 mb-8">
            Discover homes, apartments, and commercial spaces tailored for you.
          </p>
        </div>

        <!-- Search UiCard -->
        <UiCard class="shadow-2xl bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm dark:border dark:border-gray-700">
          <UiCardContent class="p-6">
            <UiForm @submit.prevent="handleSearch" class="space-y-6">
              <!-- Rent/Buy Toggle -->
              <div class="flex justify-center">
                <div class="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl inline-flex">
                  <UiButton type="button" @click="form.selectedStatus = 'rent'" :variant="form.selectedStatus === 'rent' ? 'default' : 'ghost'" class="dark:text-white">For Rent</UiButton>
                  <UiButton type="button" @click="form.selectedStatus = 'buy'" :variant="form.selectedStatus === 'buy' ? 'default' : 'ghost'" class="dark:text-white">For Sale</UiButton>
                </div>
              </div>
              
              <!-- Search UiInput -->
              <div class="relative">
                <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                <UiInput v-model="form.searchQuery" type="text" placeholder="Search properties..." class="pl-12 h-14 text-lg"/>
              </div>

              <UiCollapsible v-model:open="showMoreFilters">
                <!-- Main Filters Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div class="space-y-2">
                    <UiLabel class="dark:text-gray-300"><MapPin class="size-4 mr-1 inline"/>Region</UiLabel>
                    <UiSelect v-model="form.selectedRegion">
                      <UiSelectTrigger><UiSelectValue placeholder="Select Region" /></UiSelectTrigger>
                      <UiSelectContent>
                        <UiSelectItem v-for="r in regions" :key="r.value" :value="r.value">{{ r.label }}</UiSelectItem>
                      </UiSelectContent>
                    </UiSelect>
                  </div>
                  <div class="space-y-2">
                     <UiLabel class="dark:text-gray-300">Subcity</UiLabel>
                     <UiSelect v-model="form.selectedSubcity" :disabled="!form.selectedRegion">
                       <UiSelectTrigger><UiSelectValue placeholder="Select Subcity" /></UiSelectTrigger>
                       <UiSelectContent class="max-h-60">
                         <UiSelectItem v-for="s in availableSubcities" :key="s.value" :value="s.value">{{ s.label }}</UiSelectItem>
                       </UiSelectContent>
                     </UiSelect>
                  </div>
                  <div class="space-y-2">
                    <UiLabel class="dark:text-gray-300"><Building2 class="size-4 mr-1 inline"/>Property Type</UiLabel>
                    <UiSelect v-model="form.selectedPropertyType">
                      <UiSelectTrigger><UiSelectValue placeholder="Select Property Type" /></UiSelectTrigger>
                      <UiSelectContent class="max-h-60">
                        <UiSelectItem v-for="pt in propertyTypes" :key="pt.value" :value="pt.value">{{ pt.label }}</UiSelectItem>
                      </UiSelectContent>
                    </UiSelect>
                  </div>
                  <div class="space-y-2">
                    <UiLabel class="dark:text-gray-300"><DollarSign class="size-4 mr-1 inline"/>Min Price</UiLabel>
                    <UiSelect v-model="form.minPrice">
                      <UiSelectTrigger><UiSelectValue placeholder="Min Price" /></UiSelectTrigger>
                      <UiSelectContent class="max-h-60">
                        <UiSelectItem v-for="p in priceRanges[form.selectedStatus].min" :key="p.value" :value="p.value">{{ p.label }}</UiSelectItem>
                      </UiSelectContent>
                    </UiSelect>
                  </div>
                  <div class="space-y-2">
                    <UiLabel class="dark:text-gray-300"><DollarSign class="size-4 mr-1 inline"/>Max Price</UiLabel>
                    <UiSelect v-model="form.maxPrice">
                      <UiSelectTrigger><UiSelectValue placeholder="Max Price" /></UiSelectTrigger>
                      <UiSelectContent class="max-h-60">
                        <UiSelectItem v-for="p in priceRanges[form.selectedStatus].max" :key="p.value" :value="p.value">{{ p.label }}</UiSelectItem>
                      </UiSelectContent>
                    </UiSelect>
                  </div>
                </div>

                <!-- UiCollapsible Content -->
                <UiCollapsibleContent class="space-y-6 mt-6">
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div class="space-y-2">
                       <UiLabel class="dark:text-gray-300">Area</UiLabel>
                       <UiSelect v-model="form.selectedArea" :disabled="!form.selectedSubcity">
                         <UiSelectTrigger><UiSelectValue placeholder="Select Area" /></UiSelectTrigger>
                         <UiSelectContent class="max-h-60">
                           <UiSelectItem v-for="a in availableAreas" :key="a.value" :value="a.value">{{ a.label }}</UiSelectItem>
                         </UiSelectContent>
                       </UiSelect>
                    </div>
                    <div class="space-y-2">
                      <UiLabel class="dark:text-gray-300"><Bed class="size-4 mr-1 inline"/>Bedrooms</UiLabel>
                      <UiSelect v-model="form.bedrooms">
                        <UiSelectTrigger><UiSelectValue placeholder="Bedrooms" /></UiSelectTrigger>
                        <UiSelectContent>
                          <UiSelectItem v-for="b in bedroomOptions" :key="b.value" :value="b.value">{{ b.label }}</UiSelectItem>
                        </UiSelectContent>
                      </UiSelect>
                    </div>
                     <div class="space-y-2">
                      <UiLabel class="dark:text-gray-300"><Bath class="size-4 mr-1 inline"/>Bathrooms</UiLabel>
                      <UiSelect v-model="form.bathrooms">
                        <UiSelectTrigger><UiSelectValue placeholder="Bathrooms" /></UiSelectTrigger>
                        <UiSelectContent>
                          <UiSelectItem v-for="b in bathroomOptions" :key="b.value" :value="b.value">{{ b.label }}</UiSelectItem>
                        </UiSelectContent>
                      </UiSelect>
                    </div>
                    <div class="space-y-2">
                      <UiLabel class="dark:text-gray-300"><Maximize class="size-4 mr-1 inline"/>Min Area (m²)</UiLabel>
                      <UiInput v-model="form.minArea" type="number" placeholder="Min Area" />
                    </div>
                    <div class="space-y-2">
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
                <div class="flex flex-col sm:flex-row gap-4 pt-4">
                  <UiButton type="submit" size="lg" class="w-full h-14 flex-1">
                    <Search class="size-5 mr-2" /> Search Properties
                  </UiButton>
                  <UiCollapsibleTrigger as-child>
                    <UiButton type="button" @click="" variant="outline" size="lg" class="h-14">
                      <Filter class="size-5 mr-2" />
                      <span>{{ showMoreFilters ? 'Show Less Filters' : 'Show More Filters' }}</span>
                      <ChevronDown :class="['size-4 ml-2 transition-transform', showMoreFilters && 'rotate-180']" />
                    </UiButton>
                  </UiCollapsibleTrigger>
                  <UiButton v-if="activeFiltersCount > 0" type="button" variant="ghost" size="lg" @click="clearAllFilters" class="h-14 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400">
                    <X class="size-5 mr-2" /> Clear ({{ activeFiltersCount }})
                  </UiButton>
                </div>
              </UiCollapsible>
            </UiForm>
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
