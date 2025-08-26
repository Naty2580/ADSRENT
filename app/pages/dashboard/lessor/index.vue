<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

import { 
  MoonIcon, 
  SunIcon, 
  HomeIcon, 
  UploadIcon, 
  EyeIcon, 
  MessageSquareIcon, 
  SettingsIcon,
  User,
  Bell,
  ChevronDown,
  Settings,
  LogOut
} from 'lucide-vue-next';

const isDarkMode = ref(false);
const activeSection = ref('dashboard');
const showProfileMenu = ref(false);

const userData = {
  name: 'Tadesse Girma',
  role: 'lessor', // Can be 'lessor' or 'seller'
  stats: {
    totalProperties: 8,
    totalBookings: 23,
    totalEarnings: 125000,
    rentedProperties: 5,
  },
};

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard Overview',
    icon: EyeIcon,
    description: 'View your property management overview'
  },
  {
    id: 'add-property',
    label: 'Add Property',
    icon: UploadIcon,
    description: 'Add a new property to your portfolio'
  },
  {
    id: 'my-listings',
    label: 'My Listings',
    icon: HomeIcon,
    description: 'Manage your property listings'
  },
  {
    id: 'bookings',
    label: 'Booking Requests',
    icon: MessageSquareIcon,
    badge: { text: '3', variant: 'destructive' },
    description: 'Review and manage booking requests'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: SettingsIcon,
    description: 'Manage your account settings'
  }
];

function getCurrentSectionTitle() {
  const currentItem = navigationItems.find(item => item.id === activeSection.value);
  return currentItem ? currentItem.label : 'Dashboard';
}

function getCurrentSectionDescription() {
  const currentItem = navigationItems.find(item => item.id === activeSection.value);
  return currentItem ? currentItem.description : 'View your property management overview';
}

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark');
}

function handleNavigation(section) {
  activeSection.value = section;
}

function toggleProfileMenu() {
  showProfileMenu.value = !showProfileMenu.value;
}

function navigateToSettings() {
  activeSection.value = 'settings';
  showProfileMenu.value = false;
}

function logout() {
  // Implement actual logout logic
  console.log('Logging out...');
  showProfileMenu.value = false;
}


</script>

<template>
    <div >
      <div class="h-screen bg-background overflow-hidden">
        <!-- Left Sidebar -->
        <aside class="fixed inset-y-0 left-0 w-64 bg-card border-r border-border flex flex-col z-40">
          <!-- Logo Section -->
          <div class="p-6 border-b border-border">
            <div class="flex items-center gap-3">
              <div class="bg-gradient-to-r from-primary via-secondary to-accent p-2 rounded-lg">
                <HomeIcon class="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 class="text-primary font-bold text-lg">AddisRent</h1>
                <p class="text-muted-foreground text-sm">Lessor Dashboard</p>
              </div>
            </div>
          </div>
  
          <!-- Navigation Menu -->
          <nav class="flex-1 p-4">
            <ul class="space-y-2">
              <li v-for="item in navigationItems" :key="item.id">
                <button
                  @click="activeSection = item.id"
                  :class="[
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200',
                    activeSection === item.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  ]"
                >
                  <component :is="item.icon" class="h-5 w-5" />
                  <span class="font-medium">{{ item.label }}</span>
                  <Badge v-if="item.badge" :variant="item.badge.variant" class="ml-auto">
                    {{ item.badge.text }}
                  </Badge>
                </button>
              </li>
            </ul>
          </nav>
  
          <!-- Sidebar Footer -->
          <div class="p-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              @click="toggleDarkMode"
              class="w-full justify-start"
            >
              <template v-if="isDarkMode">
                <SunIcon class="h-4 w-4 mr-2" />
                Light Mode
              </template>
              <template v-else>
                <MoonIcon class="h-4 w-4 mr-2" />
                Dark Mode
              </template>
            </Button>
          </div>
        </aside>
  
        <!-- Main Content Area -->
        <div class="h-full pl-64 flex flex-col">
          <!-- Top Navbar -->
          <header class="fixed top-0 left-64 right-0 z-30 bg-card border-b border-border h-20 flex items-center px-6">
            <div class="flex items-center justify-between w-full">
              <div>
                <h2 class="text-xl font-semibold text-foreground">
                  {{ getCurrentSectionTitle() }}
                </h2>
                <p class="text-muted-foreground text-sm">
                  {{ getCurrentSectionDescription() }}
                </p>
              </div>
              
              <!-- User Profile Menu -->
              <div class="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Bell class="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                <div class="relative profile-menu-container">
                  <button
                    @click="toggleProfileMenu"
                    class="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Avatar class="h-8 w-8">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                        alt="User" 
                        class="h-full w-full rounded-full object-cover"
                      />
                      <div class="h-full w-full rounded-full bg-gray-200 flex items-center justify-center">
                        <User class="h-4 w-4 text-gray-500" />
                      </div>
                    </Avatar>
                    <div class="hidden md:block text-left">
                      <p class="text-sm font-medium">{{ userData.name }}</p>
                      <p class="text-xs text-muted-foreground">{{ userData.role === 'lessor' ? 'Property Owner' : 'Property Seller' }}</p>
                    </div>
                    <ChevronDown class="h-4 w-4 text-muted-foreground" />
                  </button>
  
                  <!-- Profile Dropdown Menu -->
                  <div 
                    v-if="showProfileMenu"
                    class="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50"
                  >
                    <div class="p-2">
                      <button
                        @click="navigateToSettings"
                        class="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted/50 transition-colors"
                      >
                        <Settings class="h-4 w-4" />
                        Account Settings
                      </button>
                      <button
                        @click="toggleDarkMode"
                        class="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted/50 transition-colors"
                      >
                        <MoonIcon v-if="!isDarkMode" class="h-4 w-4" />
                        <SunIcon v-else class="h-4 w-4" />
                        {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
                      </button>
                      <hr class="my-2 border-border" />
                      <button
                        @click="logout"
                        class="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <LogOut class="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
  
          <!-- Main Content -->
          <main class="flex-1 overflow-auto p-6 pt-20">
            <div v-if="activeSection === 'dashboard'" class="space-y-6">
              <DashboardOverview 
                :stats="userData.stats" 
                :user="userData"
                @navigate="handleNavigation"
              />
            </div>
            <div v-else-if="activeSection === 'add-property'" class="space-y-6">
              <PropertyForm />
            </div>
            <div v-else-if="activeSection === 'my-listings'" class="space-y-6">
              <PropertyListings />
            </div>
            <div v-else-if="activeSection === 'bookings'" class="space-y-6">
              <BookingRequests />
            </div>
            <div v-else-if="activeSection === 'settings'" class="space-y-6">
              <AccountSettings />
            </div>
          </main>
        </div>
      </div>
    </div>
  </template>
  
  
  <style>
  /* Add any custom styles here */
  </style>