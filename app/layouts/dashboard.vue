<script setup>
import { LayoutDashboard, LogOut, User, Building2, Inbox, StarIcon,Shield, Users } from 'lucide-vue-next';
import { useAuthStore } from '~/stores/auth';
import Logo from '~/components/common/Logo.vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const isLessor = computed(() => authStore.isLessor);
const isAdmin = computed(() => authStore.isAdmin);

// Define navigation links. We can expand this later with roles.
const navLinks = computed(() => [
  { icon: LayoutDashboard, text: 'Dashboard', to: '/dashboard' },
  { icon: User, text: 'Profile', to: '/dashboard/profile' },
  { icon: StarIcon, text: 'Favorites', to: '/dashboard/favorites' },
  ...(isLessor.value ? [
      { icon: Building2, text: 'My Listings', to: '/dashboard/lessor/listings' },

      { icon: Inbox, text: 'Booking Requests', to: '/dashboard/lessor/bookings' }, // <-- ADD THIS LINE
    ] : []
  ),
  ...(isAdmin.value ? [ // <-- ADD THIS ADMIN BLOCK
      { isSeparator: true }, // Simple way to visually group links
      { icon: Shield, text: 'Admin Overview', to: '/dashboard/admin' },
      { icon: Users, text: 'Manage Users', to: '/dashboard/admin/users' },
      { icon: Building2, text: 'Manage Listings', to: '/dashboard/admin/listings' },
    ] : []),
]);
</script>

<template>
  <div class="flex h-screen bg-secondary/50">
    <!-- Sidebar -->
    <aside class="w-64 flex-shrink-0 bg-background border-r hidden md:flex flex-col">
      <div class="h-16 flex items-center justify-center border-b px-6">
        <Logo />
      </div>
      <nav class="flex-1 px-4 py-4 space-y-2">
        <NuxtLink 
          v-for="link in navLinks" 
          :key="link.to" 
          :to="link.to" 
          class="flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors text-muted-foreground hover:bg-secondary hover:text-foreground"
          active-class="bg-secondary text-foreground"
        >
          <component :is="link.icon" class="h-5 w-5 mr-3" />
          <span>{{ link.text }}</span>
        </NuxtLink>
      </nav>
      <div class="px-4 py-4 border-t">
         <button 
           @click="authStore.logout"
           class="flex w-full items-center px-4 py-2 text-sm font-medium rounded-md transition-colors text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
           <LogOut class="h-5 w-5 mr-3" />
           <span>Logout</span>
         </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="h-16 flex items-center justify-between bg-background border-b px-6 md:justify-end">
          <!-- Mobile Menu Button will go here -->
          <div class="md:hidden">...</div>
          <!-- User Profile Dropdown -->
          <div v-if="user" class="flex items-center space-x-3">
              <span class="text-sm font-medium text-right hidden sm:inline-block">
                {{ user.name }}
              </span>
              <!-- This will be a dropdown menu later -->
               <img :src="`https://ui-avatars.com/api/?name=${user.name}`" alt="User avatar" class="h-8 w-8 rounded-full" />
          </div>
      </header>
      <main class="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <slot />
      </main>
    </div>
  </div>
</template>