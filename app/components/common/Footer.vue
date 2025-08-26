<script setup>
import Logo from './Logo.vue';

const footerLinks = [
  {
    title: 'Quick Links',
    links: [
      { name: 'About Us', to: '#' },
      { name: 'Contact Us', to: '#' },
      { name: 'Blog', to: '/blog' },
      { name: 'Investment', to: '#' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { name: 'Properties for Sale', to: '#' },
      { name: 'Properties for Rent', to: '#' },
      { name: 'Featured Cities', to: '#' },
    ],
  },
  {
    title: 'For Lessors',
    links: [
      { name: 'List a Property', to: '#' },
      { name: 'My Dashboard', to: '#' },
      { name: 'Pricing', to: '#' },
    ],
  },
];
</script>

<template>
  <footer class="border-t bg-secondary/50">
    <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div class="col-span-1 lg:col-span-2 pr-8">
          <Logo />
          <p class="mt-4 text-muted-foreground text-sm">
            The easiest way to find your next home. We connect you with the best properties for sale and rent across Ethiopia.
          </p>
        </div>

        <div v-for="section in footerLinks" :key="section.title" class="col-span-1">
          <h3 class="font-display font-semibold text-foreground">{{ section.title }}</h3>
          <ul class="mt-4 space-y-2">
            <li v-for="link in section.links" :key="link.name">
              <NuxtLink :to="link.to" class="text-sm text-muted-foreground hover:text-primary transition-colors">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>&copy; {{ new Date().getFullYear() }} AdissRent. All rights reserved.</p>
        <div class="flex space-x-4 mt-4 md:mt-0">
          <NuxtLink to="#" class="hover:text-primary">Terms of Service</NuxtLink>
          <NuxtLink to="#" class="hover:text-primary">Privacy Policy</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>