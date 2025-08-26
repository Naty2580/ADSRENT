
<script setup>
import { ref, computed } from 'vue'

import { LayoutGrid, List as ListIcon } from 'lucide-vue-next'

// Top filter state
const filter = ref({
  region: '',
  subcity: '',
  area: '',
  type: '',
  priceMin: '',
  priceMax: ''
})

// Options (placeholder/mock)
const regions = ['Addis Ababa']
const subcities = ['Bole', 'Kazanchis', 'Lideta', 'Arada']
const areas = ['Around Airport', 'CMC', 'Sarbet', 'Megenagna']
const propertyTypes = ['Apartment', 'House', 'Villa', 'Office']

function resetFilters() {
  filter.value = { region: '', subcity: '', area: '', type: '', priceMin: '', priceMax: '' }
}

// Mock data extended with lat/lng
const properties = ref([
  { id: 1, title: 'Modern Apartment', location: 'Bole, Addis Ababa', region: 'Addis Ababa', subcity: 'Bole', area: 'Around Airport', type: 'Apartment', price: 12000, bedrooms: 2, bathrooms: 1, image: '/images/apartment.jpg', lat: 8.9958, lng: 38.7897 },
  { id: 2, title: 'Spacious House', location: 'Kazanchis, Addis Ababa', region: 'Addis Ababa', subcity: 'Kazanchis', area: 'Sarbet', type: 'House', price: 25000, bedrooms: 4, bathrooms: 3, image: '/images/house.jpg', lat: 9.0105, lng: 38.7610 }
])

const filtered = computed(() => {
  return properties.value.filter(p => {
    const matchRegion = !filter.value.region || p.region === filter.value.region
    const matchSubcity = !filter.value.subcity || p.subcity === filter.value.subcity
    const matchArea = !filter.value.area || p.area === filter.value.area
    const matchType = !filter.value.type || p.type === filter.value.type
    const min = filter.value.priceMin ? Number(filter.value.priceMin) : -Infinity
    const max = filter.value.priceMax ? Number(filter.value.priceMax) : Infinity
    const matchPrice = p.price >= min && p.price <= max
    return matchRegion && matchSubcity && matchArea && matchType && matchPrice
  })
})

const paginationLinks = [
  { label: '&laquo; Previous', url: '#', active: false },
  { label: '1', url: '#', active: true },
  { label: '2', url: '#', active: false },
  { label: 'Next &raquo;', url: '#', active: false }
]

const view = ref('list') // 'list' | 'map'
const resultLayout = ref('grid') // 'grid' | 'list'
const resultSummary = computed(() => {
  const subject = filter.value.type ? `${filter.value.type.toLowerCase()}s` : 'properties'
  const whereParts = []
  if (filter.value.area) whereParts.push(filter.value.area.toLowerCase())
  if (filter.value.subcity) whereParts.push(filter.value.subcity.toLowerCase())
  if (filter.value.region) whereParts.push(filter.value.region.toLowerCase())
  const where = whereParts.length ? ` in ${whereParts.join(', ')}` : ''
  let priceText = ''
  const min = filter.value.priceMin ? Number(filter.value.priceMin) : null
  const max = filter.value.priceMax ? Number(filter.value.priceMax) : null
  if (min !== null && max !== null) {
    priceText = ` between ${min.toLocaleString()} and ${max.toLocaleString()} ETB`
  } else if (max !== null) {
    priceText = ` below ${max.toLocaleString()} ETB`
  } else if (min !== null) {
    priceText = ` above ${min.toLocaleString()} ETB`
  }
  return `${subject}${where}${priceText}`.trim()
})
</script>

<template>
  <div>
    

    <!-- Filter bar below navbar -->
    <section class="bg-white border-b border-dividerGray sticky top-[48px] z-40">
      <div class="max-w-7xl mx-auto px-4 py-3 grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
        <div>
          <label class="block text-sm text-gray-600 mb-1">Region</label>
          <select v-model="filter.region" class="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-orangeAccent">
            <option value="">All</option>
            <option v-for="r in regions" :key="r" :value="r">{{ r }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Subcity</label>
          <select v-model="filter.subcity" class="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-orangeAccent">
            <option value="">All</option>
            <option v-for="s in subcities" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Specific Area</label>
          <input v-model="filter.area" type="text" placeholder="Enter area" class="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-orangeAccent" />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Property Type</label>
          <select v-model="filter.type" class="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-orangeAccent">
            <option value="">All</option>
            <option v-for="t in propertyTypes" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Min Price</label>
          <input v-model="filter.priceMin" type="number" min="0" placeholder="ETB" class="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-orangeAccent" />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Max Price</label>
          <input v-model="filter.priceMax" type="number" min="0" placeholder="ETB" class="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-orangeAccent" />
        </div>
        <div class="flex gap-2 md:col-span-3">
          <button @click="resetFilters" class="border border-gray-300 px-4 py-2 rounded text-sm">Reset</button>
          <button class="bg-orangeAccent text-white px-4 py-2 rounded text-sm">Search</button>
          <div class="ml-auto flex items-center gap-2">
            <button :class="['px-3 py-2 rounded text-sm border', view==='list' ? 'bg-gray-100' : 'bg-white']" @click="view='list'">List</button>
            <button :class="['px-3 py-2 rounded text-sm border', view==='map' ? 'bg-gray-100' : 'bg-white']" @click="view='map'">Map</button>
          </div>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Sidebar -->
      <div class="md:col-span-1">
        <div class="sticky top-[120px]">
          <FiltersSidebar />
        </div>
      </div>

      <!-- Results -->
      <div class="md:col-span-3 flex flex-col gap-3">
        <!-- Results header -->
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium">Shows {{ filtered.length }} {{ filtered.length === 1 ? 'result' : 'results' }}</p>
            <p class="text-xs text-gray-500">{{ resultSummary }}</p>
          </div>
          <div class="flex items-center gap-2">
            <button :class="['p-2 rounded border', resultLayout==='grid' ? 'bg-gray-100' : 'bg-white']" @click="resultLayout='grid'">
              <LayoutGrid class="w-4 h-4" />
            </button>
            <button :class="['p-2 rounded border', resultLayout==='list' ? 'bg-gray-100' : 'bg-white']" @click="resultLayout='list'">
              <ListIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
        <!-- Scrollable results area -->
        <div class="flex-1 overflow-y-auto max-h-[calc(100vh-160px)]">
          <div v-if="view==='list'" :class="['grid gap-4', resultLayout==='grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1']">
            <PropertyCard
              v-for="property in filtered"
              :key="property.id"
              :property="property"
            />
          </div>
          <div v-else>
            <MapView :properties="filtered" />
          </div>
          <div class="mt-4">
            <Pagination :links="paginationLinks" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
