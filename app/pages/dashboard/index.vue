<script setup>
import { useAuthStore } from '~/stores/auth';

// Apply the dashboard layout and the 'authed' middleware
definePageMeta({
  layout: 'dashboard',
  middleware: 'authed',
});

const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>

<template>
  <div>
    <h1 class="font-display text-3xl font-bold">Dashboard</h1>

    <div class="mt-8 p-6 bg-card rounded-lg shadow-sm border">
        <h2 class="text-xl font-semibold">Welcome back, {{ user?.name }}!</h2>
        <p class="mt-2 text-muted-foreground">
          You are logged in with the email: <span class="font-medium text-primary">{{ user?.email }}</span>.
        </p>
        <p class="mt-1 text-muted-foreground">
          Your account type is: <span class="font-medium capitalize">{{ user?.type }}</span>.
        </p>
    </div>

    <!-- More dashboard widgets will go here -->
     <div class="mt-8 text-center text-muted-foreground">
        More features like Profile Management and viewing your Favorite Properties are coming soon.
    </div>
  </div>
</template>