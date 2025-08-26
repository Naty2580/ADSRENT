<script setup>
import '~/types/api.js' // For JSDoc type hinting
import { MoreHorizontal, Plus } from 'lucide-vue-next';
// Import all our new table components
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Button from '~/components/ui/Button.vue';
import Badge from '~/components/ui/Badge.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: ['authed', 'role'],
  roles: ['lister', 'admin'],
});

// --- Data Fetching ---
// Mock endpoint: GET /api/lessor/properties
const { data: listings, pending, error } = await useAsyncData(
    'lessorListings',
    () => {
        // Replace with your actual API call:
        // const { $api } = useNuxtApp();
        // return $api.get('/lessor/properties');

        // MOCK DATA for now:
        return new Promise(resolve => setTimeout(() => resolve([
            { id: 1, title: 'Spacious Villa in Bole', propertyType: 'villa', status: 'active', price: { raw: 85000, currency: 'ETB'}, createdAt: '2025-08-15T10:00:00Z'},
            { id: 2, title: 'Modern Apartment in CMC', propertyType: 'apartment', status: 'pending', price: { raw: 12500000, currency: 'ETB'}, createdAt: '2025-08-18T14:30:00Z'},
            { id: 3, title: 'Cozy Guesthouse in Kazanchis', propertyType: 'guesthouse', status: 'inactive', price: { raw: 45000, currency: 'ETB'}, createdAt: '2025-07-20T09:00:00Z'},
            { id: 4, title: 'Commercial Office Space', propertyType: 'office', status: 'active', price: { raw: 60000, currency: 'ETB'}, createdAt: '2025-08-01T11:00:00Z'}
        ]), 1000));
    }
);

const getStatusVariant = (status) => {
    switch(status) {
        case 'active': return 'default';
        case 'pending': return 'secondary';
        case 'inactive': return 'outline';
        default: return 'outline';
    }
}

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
}

</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-3xl font-bold">My Property Listings</h1>
        <p class="mt-2 text-muted-foreground">View, manage, and track the status of your properties.</p>
      </div>
       <Button to="/dashboard/lessor/add-property">
         <Plus class="h-4 w-4 mr-2"/>
         Add New Property
       </Button>
    </div>
    
    <div class="mt-8 bg-card rounded-lg border">
      <div v-if="pending" class="p-8 text-center text-muted-foreground">Loading your properties...</div>
      <div v-else-if="error" class="p-8 text-center text-destructive">Failed to load properties. Please try again.</div>
      <div v-else-if="!listings || listings.length === 0" class="p-8 text-center">
         <h3 class="text-xl font-semibold">No Properties Listed Yet</h3>
         <p class="mt-2 text-muted-foreground">Start by adding your first property to see it here.</p>
      </div>
      <Table v-else>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[300px]">Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Date Listed</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="listing in listings" :key="listing.id">
            <TableCell class="font-medium">{{ listing.title }}</TableCell>
            <TableCell>
               <Badge :variant="getStatusVariant(listing.status)" class="capitalize">{{ listing.status }}</Badge>
            </TableCell>
            <TableCell class="capitalize">{{ listing.propertyType }}</TableCell>
            <TableCell>{{ new Intl.NumberFormat('en-US').format(listing.price.raw) }} {{ listing.price.currency }}</TableCell>
            <TableCell>{{ formatDate(listing.createdAt) }}</TableCell>
            <TableCell class="text-right">
              <!-- Actions will go here (View, Edit, etc) -->
              <Button variant="ghost" size="sm" class="h-8 w-8 p-0">
                  <MoreHorizontal class="h-4 w-4" />
                  <span class="sr-only">Open menu</span>
              </Button>

              <NuxtLink :to="`/dashboard/lessor/edit/${listing.id}`">
    <Button variant="outline" size="sm">Edit</Button>
  </NuxtLink>
  
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>