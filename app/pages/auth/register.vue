<script setup>
// import AuthRegisterForm from '~/components/auth/AuthRegisterForm.vue'
import { ArrowLeft } from 'lucide-vue-next';
import { Home } from 'lucide-vue-next';

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})
</script>

<template>
  <div class="h-screen w-screen bg-gray-50 transition-colors duration-300 overflow-hidden">

    <div class="flex h-full w-full">
      <!-- Left side (Motivational Section) -->
      <div class="w-1/2 h-full relative overflow-hidden hidden lg:block bg-gradient-to-br from-primary/90 to-primary  ">
        <!-- back button -->
        <NuxtLink to="/" class="fixed z-50 top-4 left-4">
          <ArrowLeft class="w-12 h-12 text-white" />
        </NuxtLink>

        <div class="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&h=900&fit=crop"
            alt="Beautiful Modern Apartment Interior" class="w-full h-full object-cover" />
        </div>

        <div class="absolute inset-0 bg-black opacity-60" />

        <div class="relative z-10 h-full flex flex-col justify-center items-center px-12 text-center">


          <div v-motion-pop-visible class="mb-8">
            <div class="flex items-center justify-center mb-4">
              <div class="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center mr-4 shadow-2xl">
                <Home class="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 :class="['text-4xl font-bold text-white drop-shadow-lg']">
                  AddisRent</h1>
                <p :class="['text-lg text-white text-opacity-90 drop-shadow-md']">🌍 Ethiopia's Premier Platform</p>
              </div>
            </div>
          </div>
          <div v-motion-fade-in-visible :delay="200" class="mb-8 max-w-2xl">
            <h2 :class="['text-4xl xl:text-5xl font-bold mb-6 leading-tight text-white drop-shadow-lg']">Welcome to
              Addis Rent 🌍</h2>
            <p :class="['text-lg xl:text-xl leading-relaxed text-white text-opacity-95 drop-shadow-md mb-4']">Your
              trusted rental & investment platform in Ethiopia</p>
            <p :class="['text-base xl:text-lg leading-relaxed text-white text-opacity-90 drop-shadow-md']">
              📍 Pin your next home, office, or land today </p>
          </div>


        </div>

      </div>

      <!-- Right side (Form Section) -->
      <div class="w-full lg:w-1/2 h-full bg-gray-50 flex flex-col bg-background p-6 lg:p-12">

        <div class="absolute top-4 right-4 z-20 flex space-x-2 items-center p-1 rounded-full bg-gray-200 text-sm">
          <button :class="['px-2 py-0.5 rounded-full', false ? 'bg-white text-gray-800' : 'text-gray-500']">EN</button>
          <button :class="['px-2 py-0.5 rounded-full', true ? 'bg-white text-gray-800' : 'text-gray-500']">AM</button>
        </div>

        <div class="flex-1 overflow-y-auto px-6 lg:px-8 pb-6">
          <!-- Header -->
          <div class="text-center">
            <h2 class="text-3xl font-bold leading-9 tracking-tight text-foreground">
              Create Your Account
            </h2>
            <p class="mt-2 text-sm text-muted-foreground">
              Start your journey with us today.
            </p>
          </div>

          <!-- Register Form -->
          <AuthRegisterForm />

          <!-- Footer -->
          <div class="border-t pt-6 text-center text-sm">
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

  </div>
</template>
