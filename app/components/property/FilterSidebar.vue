<script setup>
import { SlidersHorizontal } from 'lucide-vue-next';
import { useSearch } from '~/composables/useSearch.js';
import Button from '../ui/Button.vue';

const { filters } = useSearch();

const propertyTypes = ['apartment', 'house', 'office', 'land', 'villa', 'condo'];
</script>

<template>
  <aside class="w-full bg-card p-6 rounded-lg shadow-md">
    <div class="flex items-center justify-between pb-4 border-b">
       <h3 class="font-display text-xl font-semibold">Filters</h3>
       <SlidersHorizontal class="h-5 w-5 text-primary" />
    </div>

    <form class="space-y-6 mt-6">
      <!-- Keyword Search -->
      <div>
        <label for="keyword" class="block text-sm font-medium text-foreground">Keyword</label>
        <input v-model="filters.keyword" type="text" id="keyword" placeholder="e.g. Modern, Garden" class="mt-1 w-full rounded-md bg-secondary border-none focus:ring-2 focus:ring-primary">
      </div>

      <!-- Listing Type -->
      <div>
        <label class="block text-sm font-medium text-foreground">Listing Type</label>
        <div class="mt-2 flex space-x-2 rounded-md bg-secondary p-1">
          <button 
            type="button" 
            @click="filters.type = 'rent'" 
            :class="['w-full rounded py-1.5 text-sm font-medium', filters.type === 'rent' ? 'bg-background shadow' : 'hover:bg-background/50']">
            For Rent
          </button>
          <button 
            type="button" 
            @click="filters.type = 'sale'"
            :class="['w-full rounded py-1.5 text-sm font-medium', filters.type === 'sale' ? 'bg-background shadow' : 'hover:bg-background/50']">
            For Sale
          </button>
        </div>
      </div>
      
      <!-- Property Type -->
      <div>
        <label for="property-type" class="block text-sm font-medium text-foreground">Property Type</label>
        <select v-model="filters.propertyType" id="property-type" class="mt-1 w-full rounded-md bg-secondary border-none focus:ring-2 focus:ring-primary">
          <option value="all">All Types</option>
          <option v-for="type in propertyTypes" :key="type" :value="type" class="capitalize">{{ type }}</option>
        </select>
      </div>

      <!-- Price Range -->
      <div>
         <label class="block text-sm font-medium text-foreground">Price Range (ETB)</label>
         <div class="mt-2 grid grid-cols-2 gap-2">
           <input v-model.number="filters.minPrice" type="number" placeholder="Min" class="w-full rounded-md bg-secondary border-none focus:ring-2 focus:ring-primary">
           <input v-model.number="filters.maxPrice" type="number" placeholder="Max" class="w-full rounded-md bg-secondary border-none focus:ring-2 focus:ring-primary">
         </div>
      </div>

      <!-- Bedrooms -->
      <div>
        <label for="bedrooms" class="block text-sm font-medium text-foreground">Bedrooms</label>
        <select v-model="filters.bedrooms" id="bedrooms" class="mt-1 w-full rounded-md bg-secondary border-none focus:ring-2 focus:ring-primary">
          <option value="any">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>
      </div>

    </form>
  </aside>
</template>