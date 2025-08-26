<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
// import { Button } from './ui/button';
import UserNav from './UserNav.vue';
import Logo from './Logo.vue';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';

import { Menu, Home, Building2, ChevronDown, Factory, Wheat, Pickaxe, Truck, Hotel, Building, MapIcon, BookOpen, Phone, Info, Briefcase, Castle, Warehouse, ShoppingBag, TrendingUp, XIcon, LandPlot, User, Heart, LogOut, MessageSquare, LayoutDashboard } from 'lucide-vue-next';


const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
const isLessor = computed(() => authStore.isLessor);



const rentOptions = computed(() => [
  { name: 'apartment', icon: Building2, },
  { name: 'villa', icon: Castle, },
  { name: 'house', icon: Home, },
  { name: 'office', icon: Briefcase,},
  { name: 'land', icon: LandPlot,},
  { name: 'building', icon: Building,},
  { name: 'shop', icon: ShoppingBag,},
  { name: 'studio', icon: Building,},
  { name: 'guesthouse', icon: Home, },
  { name: 'warehouse', icon: Warehouse, },
  { name: 'others', icon: Building, },
]
);

const buyOptions = computed(() => [
  { name: 'apartment', icon: Building2, },
  { name: 'villa', icon: Castle,},
    { name: 'house', icon: Home, },
     { name: 'office', icon: Briefcase,},

  { name: 'land', icon: LandPlot,},
   { name: 'building', icon: Building,},
  { name: 'shop', icon: ShoppingBag,},
   { name: 'studio', icon: Building,},
  { name: 'guesthouse', icon: Home },
  { name: 'warehouse', icon: Warehouse, },
  { name: 'others', }
]);

const investmentOptions = computed(() => [
    { name: manufacturing, icon: Factory,   },
    { name: agriculture, icon: Wheat,   },
    { name: mining, icon: Pickaxe,   },
    { name: transport, icon: Truck,  },
    { name: hotel, icon: Hotel,  },
    { name: buildings, icon: Building,   },
]);

const othersOptions = computed(() => [
  { name: about, icon: Info, href: "/about" },
  { name: blog, icon: BookOpen, href: "/blog" },
  { name: contact, icon: Phone, href: "/contact" },
]);

const mobileMenuOpen = ref(false);
</script>

<template>
  <nav>
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">

        <Logo />

        <div class="hidden lg:flex items-center space-x-8">
          <!-- Rent Dropdown -->
          <dropdown-menu>
            <dropdown-menu-trigger as-child>
              <Button variant="ghost" class="font-medium p-0 h-auto relative group hover:bg-transparent focus-visible:bg-transparent dark:hover:text-orange-400 hover:text-orange-500">
                rent <ChevronDown :size="16" class="ml-1" />
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all"></span>
              </Button>
            </dropdown-menu-trigger>
            <dropdown-menu-content align="start" class="w-56">
              <dropdown-menu-item v-for="option in rentOptions" :key="option.name" as-child>
                <a class="flex items-center space-x-3 cursor-pointer">
                  <component :is="option.icon" :size="16" class="text-gray-500" />
                  <span class="text-sm">{{ option.name }}</span>
                </a>
              </dropdown-menu-item>
            </dropdown-menu-content>
          </dropdown-menu>

          <!-- Buy Dropdown -->
          <dropdown-menu>
            <dropdown-menu-trigger as-child>
              <Button variant="ghost" class="font-medium p-0 h-auto relative group hover:bg-transparent focus-visible:bg-transparent dark:hover:text-orange-400 hover:text-orange-500">
                buy <ChevronDown :size="16" class="ml-1" />
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all"></span>
              </Button>
            </dropdown-menu-trigger>
            <dropdown-menu-content align="start" class="w-56">
              <dropdown-menu-item v-for="option in buyOptions" :key="option.name" as-child>
                <a  class="flex items-center space-x-3 cursor-pointer">
                  <component :is="option.icon" :size="16" class="text-gray-500" />
                  <span class="text-sm">{{ option.name }}</span>
                </a>
              </dropdown-menu-item>
            </dropdown-menu-content>
          </dropdown-menu>

          <!-- Sell Link -->
          <a  class="text-gray-700 dark:text-gray-300 hover:text-orange-500 relative group font-medium">
            sell
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all"></span>
          </a>

          <!-- Investment Menu -->
          <dropdown-menu>
            <dropdown-menu-trigger as-child>
              <Button variant="ghost" class="font-medium p-0 h-auto relative group hover:bg-transparent focus-visible:bg-transparent dark:hover:text-orange-400 hover:text-orange-500">
                investment<ChevronDown :size="16" class="ml-1" />
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all"></span>
              </Button>
            </dropdown-menu-trigger>
            <dropdown-menu-content align="start" class="w-[32rem] p-4">
              <div class="grid grid-cols-2 gap-4">
                <dropdown-menu-item v-for="option in investmentOptions" :key="option.name" as-child>
                  <a  class="flex flex-col space-y-1 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 group cursor-pointer">
                    <div class="flex items-center space-x-2">
                      <component :is="option.icon" :size="20" class="text-orange-500" />
                      <span class="text-sm font-medium text-gray-900 dark:text-white">{{ option.name }}</span>
                    </div>
                    <!-- <span class="text-xs text-gray-600 dark:text-gray-400 pl-7">{{ option.description }}</span> -->
                  </a>
                </dropdown-menu-item>
              </div>
            </dropdown-menu-content>
          </dropdown-menu>

          <!-- Others Dropdown -->
          <dropdown-menu>
            <dropdown-menu-trigger as-child>
              <Button variant="ghost" class="font-medium p-0 h-auto relative group hover:bg-transparent focus-visible:bg-transparent dark:hover:text-orange-400 hover:text-orange-500">
                others <ChevronDown :size="16" class="ml-1" />
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all"></span>
              </Button>
            </dropdown-menu-trigger>
            <dropdown-menu-content align="start" class="w-48">
              <dropdown-menu-item v-for="option in othersOptions" :key="option.name" as-child>
                <a  class="flex items-center space-x-3 cursor-pointer">
                  <component :is="option.icon" :size="16" class="text-gray-500" />
                  <span class="text-sm">{{ option.name }}</span>
                </a>
              </dropdown-menu-item>
            </dropdown-menu-content>
          </dropdown-menu>
        </div>

        <div class="flex items-center space-x-4">
        <!-- Authenticated User View -->
        <div v-if="isLoggedIn" class="flex items-center space-x-4">
           <Button v-if="isLessor" to="/dashboard/lessor/add-property" size="sm" class="hidden sm:flex">
             <Plus class="h-4 w-4 mr-2"/>
             Add Property
           </Button>
           <UserNav />
        </div>
         <!-- Guest View -->
         <div v-else class="hidden md:flex items-center space-x-4">
          <Button variant="ghost" to="/auth/login">Login</Button>
          <Button to="/auth/login?action=add-property" size="sm">
            + Add Property
          </Button>
        </div>

       </div>
        

          <!-- Logged In View -->
         

          <!-- Mobile Menu -->
          <div class="md:hidden">
          <Button variant="ghost" size="sm" @click="mobileMenuOpen = !mobileMenuOpen">
            <span class="sr-only">Open menu</span>
            <Menu v-if="!mobileMenuOpen" class="h-6 w-6" />
            <X v-else class="h-6 w-6" />
          </Button>
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
</style>