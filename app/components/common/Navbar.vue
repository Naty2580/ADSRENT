<script setup>
import { Menu, X, Plus } from 'lucide-vue-next';
import { useAuthStore } from '~/stores/auth';
import Logo from './Logo.vue';
import Button from '../ui/Button.vue';
import UserNav from './UserNav.vue'; // <-- Import the new component

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
const isLessor = computed(() => authStore.isLessor);

const navLinks = [
  { name: 'Buy', to: '/properties?listingType=sale' },
  { name: 'Rent', to: '/properties?listingType=rent' },
  { name: 'contact', to: '/contact' },
];

const mobileMenuOpen = ref(false);
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <div class="flex items-center space-x-6">
        <Logo />
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-6 text-sm font-medium">
          <NuxtLink v-for="link in navLinks" :key="link.name" :to="link.to" class="text-foreground/60 transition-colors hover:text-foreground/80">
            {{ link.name }}
          </NuxtLink>
        </nav>
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

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <Button variant="ghost" size="sm" @click="mobileMenuOpen = !mobileMenuOpen">
            <span class="sr-only">Open menu</span>
            <Menu v-if="!mobileMenuOpen" class="h-6 w-6" />
            <X v-else class="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
    <!-- Mobile Menu (To be implemented fully later) -->
    <div v-if="mobileMenuOpen" class="md:hidden p-4 border-t">
       <!-- Dynamic mobile links will go here -->
      <p class="text-center text-muted-foreground">Mobile Menu Coming Soon</p>
    </div>
  </header>
</template>