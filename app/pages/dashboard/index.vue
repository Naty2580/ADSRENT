<script setup>
import { useAuthStore } from '~/stores/auth';
import { Home, Calendar, DollarSign, Activity, BarChart3, Zap, Plus, CheckCircle } from 'lucide-vue-next';
import Button from '~/components/ui/Button.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: 'authed',
});

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const isLessor = computed(() => authStore.isLessor);

const { data: summary, pending } = await useAsyncData('dashboard-summary', async () => {
    const { $api } = useNuxtApp();
    return await $api.get('/dashboard/summary');
});
</script>

<template>
  <div class="space-y-8">
    <!-- Welcome Header -->
    <div v-if="user" class="bg-gradient-to-r from-primary via-orange-500 to-amber-500 p-8 rounded-xl text-white shadow-lg">
      <h1 class="text-3xl font-bold mb-2">Welcome back, {{ user.name }}! 👋</h1>
          
 <p class="text-white/90 text-lg mb-4">Here's your overview for today.</p>
    </div>

    <!-- PENDING STATE -->
    <div v-if="pending">Loading key metrics...</div>
    
    <!-- LESSOR'S Key Metrics Cards -->
    <div v-else-if="summary && isLessor" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <UiCard>
        <UiCardContent class="p-6">
          <p class="text-muted-foreground text-sm font-medium mb-1">Total Properties</p>
          <p class="text-3xl font-bold">{{ summary.totalListings || 0 }}</p>
        </UiCardContent>
      </UiCard>
       <UiCard>
        <UiCardContent class="p-6">
          <p class="text-muted-foreground text-sm font-medium mb-1">Active Listings</p>
          <p class="text-3xl font-bold text-green-600">{{ summary.activeListings || 0 }}</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardContent class="p-6">
          <p class="text-muted-foreground text-sm font-medium mb-1">Pending Requests</p>
          <p class="text-3xl font-bold text-blue-600">{{ summary.pendingBookings || 0 }}</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardContent class="p-6">
          <p class="text-muted-foreground text-sm font-medium mb-1">Total Earnings (Mock)</p>
          <p class="text-3xl font-bold text-accent">${{ summary.totalEarnings?.toLocaleString() || 0 }}</p>
        </UiCardContent>
      </UiCard>
    </div>

     <!-- SEEKER'S Key Metrics Cards -->
     <div v-else-if="summary" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <UiCard>
        <UiCardContent class="p-6">
          <p class="text-muted-foreground text-sm font-medium mb-1">Favorite Properties</p>
          <p class="text-3xl font-bold">{{ summary.favoritesCount || 0 }}</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardContent class="p-6">
          <p class="text-muted-foreground text-sm font-medium mb-1">Bookings Sent</p>
          <p class="text-3xl font-bold">{{ summary.bookingsMade || 0 }}</p>
        </UiCardContent>
      </UiCard>
    </div>

    <!-- Quick Actions (Lessor Only) -->
    <UiCard v-if="isLessor">
      <UiCardContent class="p-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap class="h-5 w-5 text-primary" />
          Quick Actions
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NuxtLink to="/dashboard/lessor/add-property">
          <Button   class="w-full justify-start h-12" variant="outline"><Plus class="h-4 w-4 mr-2"/>
            Add New Property
          </Button>
        </NuxtLink>
        <NuxtLink  to="/dashboard/lessor/bookings">
          <Button  class="w-full justify-start h-12" variant="outline"><Calendar class="h-4 w-4 mr-2"/>View Bookings</Button>
        </NuxtLink>
        <NuxtLink  to="/dashboard/lessor/listings">
          <Button  class="w-full justify-start h-12" variant="outline"><Home class="h-4 w-4 mr-2"/>Manage Listings</Button>
        </NuxtLink>

        </div>
      </UiCardContent>
    </UiCard>
  </div>
</template>