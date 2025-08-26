<script setup>
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Badge from '~/components/ui/Badge.vue';
import Button from '~/components/ui/Button.vue';
import { Check, X } from 'lucide-vue-next';

definePageMeta({
  layout: 'dashboard',
  middleware: ['authed', 'role'],
  roles: ['admin'],
});

const { data: listings, pending, refresh } = await useAsyncData('adminListings', () => {
    // const { $api } = useNuxtApp(); return $api.get('/admin/listings');
    return new Promise(resolve => setTimeout(() => resolve([
        { id: 1, title: 'Spacious Villa in Bole', lessor: { name: 'John Doe'}, status: 'active', createdAt: '2025-08-15T10:00:00Z'},
        { id: 2, title: 'Modern Apartment in CMC', lessor: { name: 'Jane Smith'}, status: 'pending', createdAt: '2025-08-18T14:30:00Z'},
        { id: 3, title: 'Commercial Office Space', lessor: { name: 'Ethio Corp'}, status: 'active', createdAt: '2025-08-01T11:00:00Z'}
    ]), 1000));
});

async function handleApproval(listingId, action) {
    console.log(`${action}ing listing ${listingId}`);
    // const { $api } = useNuxtApp();
    // await $api.post(`/admin/listings/${listingId}/${action}`);
    // await refresh(); // Refresh the list
    alert(`Listing ${listingId} has been ${action}ed.`);
}
</script>

<template>
  <div>
    <h1 class="font-display text-3xl font-bold">Manage All Listings</h1>
    <p class="mt-2 text-muted-foreground">Approve, reject, or manage all properties on the platform.</p>
    
    <div class="mt-8 bg-card rounded-lg border">
        <div v-if="pending" class="p-8 text-center text-muted-foreground">Loading listings...</div>
        <Table v-else>
          <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Lessor</TableHead><TableHead>Status</TableHead><TableHead class="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
              <TableRow v-for="listing in listings" :key="listing.id">
                <TableCell>{{ listing.title }}</TableCell>
                <TableCell>{{ listing.lessor.name }}</TableCell>
                <TableCell><Badge class="capitalize">{{ listing.status }}</Badge></TableCell>
                <TableCell v-if="listing.status === 'pending'" class="text-right space-x-2">
                  <Button size="sm" @click="handleApproval(listing.id, 'approve')"><Check class="h-4 w-4 mr-1"/>Approve</Button>
                  <Button size="sm" variant="destructive" @click="handleApproval(listing.id, 'reject')"><X class="h-4 w-4 mr-1"/>Reject</Button>
                </TableCell>
                <TableCell v-else class="text-right text-muted-foreground">-</TableCell>
              </TableRow>
          </TableBody>
        </Table>
    </div>
  </div>
</template>