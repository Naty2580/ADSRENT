<script setup>
import { useAuthStore } from '~/stores/auth';
import { Home, Upload, Eye, MessageSquare, Settings as SettingsIcon, Shield, Users, Building2, User, Bell, ChevronDown, LogOut, Sun, Moon, Inbox } from 'lucide-vue-next';
import Button from '~/components/ui/Button.vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const isLessor = computed(() => authStore.isLessor);
const isAdmin = computed(() => authStore.isAdmin);

const showProfileMenu = ref(false);

const navigationItems = computed(() => {
  const baseItems = [
    { id: 'dashboard', label: 'Dashboard Overview', to: '/dashboard', icon: Eye, roles: ['seeker', 'lessor', 'admin'] },
    { id: 'profile', label: 'Account Settings', to: '/dashboard/profile', icon: SettingsIcon, roles: ['seeker', 'lister', 'admin'] },
  ];
  const seekerItems = [
    { id: 'favorites', label: 'My Favorites', to: '/dashboard/favorites', icon: Home, roles: ['seeker'] },
    { id: 'my_bookings', label: 'My Bookings' , to: '/dashboard/seeker/my-bookings', icon: Inbox, roles: ['seeker']}
  ];
  const lessorItems = [
    { id: 'add-property', label: 'Add Property', to: '/dashboard/lessor/add-property', icon: Upload, roles: ['lister'] },
    { id: 'my-listings', label: 'My Listings', to: '/dashboard/lessor/listings', icon: Building2, roles: ['lister'] },
    { id: 'bookings', label: 'Booking Requests', to: '/dashboard/lessor/bookings', icon: Inbox, roles: ['lister'] },
  ];
   const adminItems = [
    { isSeparator: true, roles: ['admin']},
    { id: 'admin-overview', label: 'Admin Overview', to: '/dashboard/admin', icon: Shield, roles: ['admin'] },
    { id: 'admin-users', label: 'Manage Users', to: '/dashboard/admin/users', icon: Users, roles: ['admin'] },
    { id: 'admin-listings', label: 'Manage Listings', to: '/dashboard/admin/listings', icon: Building2, roles: ['admin'] },
  ];
  
  return [
      ...baseItems,
      ...(isLessor.value ? lessorItems : seekerItems),
      ...(isAdmin.value ? adminItems : [])
  ];
});

// For dark mode - you can wire this up to a color mode module later
const isDarkMode = ref(false);
function toggleDarkMode() { isDarkMode.value = !isDarkMode.value; }
</script>

<template>
  <div :class="{ 'dark': isDarkMode }" class="h-screen bg-secondary/50 overflow-hidden">
    <div class="flex h-full">
      <!-- Left Sidebar -->
      <aside class="fixed inset-y-0 left-0 w-64 bg-card border-r flex flex-col z-40">
        <div class="p-6 border-b"><CommonLogo /></div>
        <nav class="flex-1 p-4">
          <ul class="space-y-2">
            <template v-for="(item, index) in navigationItems" :key="index">
                <div v-if="item.isSeparator" class="pt-2 mt-2 border-t"></div>
                <li v-else>
                    <NuxtLink :to="item.to"
                      class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      active-class="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    >
                      <component :is="item.icon" class="h-5 w-5" />
                      <span class="font-medium text-sm">{{ item.label }}</span>
                    </NuxtLink>
                </li>
            </template>
          </ul>
        </nav>
        <div class="p-4 border-t">
          <Button variant="outline" size="sm" @click="toggleDarkMode" class="w-full justify-start">
            <component :is="isDarkMode ? Sun : Moon" class="h-4 w-4 mr-2" />
            {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
          </Button>
        </div>
      </aside>

      <!-- Main Content Area -->
      <div class="h-full ml-64 flex-1 flex flex-col">
        <!-- Top Navbar -->
        <header class="bg-card border-b h-20 flex-shrink-0 flex items-center px-6">
          <div class="flex items-center justify-end w-full">
            <div class="flex items-center gap-4">
              <Button variant="outline" size="sm"><Bell class="h-4 w-4 mr-2" />Notifications</Button>
              <div class="relative">
                <button @click="showProfileMenu = !showProfileMenu" class="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <img :src="`https://ui-avatars.com/api/?name=${user?.name}&background=random`" class="h-8 w-8 rounded-full" />
                  <div class="hidden md:block text-left">
                    <p class="text-sm font-medium">{{ user?.name }}</p>
                    <p class="text-xs text-muted-foreground capitalize">{{ authStore.roles.join(', ') }}</p>
                  </div>
                  <ChevronDown class="h-4 w-4 text-muted-foreground" />
                </button>
                <div v-if="showProfileMenu" class="absolute right-0 mt-2 w-48 bg-card border rounded-lg shadow-lg z-50">
                  <div class="p-2">
                    <NuxtLink to="/dashboard/profile" @click="showProfileMenu = false"><Button variant="ghost" class="w-full justify-start"><SettingsIcon class="h-4 w-4 mr-2"/>Account Settings</Button></NuxtLink>
                    <hr class="my-1" />
                    <Button variant="ghost" @click="authStore.logout()" class="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"><LogOut class="h-4 w-4 mr-2" />Sign Out</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Main Scrollable Content -->
        <main class="flex-1 overflow-auto p-6">

          <NuxtPage />
          
        </main>
      </div>
    </div>
  </div>
</template>