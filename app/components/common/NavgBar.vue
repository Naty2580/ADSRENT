<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import UserNav from './UserNav.vue';
import Logo from './Logo.vue';
import { DropdownMenuRoot, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,  DropdownMenuTrigger } from 'radix-vue';

import { Menu, Home, Building2, ChevronDown, Factory, Wheat, Pickaxe, Truck, Hotel, Building,  BookOpen, Phone, Info, Briefcase, Castle, Warehouse, ShoppingBag, TrendingUp, XIcon, LandPlot, User, Plus  } from 'lucide-vue-next';
import Button from '../ui/Button.vue';
import MegaMenuContent from './MegaMenuContent.vue';


const isScrolled = ref(false)

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
  }
  window.addEventListener('scroll', handleScroll)
  handleScroll()
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})


const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
const isLessor = computed(() => authStore.isLessor);



const rentOptions = computed(() => [
  { name: 'Apartment', icon: Building2, to: '/properties?listingType=rent?propertyType=apartment' },
  { name: 'Villa', icon: Castle, to: '/properties?listingType=rent?propertyType=villa' },
  { name: 'House', icon: Home, to: '/properties?listingType=rent?propertyType=house' },
  { name: 'Office', icon: Briefcase, to: '/properties?listingType=rent?propertyType=office' },
  { name: 'Land', icon: LandPlot, to: '/properties?listingType=rent?propertyType=land' },
  { name: 'Building', icon: Building, to: '/properties?listingType=rent?propertyType=building' },
  { name: 'Shop', icon: ShoppingBag, to: '/properties?listingType=rent?propertyType=shop' },
  { name: 'Studio', icon: Building, to: '/properties?listingType=rent?propertyType=studio' },
  { name: 'Guesthouse', icon: Home, to: '/properties?listingType=rent?propertyType=guesthouse' },
  { name: 'Warehouse', icon: Warehouse, to: '/properties?listingType=rent?propertyType=warehouse' },
  { name: 'Others', icon: Building, to: '/properties?listingType=rent?propertyType=others' },
]
);

const buyOptions = computed(() => [
  { name: 'Apartment', icon: Building2, to: '/properties?listingType=buy?propertyType=apartment' },
  { name: 'Villa', icon: Castle, to: '/properties?listingType=buy?propertyType=villa' },
  { name: 'House', icon: Home,  to: '/properties?listingType=buy?propertyType=house' },
  { name: 'Office', icon: Briefcase, to: '/properties?listingType=buy?propertyType=office' },
  { name: 'Land', icon: LandPlot, to: '/properties?listingType=buy?propertyType=land' },
  { name: 'Building', icon: Building, to: '/properties?listingType=buy?propertyType=building' },
  { name: 'Shop', icon: ShoppingBag, to: '/properties?listingType=buy?propertyType=shop' },
  { name: 'Studio', icon: Building, to: '/properties?listingType=buy?propertyType=studio' },
  { name: 'Guesthouse', icon: Home, to: '/properties?listingType=buy?propertyType=guesthouse' },
  { name: 'Warehouse', icon: Warehouse, to: '/properties?listingType=buy?propertyType=warehouse' },
  { name: 'Others', }
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
  { name: "About", icon: Info, href: "/contact/about" },
  { name: "Blog", icon: BookOpen, href: "/contact/about" },
  { name: "Contact", icon: Phone, href: "/contact" },
]);

const mobileMenuOpen = ref(false);
</script>

<template>
  <nav 
  :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
        : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
    ]">
     <div class="container mx-auto flex items-center justify-between h-16 px-4">
        
        <div class="flex items-center gap-x-8">
            <Logo :class="[isScrolled || isLoggedIn ? 'text-foreground' : 'text-white']" />
            <div class="hidden lg:flex items-center space-x-8">
                <!-- Rent Mega Menu -->
                <DropdownMenuRoot>
                    <DropdownMenuTrigger class="nav-link text-black" >
                        <span>Rent</span><ChevronDown class="h-4 w-4"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" class="w-[40rem] p-6">
                        <MegaMenuContent listing-type="rent"/>
                    </DropdownMenuContent>
                </DropdownMenuRoot>

                <!-- Buy Mega Menu -->
                <DropdownMenuRoot>
                    <DropdownMenuTrigger class="nav-link text-black" >
                        <span>Buy</span><ChevronDown class="h-4 w-4"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" class="w-[40rem] p-6">
                        <MegaMenuContent listing-type="sale"/>
                    </DropdownMenuContent>
                </DropdownMenuRoot>

              

                <!-- Investment (compacted) -->
                <DropdownMenuRoot>
                    <DropdownMenuTrigger class="nav-link text-black" >
                        <span>Investment</span><ChevronDown class="h-4 w-4"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" class="w-60 p-2 bg-white/90 backdrop-blur-lg shadow-lg grid grid-cols-2">
                        <DropdownMenuItem v-for="option in investmentOptions" :key="option.name" asChild>
                            <NuxtLink to="/investment" class="flex items-center gap-3 p-2 rounded-md transition-colors hover:bg-muted"><component :is="option.icon" class="h-5 w-5 text-primary"/><span>{{ option.name }}</span></NuxtLink>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenuRoot>

                <!-- Investment (compacted) -->
                <DropdownMenuRoot>
                    <DropdownMenuTrigger class="nav-link text-black" >
                        <span>Others</span><ChevronDown class="h-4 w-4"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" class="w-60 p-2 bg-white/90 backdrop-blur-lg shadow-lg ">
                        <DropdownMenuItem v-for="option in othersOptions" :key="option.name" asChild>
                            <NuxtLink :to='option.href' class="flex items-center gap-3 p-2 rounded-md transition-colors hover:bg-muted"><component :is="option.icon" class="h-5 w-5 text-primary"/><span>{{ option.name }}</span></NuxtLink>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenuRoot> 
            </div>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Auth Buttons -->
          <div v-if="isLoggedIn" class="flex items-center gap-x-4 bg-transparent">
            <Button v-if="isLessor" to="/dashboard/lessor/add-property" size="sm" class="hidden sm:flex">+ Add Property</Button>
            <UserNav />
          </div>
          <div v-else class="hidden lg:flex items-center space-x-2">
            <NuxtLink  to="/auth/login" > 
              <Button variant="ghost"> Login </Button>
            </NuxtLink>
            
          </div>
          
          <!-- Mobile Menu Trigger -->
           <div class="lg:hidden"><Button variant="ghost" size="sm"><Menu class="h-6 w-6"/></Button></div>
        </div>
        
    </div>
  </nav>
</template>

<style scoped>
/* Scoped styles unchanged */
/* //add smoothe transition to all movements or anything */
:root {
  transition: all 0.2s ease-in-out;
}
.nav-link {
    @apply inline-flex items-center gap-x-1 text-sm font-semibold transition-colors hover:text-primary focus:outline-none;
}
</style>