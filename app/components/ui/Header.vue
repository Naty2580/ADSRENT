<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import { User, LogIn, LogOut, Home } from 'lucide-vue-next'

defineProps<{
  isSignedIn: boolean
  user: { name: string; email: string } | null
}>()

const emit = defineEmits<{
  (e: 'signIn'): void
  (e: 'signOut'): void
}>()
</script>

<template>
  <header class="bg-addis-primary border-b border-addis-light sticky top-0 z-50 shadow-sm">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <!-- Logo & Title -->
      <div class="flex items-center space-x-3">
        <RouterLink to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-addis-accent rounded-lg flex items-center justify-center">
            <Home class="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 class="text-2xl text-white">AddisRent</h1>
            <span class="text-sm text-white/80">Blog & Contact</span>
          </div>
        </RouterLink>
      </div>

      <!-- Auth Controls -->
      <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-4 mr-1">
        <RouterLink to="/about"
        class="text-white capitalize text-lg hover:text-green-500 mr-2"
        >
          About
        </RouterLink>
      </div>
        <template v-if="isSignedIn && user">
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2 text-white">
              <div class="w-8 h-8 bg-addis-accent rounded-full flex items-center justify-center">
                <User class="w-4 h-4 text-white" />
              </div>
              <span class="hidden sm:inline">{{ user.name }}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              @click="emit('signOut')"
              class="border-white/20 text-white hover:bg-white/10 hover:text-white"
            >
              <LogOut class="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </template>

        <template v-else>
          <Button
            @click="emit('signIn')"
            class="bg-addis-accent hover:bg-addis-hover text-white border-0"
          >
            <LogIn class="w-4 h-4 mr-2" />
            Sign In
          </Button>
        </template>
      </div>
    </div>
  </header>
</template>