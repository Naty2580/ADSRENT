<script setup>
import { Check, X, MoreHorizontal, Inbox } from 'lucide-vue-next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Badge from '~/components/ui/Badge.vue';
import Button from '~/components/ui/Button.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: ['authed', 'role'],
  roles: ['lister', 'admin'],
});

// Mock endpoint: GET /api/lessor/bookings
const { data: bookings, pending, refresh } = await useAsyncData('lessorBookings', async () => {
    const { $api } = useNuxtApp();
    return $api.get('/lessor/bookings');
});

const getStatusVariant = (status) => ({
    'pending': 'secondary', 'approved': 'default', 'rejected': 'destructive'
}[status] || 'outline');

async function updateBookingStatus(bookingId, newStatus) {
    // Optimistic UI update could be added here
    try {
        const { $api } = useNuxtApp();
        await $api.patch(`/lessor/bookings/${bookingId}`, { status: newStatus });
        await refresh(); // Re-fetch the data to show the change
    } catch(error) {
        console.error("Failed to update booking status", error);
        alert('Failed to update status.');
    }
}
</script>

<template>
  <div>
    <h1 class="font-display text-3xl font-bold">Booking Requests</h1>
    <p class="mt-2 text-muted-foreground">Manage and respond to inquiries from potential clients.</p>

    <div class="mt-8 bg-card rounded-lg border">
        <div v-if="pending">Loading bookings...</div>
        <div v-else-if="!bookings || bookings.length === 0" class="p-16 text-center">
             <Inbox class="h-12 w-12 mx-auto text-muted-foreground" />
             <h3 class="mt-4 text-xl font-semibold">No Booking Requests Yet</h3>
             <p class="mt-2 text-muted-foreground">When a user sends an inquiry on one of your properties, it will appear here.</p>
        </div>
        <Table v-else>
            <TableHeader><TableRow><TableHead>Property</TableHead><TableHead>Seeker</TableHead><TableHead>Status</TableHead><TableHead class="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
                <TableRow v-for="booking in bookings" :key="booking.id">
                    <TableCell>
                        <div class="font-medium">{{ booking.property.title }}</div>
                        <div class="text-sm text-muted-foreground">Request on: {{ new Date(booking.created_at).toLocaleDateString() }}</div>
                    </TableCell>
                    <TableCell>{{ booking.seeker.name }}</TableCell>
                    <TableCell><Badge :variant="getStatusVariant(booking.status)" class="capitalize">{{ booking.status }}</Badge></TableCell>
                    <TableCell class="text-right">
                       <div v-if="booking.status === 'pending'" class="flex justify-end space-x-2">
                            <Button size="sm" @click="updateBookingStatus(booking.id, 'approved')"><Check class="h-4 w-4 mr-1"/>Approve</Button>
                            <Button size="sm" variant="destructive" @click="updateBookingStatus(booking.id, 'rejected')"><X class="h-4 w-4 mr-1"/>Reject</Button>
                       </div>
                        <div v-else>
                           -
                       </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
  </div>
</template>