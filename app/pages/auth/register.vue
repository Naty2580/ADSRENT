<script setup>
import { ArrowLeft, Home } from 'lucide-vue-next';

definePageMeta({
  // This page is a custom, full-screen layout, so we can tell Nuxt to use NO layout.
  layout: false,
  middleware: 'guest',
})
</script>

<template>
  <div class="h-screen w-screen flex bg-gray-50 overflow-hidden">
      <!-- Left side (Motivational Section) - No changes here -->
      <div class="w-1/2 h-full relative overflow-hidden hidden lg:block">

        <NuxtLink to="/" class="absolute z-50 top-6 left-6 flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
          <ArrowLeft class="w-5 h-5" />
          <span>Back to Home</span>
        </NuxtLink>

        <div class="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&h=900&fit=crop"
            alt="Beautiful Modern Apartment Interior" class="w-full h-full object-cover" />
        </div>
        <div class="absolute inset-0 bg-black/60" />
        <div class="relative z-10 h-full flex flex-col justify-center items-center px-12 text-center text-white">
          <div class="flex items-center justify-center mb-6">
            <div class="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center mr-4 shadow-2xl">
              <Home class="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 class="text-4xl font-bold drop-shadow-lg">AddisRent</h1>
              <p class="text-lg text-opacity-90 drop-shadow-md">🌍 Ethiopia's Premier Platform</p>
            </div>
          </div>
          <h2 class="text-4xl xl:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">Welcome to AddisRent 🌍</h2>
          <p class="text-lg xl:text-xl leading-relaxed opacity-95 drop-shadow-md">
            Your trusted rental & investment platform in Ethiopia
          </p>
        </div>
      </div>

      <!-- ====== MODIFICATION START: Right side (Form Section) ====== -->
      <div class="w-full lg:w-1/2 h-full flex flex-col bg-background">
        
        <!-- Language buttons - they stay fixed at the top -->
        <div class="absolute top-4 right-4 z-20 flex space-x-2 items-center p-1 rounded-full bg-gray-200 text-sm">
          <!-- Your language buttons -->
        </div>

        <!-- THIS IS THE NEW SCROLLABLE CONTAINER -->
        <div class="flex-1 overflow-y-auto">
           <div class="w-full max-w-lg mx-auto py-12 px-6">
              
              <!-- Header -->
              <div class="text-center mb-8">
                <h2 class="text-3xl font-bold leading-9 tracking-tight text-foreground">
                  Create Your Account
                </h2>
                <p class="mt-2 text-sm text-muted-foreground">
                  Start your journey with us today.
                </p>
              </div>
    
              <!-- Register Form Component -->
              <AuthRegisterForm />
    
              <!-- Footer Link -->
              <div class="mt-8 pt-6 border-t text-center text-sm">
                <p class="text-muted-foreground">
                  Already have an account?
                  <NuxtLink to="/auth/login" class="font-semibold leading-6 text-primary hover:text-primary/80">
                    Sign in
                  </NuxtLink>
                </p>
              </div>

           </div>
        </div>
        
      </div>
      <!-- ====== MODIFICATION END ====== -->
  </div>
</template>