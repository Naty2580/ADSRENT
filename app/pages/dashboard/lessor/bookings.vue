<script setup>
import { ref, computed } from 'vue';
import '~/types/api.js';
import { MessageSquare, Clock, CheckCircle, XCircle, Search, Filter, Phone, Mail, Calendar, Check, X, Eye } from 'lucide-vue-next';

import Button from '~/components/ui/Button.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: ['authed', 'role'],
  roles: ['lister', 'admin'],
});

const searchQuery = ref('');
const statusFilter = ref('');

// --- DATA FETCHING ---
const { data: bookingsResult, pending, refresh } = await useAsyncData(
    'lessorBookings',
      () => {
    const { $api } = useNuxtApp();

    return $api.get('/lessor/bookings');
    
});

const bookings = computed(() => bookingsResult.value?.data || []);  



// --- CLIENT-SIDE FILTERING & COMPUTED STATS ---
const filteredRequests = computed(() => {
    if (!bookings.value) return [];
    return bookings.value.filter(request => {
        const matchesSearch = request.seeker.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || request.property.title.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesStatus = !statusFilter.value || request.status === statusFilter.value;
        return matchesSearch && matchesStatus;
    });
});
const pendingCount = computed(() => bookings.value?.filter(r => r.status === 'pending').length || 0);
const acceptedCount = computed(() => bookings.value?.filter(r => r.status === 'approved').length || 0);
const declinedCount = computed(() => bookings.value?.filter(r => r.status === 'rejected').length || 0);
const getStatusVariant = (status) => ({ 'pending': 'secondary', 'approved': 'default', 'rejected': 'destructive' }[status]);

// --- ACTIONS ---
async function updateBookingStatus(bookingId, newStatus) {
    try {
        const { $api } = useNuxtApp();
        await $api.put(`lessor/booking-requests/${bookingId}`, { status: newStatus });
        await refresh();
    } catch(error) {
        console.error("Failed to update booking status", error);
        alert('Failed to update status.');
    }
}
</script>

<template>
  <div class="space-y-6">
    <div>
        <h1 class="font-display text-3xl font-bold">Booking Requests</h1>
        <p class="mt-2 text-muted-foreground">Manage and respond to inquiries from potential clients.</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <UiCard><UiCardContent class="p-4"><p class="text-sm text-gray-600">Total Requests</p><p class="text-2xl font-bold">{{ bookings?.length || 0 }}</p></UiCardContent></UiCard>
      <UiCard><UiCardContent class="p-4"><p class="text-sm text-gray-600">Pending</p><p class="text-2xl font-bold text-amber-600">{{ pendingCount }}</p></UiCardContent></UiCard>
      <UiCard><UiCardContent class="p-4"><p class="text-sm text-gray-600">Accepted</p><p class="text-2xl font-bold text-green-600">{{ acceptedCount }}</p></UiCardContent></UiCard>
      <UiCard><UiCardContent class="p-4"><p class="text-sm text-gray-600">Declined</p><p class="text-2xl font-bold text-red-600">{{ declinedCount }}</p></UiCardContent></UiCard>
    </div>

    <!-- Filters -->
    <UiCard>
      <UiCardContent class="p-4 flex flex-col md:flex-row gap-4">
        <div class="flex-1 relative"><Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><UiInput v-model="searchQuery" placeholder="Search by name or property..." class="pl-9"/></div>
        <UiSelect v-model="statusFilter" class="w-full md:w-48 rounded-md border-input bg-background">
            <UiSelectTrigger class="w-full md:w-48 rounded-md border-input bg-background ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                <UiSelectValue placeholder="All Status" />
            </UiSelectTrigger>
            <UiSelectContent>
                <UiSelectItem value="pending">Pending</UiSelectItem>
                <UiSelectItem value="approved">Accepted</UiSelectItem>
                <UiSelectItem value="rejected">Declined</UiSelectItem>
            </UiSelectContent>
            <!-- <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Accepted</option>
            <option value="rejected">Declined</option> -->
        </UiSelect>
      </UiCardContent>
    </UiCard>

    <!-- Requests List -->
    <div v-if="pending">Loading requests...</div>
    <div v-else-if="filteredRequests.length > 0" class="space-y-4">
        <UiCard v-for="request in filteredRequests" :key="request.id">
            <UiCardContent class="p-6">
                <div class="flex flex-col lg:flex-row gap-6">
                    <div class="flex items-start gap-4 flex-1">
                        <img :src="request.seeker.avatar_url" :alt="request.seeker.name" class="h-16 w-16 rounded-full"/>
                        <div class="flex-1 space-y-3">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h3 class="text-lg font-semibold">{{ request.seeker.name }}</h3>
                                    <p class="text-sm text-primary">{{ request.property.title }}</p>
                                    <div class="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                        <span class="flex items-center gap-1"><Calendar class="h-3 w-3"/>{{ new Date(request.created_at).toLocaleDateString() }}</span>
                                    </div>
                                </div>
                                <UiBadge :variant="getStatusVariant(request.status)" class="capitalize">{{ request.status }}</UiBadge>
                            </div>
                            <div class="bg-secondary p-4 rounded-lg"><p class="text-foreground">{{ request.message }}</p></div>
                        </div>
                    </div>
                    <div v-if="request.status === 'pending'" class="flex flex-col gap-2 lg:w-48 flex-shrink-0">
                        <Button @click="updateBookingStatus(request.id, 'approved')"><Check class="h-4 w-4 mr-2"/>Accept Request</Button>
                        <Button @click="updateBookingStatus(request.id, 'rejected')" variant="destructive"><X class="h-4 w-4 mr-2"/>Decline Request</Button>
                    </div>
                </div>
            </UiCardContent>
        </UiCard>
    </div>
    <div v-else class="text-center py-12 bg-card rounded-lg border">
      <MessageSquare class="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium">No booking requests found</h3>
      <p class="text-muted-foreground mt-2">Try adjusting your filters.</p>
    </div>
  </div>
</template>