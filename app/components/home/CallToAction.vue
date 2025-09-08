<script setup>
import { ref } from 'vue';
import { Home, Building, DollarSign, ShoppingCart, ArrowRight } from 'lucide-vue-next';

// ===== NEW: DEFINE EMITS =====




// The data structure now includes all 4 cards, using the keys from your file
const ctaCards = ref([
  { id: 'rent', titleKey: 'rent', icon: Home },
  { id: 'buy', titleKey: 'buy', icon: ShoppingCart },
  { id: 'sell', titleKey: 'sell', icon: DollarSign },
  { id: 'rentOut', titleKey: 'rentOut', icon: Building },
]);
</script>
<template>
  <section class="py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-green-600 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-10 left-10 w-32 h-32 bg-white rounded-full" />
      <div class="absolute top-1/3 right-20 w-24 h-24 bg-white rounded-full" />
      <div class="absolute bottom-20 left-1/4 w-40 h-40 bg-white rounded-full" />
      <div class="absolute bottom-10 right-10 w-28 h-28 bg-white rounded-full" />
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Section Header -->
      <div
        v-motion
        :initial="{ y: 50, opacity: 0 }"
        :visible-once="{ y: 0, opacity: 1 }"
        :transition="{ duration: 800 }"
        class="text-center mb-16"
      >
        <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Find Your Dream Property?
        </h2>
        <p class="text-xl text-orange-100 max-w-4xl mx-auto leading-relaxed">
          Join thousands of satisfied customers who found their perfect home through our platform
        </p>
      </div>

      <!-- Grid of 4 CTA Cards -->
      <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        <div
          v-for="(card, index) in ctaCards"
          :key="card.id"
          v-motion
          :initial="{ y: 50, opacity: 0 }"
          :visible-once="{ y: 0, opacity: 1 }"
          :transition="{ duration: 600, delay: index * 100 }"
          class="group"
        >
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col items-center text-center">
            <div
              v-motion
              :hovered="{ scale: 1.1, rotate: 5 }"
              :transition="{ type: 'spring', stiffness: 400 }"
              class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6"
            >
              <component :is="card.icon" class="w-8 h-8 text-white" />
            </div>
            
            <h3 class="text-2xl font-bold text-white mb-4 flex-grow">
              {{ card.titleKey }}
            </h3>

            <div class="mt-auto w-full">
               <!-- ===== MODIFIED: ADDED @click EMIT ===== -->
              <NuxtLink to="/auth/login" >
                <UiButton class="w-full bg-black/20 text-green-300 font-medium py-3 text-sm group border-none">
                get started
                <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </UiButton>
              </NuxtLink >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>