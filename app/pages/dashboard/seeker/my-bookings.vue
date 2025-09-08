<script setup>
import '~/types/api.js';
import { useAuthStore } from '~/stores/auth';
import { Clock, CheckCircle, XCircle, Home, MessageSquare, Trash2 } from 'lucide-vue-next';

import Button from '~/components/ui/Button.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: 'authed',
});

// --- DATA FETCHING ---
const { data: bookingsData, pending, error, refresh } = await useAsyncData(
    'seekerBookings',
    async () => {
        const { $api } = useNuxtApp();
        return $api.get('/my-bookings/sent');
    }
);

const bookings = computed(() => bookingsData.value?.data || []);

// --- UI HELPERS ---
const statusInfo = (status) => {
    switch(status) {
        case 'approved': return { text: 'Approved', icon: CheckCircle, variant: 'default' };
        case 'rejected': return { text: 'Rejected', icon: XCircle, variant: 'destructive' };
        default: return { text: 'Pending', icon: Clock, variant: 'secondary' };
    }
};

// --- ACTIONS ---
async function cancelBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this booking request?')) {
        try {
            const { $api } = useNuxtApp();
            await $api.delete(`/booking-requests/${bookingId}`);
            await refresh(); // Re-fetch the list to show the change
        } catch (err) {
            console.error("Failed to cancel booking:", err);
            alert('Could not cancel the booking request.');
        }
    }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h1 class="font-display text-3xl font-bold">My Booking Requests</h1>
      <p class="mt-2 text-muted-foreground">Track the status of all your sent inquiries.</p>
    </div>

    <!-- PENDING/LOADING STATE -->
    <div v-if="pending">Loading your booking history...</div>
    <!-- ERROR STATE -->
    <div v-else-if="error" class="text-center py-12 bg-card rounded-lg border">
      <p class="text-destructive">Could not load your booking requests. Please try again later.</p>
    </div>
    
    <!-- LIST OF BOOKING CARDS -->
    <div v-else-if="bookings.length > 0" class="space-y-6">
      <UiCard v-for="booking in bookings" :key="booking.id" class="overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <!-- Image Section -->
          <div class="md:w-1/3 lg:w-1/4 flex-shrink-0">
             <img :src="booking.property?.media?.[0]?.url || '/placeholder.jpg'" :alt="booking.property.title" class="w-full h-48 md:h-full object-cover"/>
          </div>

          <!-- Content Section -->
          <div class="flex-1">
             <div class="p-6">
                 <!-- UiCard Header -->
                 <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                     <div>
                         <NuxtLink :to="`/properties/${booking.property.id}`" class="font-display text-xl font-bold hover:text-primary transition-colors">
                            {{ booking.property.title }}
                         </NuxtLink>
                         <p class="text-sm text-muted-foreground mt-1">
                             Request sent on {{ new Date(booking.created_at).toLocaleDateString() }}
                         </p>
                     </div>
                     <UiBadge :variant="statusInfo(booking.status).variant" class="flex-shrink-0">
                         <component :is="statusInfo(booking.status).icon" class="h-4 w-4 mr-2" />
                         {{ statusInfo(booking.status).text }}
                     </UiBadge>
                 </div>
                 
                 <!-- Message Body -->
                 <div class="mt-4 p-4 bg-secondary rounded-lg border">
                    <p class="text-sm text-foreground/80 italic">"{{ booking.message }}"</p>
                 </div>

                 <!-- Actions -->
                 <div class="mt-6 pt-4 border-t flex flex-col sm:flex-row items-center justify-end gap-2">
                    <NuxtLink :to="`/dashboard/messages/${booking.property.lister.id}`">
                        <Button variant="outline" class="w-full sm:w-auto"><MessageSquare class="h-4 w-4 mr-2"/> Contact Lister</Button>
                    </NuxtLink>
                    <Button v-if="booking.status === 'pending'" @click="cancelBooking(booking.id)" variant="destructive" class="w-full sm:w-auto">
                      <Trash2 class="h-4 w-4 mr-2"/> Cancel Request
                    </Button>
                 </div>
             </div>
          </div>

        </div>
      </UiCard>
    </div>

    <!-- EMPTY STATE -->
    <div v-else class="text-center py-16 bg-card rounded-lg border">
      <Home class="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">You haven't made any booking requests yet.</h3>
      <Button as="NuxtLink" to="/properties">Start Searching for Properties</Button>
    </div>
    
  </div>
</template>