<script setup>
import { ref } from 'vue';

import { Shield, Zap, Lock, Users, CheckCircle, Star } from 'lucide-vue-next';



// 3. Define the main features, using translation keys and icon components
const features = ref([
  {
    icon: Shield,
    titleKey: 'Verified Properties',
    descriptionKey: 'All properties are thoroughly verified for authenticity',
    statsKey: 'Vefified properties', // Example, adjust if you have specific stat keys
  },
  {
    icon: Zap,
    titleKey: '24/7 Support', // Note: Your react code used different titles. I am using your translation.ts keys.
    descriptionKey: 'Round-the-clock customer support for all your needs',
    statsKey: '24/7 Support',
  },
  {
    icon: Lock,
    titleKey: 'Secure Payments',
    descriptionKey: 'Safe and secure payment processing with multiple options', 
    statsKey: 'Secure Payments',
  },
]);

// 4. Define the additional stats section data
const additionalStats = ref([
  { icon: Users, value: '50K+', labelKey: 'Happy Customers' },
  { icon: CheckCircle, value: '10K+', labelKey: 'Properties' },
  { icon: Star, value: '4.9', labelKey: 'Rated Service' },
]);
</script>

<template>
  <section class="py-20 bg-white dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <!-- Section Header with animation -->
      <div
        v-motion
        :initial="{ y: 50, opacity: 0 }"
        :visible-once="{ y: 0, opacity: 1 }"
        :transition="{ duration: 800 }"
        class="text-center mb-16"
      >
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Why CHoose Us
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
           Getting your dream property is as easy as 1, 2, 3.
        </p>
      </div>

      <!-- Main features grid -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <div
          v-for="(feature, index) in features"
          :key="feature.titleKey"
          v-motion
          :initial="{ y: 50, opacity: 0 }"
          :visible-once="{ y: 0, opacity: 1 }"
          :transition="{ duration: 600, delay: index * 200 }"
          class="text-center group"
        >
          <div
            v-motion
            :hovered="{ scale: 1.1 }"
            :transition="{ type: 'spring', stiffness: 400, damping: 10 }"
            class="relative mx-auto w-20 h-20 mb-6"
          >
            <!-- Icon background with gradient -->
            <div class="absolute inset-0 bg-gradient-to-br from-orange-100 to-green-100 dark:from-orange-900/30 dark:to-green-900/30 rounded-2xl group-hover:from-orange-200 group-hover:to-green-200 dark:group-hover:from-orange-800/40 dark:group-hover:to-green-800/40 transition-all duration-300" />
            
            <!-- Animated pulse ring -->
            <div
              v-motion
              :animate="{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.1, 0.2],
              }"
              :transition="{
                duration: 3000,
                repeat: Infinity,
                delay: index * 500,
              }"
              class="absolute inset-0 bg-gradient-to-br from-orange-400 to-green-500 rounded-2xl opacity-20"
            />
            
            <!-- Icon -->
            <div class="relative flex items-center justify-center w-full h-full">
              <component :is="feature.icon" class="w-10 h-10 text-orange-500" />
            </div>
          </div>

          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
            {{feature.titleKey }}
          </h3>
          
          <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            {{ feature.descriptionKey }}
          </p>

          <div
            v-if="feature.statsKey"
            v-motion
            :hovered="{ scale: 1.05 }"
            :transition="{ type: 'spring', stiffness: 400 }"
            class="inline-block bg-gradient-to-r from-orange-50 to-green-50 dark:from-orange-900/20 dark:to-green-900/20 px-4 py-2 rounded-full"
          >
            <span class="text-sm font-medium text-orange-600 dark:text-orange-400">
              {{ feature.statsKey }}
            </span>
          </div>
        </div>
      </div>

      <!-- Stats section -->
      <div
        v-motion
        :initial="{ y: 50, opacity: 0 }"
        :visible-once="{ y: 0, opacity: 1 }"
        :transition="{ duration: 800, delay: 400 }"
        class="bg-gradient-to-r from-orange-50 via-white to-green-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl p-8"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(stat, index) in additionalStats"
            :key="stat.labelKey"
            v-motion
            :initial="{ scale: 0.8, opacity: 0 }"
            :visible-once="{ scale: 1, opacity: 1 }"
            :transition="{ duration: 500, delay: index * 100 }"
            class="text-center"
          >
            <div class="flex items-center justify-center mb-3">
              <div
                v-motion
                :hovered="{
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.1
                }"
                :transition="{ duration: 500 }"
                class="w-12 h-12 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center"
              >
                <component :is="stat.icon" class="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div
              v-motion
              :initial="{ opacity: 0 }"
              :visible-once="{ opacity: 1 }"
              :transition="{ duration: 1000, delay: index * 200 }"
              class="text-3xl font-bold text-gray-900 dark:text-white mb-1"
            >
              {{ stat.value }}
            </div>
            
            <p class="text-gray-600 dark:text-gray-300">
              {{ stat.labelKey }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>