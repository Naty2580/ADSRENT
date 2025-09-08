<script setup>
import '~/types/api.js';
import { ref, computed } from 'vue';
import { Home, Plus, Filter, Search, CheckCircle, Clock, XCircle, MapPin, Bed, Bath, Edit, Trash2 } from 'lucide-vue-next';

import Button from '~/components/ui/Button.vue';


definePageMeta({
  layout: 'dashboard',
  middleware: ['authed', 'role'],
  roles: ['lister', 'admin'],
});

const searchQuery = ref('');
const statusFilter = ref('');

// --- DATA FETCHING ---
const { data: properties, pending, error, refresh } = await useAsyncData(
    'lessorListings',
    async () => {
        const { $api } = useNuxtApp();
        // This is our live API call to fetch the lessor's properties.
        return $api.get('/lessor/properties');
        
    }
   
); 
// --- CLIENT-SIDE FILTERING & COMPUTED STATS ---
const filteredProperties = computed(() => {
    if (!properties.value) return [];
    console.log(' properties:', properties.value.data);
    return properties.value.data.filter(property => {
        const matchesSearch = property.title.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesStatus = !statusFilter.value || property.status === statusFilter.value;
        return matchesSearch && matchesStatus;
    });
});
const totalProperties = computed(() => properties.value?.data?.length || 0);
const activeCount = computed(() => properties.value?.data?.filter(p => p.status === 'active').length || 0);
const pendingCount = computed(() => properties.value?.data?.filter(p => p.status === 'pending').length || 0);
const inactiveCount = computed(() => properties.value?.data?.filter(p => p.status === 'inactive').length || 0);

// Helper function for status badge styling
const getStatusVariant = (status) => ({
    'active': 'default', 'pending': 'secondary', 'inactive': 'outline'
}[status] || 'outline');

// --- ACTIONS ---
async function deleteProperty(propertyId) {
    if (confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
        try {
            const { $api } = useNuxtApp();
                        await $api.delete(`/lessor/properties/${propertyId}`);

            await $api.delete(`/lessor/properties/${propertyId}`); // Assumes DELETE endpoint exists
            await refresh(); // Refresh the list from the server
            // showToast('Property deleted successfully.');
        } catch (err) {
            console.error("Failed to delete property:", err);
            alert("Could not delete property.");
        }
    }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="font-display text-3xl font-bold">My Property Listings</h1>
        <p class="mt-2 text-muted-foreground">Manage and monitor your properties.</p>
      </div>
      <Button as="NuxtLink" to="/dashboard/lessor/add-property"><Plus class="h-4 w-4 mr-2" />Add Property</Button>
    </div>

    <!-- Search and Filters -->
    <UiCard>
      <UiCardContent class="p-4">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1 relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <UiInput v-model="searchQuery" placeholder="Search properties by title..." class="w-full pl-9"/>
          </div>
          <UiSelect v-model="statusFilter" class="w-full md:w-48 rounded-md border-input bg-background ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
              <!-- <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option> -->
              <!-- //change the above to uiSelect shadn-cn format -->
               <UiSelectTrigger class="w-full md:w-48 rounded-md border-input bg-background ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                <UiSelectValue placeholder="All Status" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="active">Active</UiSelectItem>
                <UiSelectItem value="pending">Pending</UiSelectItem>
                <UiSelectItem value="inactive">Inactive</UiSelectItem>
              </UiSelectContent>
          </UiSelect>
        </div>
      </UiCardContent>
    </UiCard>

    <!-- Stats Summary -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- <UiCard><UiCardContent class="p-4"><p class="text-sm text-gray-600">Total Properties</p><p class="text-2xl font-bold">{{ totalProperties }}</p></UiCardContent></UiCard> -->
        <UiCard><UiCardContent class="p-4"><p class="text-sm text-gray-600">Active</p><p class="text-2xl font-bold text-green-600">{{ activeCount }}</p></UiCardContent></UiCard>
        <UiCard><UiCardContent class="p-4"><p class="text-sm text-gray-600">Pending Review</p><p class="text-2xl font-bold text-amber-600">{{ pendingCount }}</p></UiCardContent></UiCard>
        <UiCard><UiCardContent class="p-4"><p class="text-sm text-gray-600">Inactive</p><p class="text-2xl font-bold text-muted-foreground">{{ inactiveCount }}</p></UiCardContent></UiCard>
    </div>

    <!-- Properties Grid -->
     <div v-if="pending" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
       <PropertyCardSkeleton v-for="i in 3" :key="`listing-skel-${i}`" />
     </div>
     <div v-else-if="error" class="text-center py-12">Failed to load properties.</div>
     <div v-else-if="filteredProperties.length > 0" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <UiCard v-for="property in filteredProperties" :key="property.id" class="hover:shadow-lg transition-all duration-300">
        <UiCardContent class="p-0">
          <div class="relative h-48 overflow-hidden rounded-t-lg">
            <img :src="property.media?.[0]?.url || '/placeholder.jpg'" :alt="property.title" class="w-full h-full object-cover"/>
            <div class="absolute top-3 right-3"><UiBadge :variant="getStatusVariant(property.status)" class="capitalize">{{ property.status }}</UiBadge></div>
            <div class="absolute top-3 left-3"><UiBadge variant="secondary" class="capitalize">{{ property.propertyType }}</UiBadge></div>
          </div>
          <div class="p-4 space-y-3">
            <div>
              <h3 class="font-semibold text-lg text-foreground truncate">{{ property.title }}</h3>
              <p class="text-sm text-muted-foreground flex items-center gap-1"><MapPin class="h-3 w-3" />{{ property.location.specificArea }}</p>
            </div>
            <div class="flex items-center gap-4 text-sm text-muted-foreground">
              <span v-if="property.bedrooms" class="flex items-center gap-1"><Bed class="h-4 w-4" />{{ property.bedrooms }} BR</span>
              <span v-if="property.bathrooms" class="flex items-center gap-1"><Bath class="h-4 w-4" />{{ property.bathrooms }} BA</span>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-2xl font-bold text-primary">{{ property.price.amount }} {{ property.price.currency }}</p>
            </div>
            <div class="flex items-center gap-2 pt-2 border-t">
              <Button as="NuxtLink" :to="`/dashboard/lessor/edit/${property.id}`" size="sm" variant="outline"><Edit class="h-4 w-4 mr-1"/>Edit</Button>
              <Button size="sm" variant="destructive" @click="deleteProperty(property.id)"><Trash2 class="h-4 w-4 mr-1"/>Delete</Button>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
     </div>
     <div v-else class="text-center py-12 bg-card rounded-lg border">
      <Home class="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
      <p class="text-muted-foreground mb-4">Try adjusting your filters or add your first property.</p>
     </div>
  </div>
</template>