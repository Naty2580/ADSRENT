<script setup>
import { Search, Files, Phone } from 'lucide-vue-next';

const steps = [
  {
    icon: Search,
    title: 'Find Property',
    description: 'Use our advanced search filters to find the exact property that meets your criteria for location, price, and amenities.',
  },
  {
    icon: Files,
    title: 'Compare & Inquire',
    description: 'Compare multiple properties side-by-side and submit an inquiry directly to the lessor to schedule a viewing.',
  },
  {
    icon: Phone,
    title: 'Connect & Close',
    description: 'Communicate directly with lessors, negotiate terms, and finalize your agreement to secure your new home.',
  },
];
</script>

<template>
  <div class="py-12 md:py-20">
    <div class="text-center">
      <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground">
        How It Works
      </h2>
      <p class="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
        Getting your dream property is as easy as 1, 2, 3.
      </p>
    </div>
    <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
      <div 
        v-for="(step, index) in steps" 
        :key="index"
        class="text-center flex flex-col items-center"
      >
        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
          <component :is="step.icon" class="h-8 w-8" />
        </div>
        <h3 class="font-display text-xl font-semibold text-foreground">
          {{ step.title }}
        </h3>
        <p class="mt-2 text-muted-foreground">
          {{ step.description }}
        </p>
      </div>
    </div>
  </div>
</template>