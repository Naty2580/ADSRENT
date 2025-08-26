<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">My Property Listings</h2>
        <p class="text-gray-600">Manage and monitor your rental properties</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" @click="showAddProperty = true">
          <Plus class="h-4 w-4 mr-2" />
          Add Property
        </Button>
        <Button>
          <Filter class="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
    </div>

    <!-- Search and Filters -->
    <Card>
      <CardContent class="p-4">
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Search Input -->
          <div class="flex-1 relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              v-model="searchQuery"
              placeholder="Search properties..."
              class="w-full pl-9"
            />
          </div>

          <!-- Status Filter -->
          <Select
            v-model="statusFilter"
            :options="statusOptions"
            placeholder="All Status"
            class="w-full md:w-48"
          />

          <!-- Type Filter -->
          <Select
            v-model="typeFilter"
            :options="typeOptions"
            placeholder="All Types"
            class="w-full md:w-48"
          />
        </div>
      </CardContent>
    </Card>

    <!-- Stats Summary -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Total Properties</p>
              <p class="text-2xl font-bold">{{ filteredProperties.length }}</p>
            </div>
            <Home class="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Available</p>
              <p class="text-2xl font-bold text-green-600">{{ availableCount }}</p>
            </div>
            <CheckCircle class="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Rented</p>
              <p class="text-2xl font-bold text-blue-600">{{ rentedCount }}</p>
            </div>
            <Users class="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Maintenance</p>
              <p class="text-2xl font-bold text-orange-600">{{ maintenanceCount }}</p>
            </div>
            <Wrench class="h-8 w-8 text-orange-500" />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Properties Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <Card
        v-for="property in filteredProperties"
        :key="property.id"
        class="hover:shadow-lg transition-all duration-300 hover:scale-105 transform"
      >
        <CardContent class="p-0">
          <!-- Property Image -->
          <div class="relative h-48 overflow-hidden rounded-t-lg">
            <img
              :src="property.image"
              :alt="property.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute top-3 right-3">
              <Badge :variant="getStatusVariant(property.status)">
                {{ property.status }}
              </Badge>
            </div>
            <div class="absolute top-3 left-3">
              <Badge variant="secondary">
                {{ property.type }}
              </Badge>
            </div>
          </div>

          <!-- Property Details -->
          <div class="p-4 space-y-3">
            <div>
              <h3 class="font-semibold text-lg text-gray-900">{{ property.title }}</h3>
              <p class="text-sm text-gray-600 flex items-center gap-1">
                <MapPin class="h-3 w-3" />
                {{ property.address }}
              </p>
            </div>

            <!-- Property Specs -->
            <div class="flex items-center gap-4 text-sm text-gray-600">
              <span v-if="property.bedrooms" class="flex items-center gap-1">
                <Bed class="h-4 w-4" />
                {{ property.bedrooms }} BR
              </span>
              <span v-if="property.bathrooms" class="flex items-center gap-1">
                <Bath class="h-4 w-4" />
                {{ property.bathrooms }} BA
              </span>
              <span v-if="property.area" class="flex items-center gap-1">
                <Square class="h-4 w-4" />
                {{ property.area }} sqm
              </span>
            </div>

            <!-- Price -->
            <div class="flex items-center justify-between">
              <div>
                <p class="text-2xl font-bold text-primary">
                  ETB {{ property.price.toLocaleString() }}
                </p>
                <p class="text-sm text-gray-600">per month</p>
              </div>
            </div>

            <!-- Property Actions -->
            <div class="flex items-center gap-2 mt-4">
              <Button size="sm" variant="outline" @click="editProperty(property.id)">
                <Edit class="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button size="sm" variant="destructive" @click="deleteProperty(property.id)">
                <Trash2 class="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Empty State -->
    <div v-if="filteredProperties.length === 0" class="text-center py-12">
      <Home class="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
      <p class="text-gray-600 mb-4">Try adjusting your search or filters</p>
      <Button @click="showAddProperty = true">
        <Plus class="h-4 w-4 mr-2" />
        Add Your First Property
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Card from '@/components/ui/card.vue'
import CardContent from '@/components/ui/card-content.vue'
import Input from '@/components/ui/input.vue'
import Select from '@/components/ui/select.vue'
import Button from '@/components/ui/button.vue'
import Badge from '@/components/ui/badge.vue'
import {
  Home,
  Plus,
  Filter,
  Search,
  CheckCircle,
  Users,
  Wrench,
  MapPin,
  Bed,
  Bath,
  Square,
  Edit,
  Trash2
} from 'lucide-vue-next'

interface Property {
  id: number
  title: string
  type: string
  status: 'available' | 'rented' | 'maintenance'
  price: number
  address: string
  image: string
  bedrooms?: number
  bathrooms?: number
  area?: number
  description: string
}

const showAddProperty = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')
const typeFilter = ref('')

const statusOptions = [
  { label: 'All Status', value: '' },
  { label: 'Available', value: 'available' },
  { label: 'Rented', value: 'rented' },
  { label: 'Maintenance', value: 'maintenance' }
]

const typeOptions = [
  { label: 'All Types', value: '' },
  { label: 'Apartment', value: 'apartment' },
  { label: 'House', value: 'house' },
  { label: 'Villa', value: 'villa' },
  { label: 'Office', value: 'office' }
]

const properties = ref<Property[]>([
  {
    id: 1,
    title: 'Modern 2BR Apartment in Bole',
    type: 'apartment',
    status: 'available',
    price: 15000,
    address: 'Bole, Addis Ababa',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    description: 'A modern and spacious apartment in the heart of Bole.'
  },
  {
    id: 2,
    title: 'Luxury Villa with Garden',
    type: 'villa',
    status: 'rented',
    price: 25000,
    address: 'Kazanchis, Addis Ababa',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    description: 'A beautiful villa with garden and modern amenities.'
  },
  {
    id: 3,
    title: 'Office Space in Commercial District',
    type: 'office',
    status: 'maintenance',
    price: 18000,
    address: 'Kazanchis, Addis Ababa',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    area: 200,
    description: 'Professional office space in a prime commercial location.'
  }
])

const filteredProperties = computed(() => {
  return properties.value.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !statusFilter.value || property.status === statusFilter.value
    const matchesType = !typeFilter.value || property.type === typeFilter.value
    
    return matchesSearch && matchesStatus && matchesType
  })
})

const availableCount = computed(() => 
  properties.value.filter(p => p.status === 'available').length
)

const rentedCount = computed(() => 
  properties.value.filter(p => p.status === 'rented').length
)

const maintenanceCount = computed(() => 
  properties.value.filter(p => p.status === 'maintenance').length
)

function getStatusVariant(status: Property['status']) {
  switch (status) {
    case 'available': return 'default'
    case 'rented': return 'secondary'
    case 'maintenance': return 'destructive'
    default: return 'outline'
  }
}

function editProperty(id: number) {
  console.log('Edit property', id)
}

function deleteProperty(id: number) {
  if (confirm('Are you sure you want to delete this property?')) {
    properties.value = properties.value.filter(p => p.id !== id)
  }
}
</script>
