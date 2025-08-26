<script setup>
import { Award, Users, TrendingUp } from 'lucide-vue-next';
import Button from '../ui/Button.vue';

const benefits = [
  {
    icon: Users,
    text: 'Reach thousands of potential buyers and tenants every day.'
  },
  {
    icon: Award,
    text: 'Utilize our simple and powerful dashboard to manage your listings.'
  },
  {
    icon: TrendingUp,
    text: 'Close deals faster with our secure messaging and booking system.'
  }
];
</script>

<template>
  <div class="py-12 md:py-20">
    <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="relative overflow-hidden rounded-lg bg-primary/90">
        <!-- Decorative background elements -->
        <div aria-hidden="true" class="absolute inset-0">
          <div class="absolute inset-0 mx-auto max-w-7xl overflow-hidden xl:px-8">
            <img src="https://images.unsplash.com/photo-1605276374104-5de67d4619da?q=80" alt="" class="absolute inset-0 h-full w-full object-cover opacity-30">
          </div>
        </div>

        <div class="relative py-16 px-6 sm:py-24 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <!-- Left side: Text content -->
          <div class="text-white">
            <h2 class="font-display text-3xl md:text-4xl font-bold">
              Become a Lessor on AdissRent
            </h2>
            <p class="mt-4 text-lg text-primary-foreground/90">
              Join our platform and connect with a massive audience of property seekers. Listing your property is simple, fast, and effective.
            </p>
            <ul class="mt-6 space-y-4">
              <li v-for="(benefit, index) in benefits" :key="index" class="flex items-start">
                <div class="flex-shrink-0">
                  <component :is="benefit.icon" class="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p class="ml-3 text-base text-primary-foreground/90">
                  {{ benefit.text }}
                </p>
              </li>
            </ul>
          </div>

          <!-- Right side: CTA Card -->
          <div class="flex justify-center items-center">
            <div class="w-full max-w-md p-8 bg-background rounded-lg shadow-2xl text-center">
              <h3 class="font-display text-2xl font-semibold text-foreground">
                Ready to Get Started?
              </h3>
              <p class="mt-2 text-muted-foreground">
                It's free to create an account and see how our platform works.
              </p>
              <Button size="lg" to="/auth/register?role=lessor" class="mt-6 w-full">
                Create Your Lessor Account
              </Button>
               <p class="mt-4 text-xs text-muted-foreground">
                Have questions? <NuxtLink to="/contact" class="underline hover:text-primary">Contact us</NuxtLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>