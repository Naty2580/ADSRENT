<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import UserNav from './UserNav.vue';
import Logo from './Logo.vue';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSubTrigger } from './ui/dropdown-menu';

import { DropdownMenuRoot, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from 'radix-vue';

import { Menu, Home, Building2, ChevronDown, Factory, Wheat, Pickaxe, Truck, Hotel, Building, MapIcon, BookOpen, Phone, Info, Briefcase, Castle, Warehouse, ShoppingBag, TrendingUp, XIcon, LandPlot, User, Heart, LogOut, MessageSquare, LayoutDashboard } from 'lucide-vue-next';


const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
const isLessor = computed(() => authStore.isLessor);



const rentOptions = computed(() => [
  { name: 'apartment', icon: Building2, to: '/properties?listingType=rent?propertyType=apartment' },
  { name: 'villa', icon: Castle, to: '/properties?listingType=rent?propertyType=villa' },
  { name: 'house', icon: Home, to: '/properties?listingType=rent?propertyType=house' },
  { name: 'office', icon: Briefcase, to: '/properties?listingType=rent?propertyType=office' },
  { name: 'land', icon: LandPlot, to: '/properties?listingType=rent?propertyType=land' },
  { name: 'building', icon: Building, to: '/properties?listingType=rent?propertyType=building' },
  { name: 'shop', icon: ShoppingBag, to: '/properties?listingType=rent?propertyType=shop' },
  { name: 'studio', icon: Building, to: '/properties?listingType=rent?propertyType=studio' },
  { name: 'guesthouse', icon: Home, to: '/properties?listingType=rent?propertyType=guesthouse' },
  { name: 'warehouse', icon: Warehouse, to: '/properties?listingType=rent?propertyType=warehouse' },
  { name: 'others', icon: Building, to: '/properties?listingType=rent?propertyType=others' },
]
);

const buyOptions = computed(() => [
  { name: 'apartment', icon: Building2, to: '/properties?listingType=buy?propertyType=apartment' },
  { name: 'villa', icon: Castle, to: '/properties?listingType=buy?propertyType=villa' },
  { name: 'house', icon: Home,  to: '/properties?listingType=buy?propertyType=house' },
  { name: 'office', icon: Briefcase, to: '/properties?listingType=buy?propertyType=office' },
  { name: 'land', icon: LandPlot, to: '/properties?listingType=buy?propertyType=land' },
  { name: 'building', icon: Building, to: '/properties?listingType=buy?propertyType=building' },
  { name: 'shop', icon: ShoppingBag, to: '/properties?listingType=buy?propertyType=shop' },
  { name: 'studio', icon: Building, to: '/properties?listingType=buy?propertyType=studio' },
  { name: 'guesthouse', icon: Home, to: '/properties?listingType=buy?propertyType=guesthouse' },
  { name: 'warehouse', icon: Warehouse, to: '/properties?listingType=buy?propertyType=warehouse' },
  { name: 'others', }
]);

const investmentOptions = computed(() => [
  { name: "manufacturing", icon: Factory, },
  { name: "agriculture", icon: Wheat, },
  { name: "mining", icon: Pickaxe, },
  { name: "transport", icon: Truck, },
  { name: "hotel", icon: Hotel, },
  { name: "buildings", icon: Building, },
]);

const othersOptions = computed(() => [
  { name: "about", icon: Info, href: "/contact/about" },
  { name: "blog", icon: BookOpen, href: "/contact/blog" },
  { name: "contact", icon: Phone, href: "/contact" },
]);

const mobileMenuOpen = ref(false);
</script>

<template>
  <nav class=" bg-black/15 dark:bg-gray-900/95 z-50 backdrop-blur-md shadow-lg ">
    <div class="container mx-auto px-4 ">

      <div class="  flex items-center justify-between h-16">

        <Logo />

        <div class="hidden lg:flex items-center space-x-8">
          <!-- Rent Dropdown -->
          <dropdown-menu-root>
            <dropdown-menu-trigger as-child>
              <UiButton variant="ghost"
                class="font-medium p-0 h-auto relative group hover:bg-transparent focus-visible:bg-transparent dark:hover:text-orange-400 hover:text-orange-500">
                rent
                <ChevronDown :size="16" class="ml-1" />
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all"></span>
              </UiButton>
            </dropdown-menu-trigger>
            <dropdown-menu-content align="start" class="w-56 bg-white z-50 shadow-lg shadow-black/30">
              <dropdown-menu-item v-for="option in rentOptions" :key="option.name" as-child>
                <a
                  :href="option.to"
                  class="flex items-center space-x-3 cursor-pointer hover:ring-1 ring-orange-600 hover:text-orange-400 mx-2">
                  <component :is="option.icon" :size="16" class="text-gray-800" />
                  <span class="text-sm ">{{ option.name }}</span>
                </a>
              </dropdown-menu-item>
            </dropdown-menu-content>
          </dropdown-menu-root>

          <!-- Buy Dropdown -->
          <dropdown-menu-root>
            <dropdown-menu-trigger as-child>
              <UiButton variant="ghost"
                class="font-medium p-0 h-auto relative group hover:bg-transparent focus-visible:bg-transparent dark:hover:text-orange-400 hover:text-orange-500">
                buy
                <ChevronDown :size="16" class="ml-1" />
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all"></span>
              </UiButton>
            </dropdown-menu-trigger>
            <dropdown-menu-content align="start" class="w-56 bg-white z-50 shadow-lg shadow-black/30">
              <dropdown-menu-item v-for="option in buyOptions" :key="option.name" as-child>
                <a
                  :href="option.to"
                  class="flex items-center space-x-3 cursor-pointer hover:ring-1 ring-orange-600 hover:text-orange-400  mx-2">
                  <component :is="option.icon" :size="16" class="text-gray-800" />
                  <span class="text-sm ">{{ option.name }}</span>
                </a>
              </dropdown-menu-item>
            </dropdown-menu-content>
          </dropdown-menu-root>



          <!-- Sell Link -->
          <a class="text-gray-700 dark:text-gray-300 hover:text-orange-500 relative group font-medium">
            sell
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all"></span>
          </a>

          <!-- Investment Menu -->
          <dropdown-menu-root>
            <dropdown-menu-trigger as-child>
              <UiButton variant="ghost"
                class="font-medium p-0 h-auto relative group hover:bg-transparent focus-visible:bg-transparent dark:hover:text-orange-400 hover:text-orange-500">
                investment
                <ChevronDown :size="16" class="ml-1" />
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all"></span>
              </UiButton>
            </dropdown-menu-trigger>
            <dropdown-menu-content align="start" class="w-[32rem] p-4 z-50 bg-white shadow-lg shadow-black/30">
              <div class="grid grid-cols-2 gap-4">
                <dropdown-menu-item v-for="option in investmentOptions" :key="option.name" as-child>
                  <a
                    class="flex flex-col space-y-1 p-3 rounded-lg hover:bg-orange-300 dark:hover:bg-gray-700 group border border-gray-300 dark:border-gray-700 cursor-pointer">
                    <div class="flex items-center space-x-2">
                      <component :is="option.icon" :size="20" class="text-orange-500" />
                      <span class="text-sm font-medium text-gray-900 dark:text-white">{{ option.name }}</span>
                    </div>
                    <!-- <span class="text-xs text-gray-600 dark:text-gray-400 pl-7">{{ option.description }}</span> -->
                  </a>
                </dropdown-menu-item>
              </div>
            </dropdown-menu-content>
          </dropdown-menu-root>

          <!-- Others Dropdown -->
          <dropdown-menu-root>
            <dropdown-menu-trigger as-child>
              <UiButton variant="ghost"
                class="font-medium p-0 h-auto relative group hover:bg-transparent focus-visible:bg-transparent dark:hover:text-orange-400 hover:text-orange-500">
                others
                <ChevronDown :size="16" class="ml-1" />
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all"></span>
              </UiButton>
            </dropdown-menu-trigger>
            <dropdown-menu-content align="start" class="w-48 z-50 bg-white shadow-lg shadow-black/30 p-1">
              <dropdown-menu-item v-for="option in othersOptions" :key="option.name" as-child>
                <a
                  :href="option.href"
                  class="flex items-center space-x-3 cursor-pointer hover:ring-1 ring-orange-600 hover:text-orange-400 mx-2 mb-2.5">
                  <component :is="option.icon" :size="16" class="text-gray-500" />
                  <span class="text-sm">{{ option.name }}</span>
                </a>
              </dropdown-menu-item>
            </dropdown-menu-content>
          </dropdown-menu-root>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Authenticated User View -->
          <div v-if="isLoggedIn" class="flex items-center space-x-4">
            <UiButton v-if="isLessor" to="/dashboard/lessor/add-property" size="sm" class="hidden sm:flex">
              <Plus class="h-4 w-4 mr-2" />
              Add Property
            </UiButton>
            <UserNav />
          </div>
          <!-- Guest View -->
          <div v-else class="hidden md:flex items-center space-x-4">
            <UiButton variant="ghost" to="/auth/login">Login</UiButton>
          </div>

        </div>


        <!-- Mobile Menu -->
        <div class="md:hidden">
          <UiButton variant="ghost" size="sm" @click="mobileMenuOpen = !mobileMenuOpen">
            <span class="sr-only">Open menu</span>
            <Menu v-if="!mobileMenuOpen" class="h-6 w-6" />
            <X v-else class="h-6 w-6" />
          </UiButton>
        </div>


      </div>

    </div>

    <div v-if="mobileMenuOpen" class="md:hidden p-4 border-t">
      <!-- Dynamic mobile links will go here -->
      <p class="text-center text-muted-foreground">Mobile Menu Coming Soon</p>
    </div>

  </nav>
</template>

<style scoped>
/* Scoped styles unchanged */
/* //add smoothe transition to all movements or anything */
:root {
  transition: all 0.2s ease-in-out;
}
</style>