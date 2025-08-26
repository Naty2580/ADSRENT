<script setup>
import { Languages, CircleDollarSign, Files, X } from 'lucide-vue-next';
import { useCompareStore } from '~/stores/compare';
import { useCurrencyStore } from '~/stores/currency';

// const { locales, setLocale } = useI18n();
const compareStore = useCompareStore();
const currencyStore = useCurrencyStore();
const availableCurrencies = ['ETB', 'USD', 'EUR'];

// This ref will control the visibility of the Compare Modal
const isCompareModalOpen = ref(false);
</script>

<template>
  <div class="fixed top-1/2 -translate-y-1/2 left-4 z-40">
    <div class="flex flex-col space-y-3 p-2 bg-card rounded-full border shadow-lg">
      
      <!-- Language Changer -->
      <!-- <div v-for="locale in locales" :key="locale.code">
        <button 
          @click="setLocale(locale.code)" 
          class="h-10 w-10 flex items-center justify-center rounded-full transition-colors hover:bg-secondary"
          :title="`Switch to ${locale.name}`"
        >
          {{ locale.code.toUpperCase() }}
        </button>
      </div> -->
      
      <!-- Currency Changer -->
      <select 
          v-model="currencyStore.selectedCurrency"
          class="h-10 w-10 p-1 appearance-none text-center bg-transparent border-t rounded-full transition-colors hover:bg-secondary focus:outline-none"
        >
          <option v-for="c in availableCurrencies" :key="c">{{ c }}</option>
       </select>
       
      <!-- Compare Button -->
      <button 
        @click="isCompareModalOpen = true"
        class="relative h-10 w-10 flex items-center justify-center rounded-full transition-colors bg-primary text-primary-foreground hover:bg-primary/90"
        title="Compare Properties"
      >
        <Files class="h-5 w-5"/>
        <span 
            v-if="compareStore.count > 0"
            :class="['absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground',
                     { 'animate-ping': compareStore.isFull }]"
        >
          {{ compareStore.count }}
        </span>
      </button>

    </div>
  </div>

  <!-- Compare Modal (full-screen overlay) -->
  <div v-if="isCompareModalOpen" class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div class="h-full w-full p-4 sm:p-8">
        <div class="bg-card border shadow-xl rounded-lg h-full flex flex-col">
            <div class="p-4 flex items-center justify-between border-b">
               <h2 class="text-2xl font-display">Compare Properties</h2>
               <Button variant="ghost" @click="isCompareModalOpen = false"><X class="h-6 w-6"/></Button>
            </div>
            <!-- This is where the compare table will go. -->
            <CommonCompareTable v-if="compareStore.count > 0" :ids="compareStore.compareIds" class="flex-1 overflow-auto"/>
            <div v-else class="flex-1 flex flex-col items-center justify-center text-center">
                 <h3 class="text-xl font-semibold">Comparison list is empty</h3>
                 <p class="text-muted-foreground mt-2">Add properties to the list to compare them side-by-side.</p>
            </div>
        </div>
      </div>
  </div>

</template>