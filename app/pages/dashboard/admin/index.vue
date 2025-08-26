<script setup>
import { Users, Building2, Clock, CheckCircle } from 'lucide-vue-next';
import StatCard from '~/components/admin/StatCard.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: ['authed', 'role'],
  roles: ['admin'],
});

// Mocked API call to GET /api/admin/stats
const { data: stats, pending } = useAsyncData('adminStats', () => {
    // const { $api } = useNuxtApp();
    // return $api.get('/admin/stats');
    return new Promise(resolve => setTimeout(() => resolve({ 
        totalUsers: 152, totalProperties: 85, pendingApprovals: 5, activeListings: 72 
    }), 500));
});
</script>

<template>
  <div>
    <h1 class="font-display text-3xl font-bold">Admin Overview</h1>
    <p class="mt-2 text-muted-foreground">High-level view of platform activity.</p>
    
    <div v-if="pending" class="mt-8">Loading stats...</div>
    <div v-else-if="stats" class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Users" :value="stats.totalUsers" :icon="Users" />
      <StatCard title="Total Properties" :value="stats.totalProperties" :icon="Building2" color="text-sky-500" />
      <StatCard title="Pending Approvals" :value="stats.pendingApprovals" :icon="Clock" color="text-amber-500" />
      <StatCard title="Active Listings" :value="stats.activeListings" :icon="CheckCircle" color="text-green-500" />
    </div>
  </div>
</template>