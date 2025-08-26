<script setup>
import '~/types/api.js';

import { Phone, MessageCircle } from 'lucide-vue-next';

/**
 * @type {import('vue').defineProps<{
 *   lister: Lister
 * }>}
 */
defineProps({
  lister: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <div class="p-6 bg-card rounded-lg shadow-md border">
    <div class="flex items-center space-x-4">
      <img :src="lister.avatarUrl" :alt="lister.name" class="h-16 w-16 rounded-full object-cover">
      <div>
        <h3 class="font-display text-lg font-semibold">{{ lister.name }}</h3>
        <p class="text-sm text-muted-foreground">Member since {{ lister.memberSince }}</p>
      </div>
    </div>
    <div class="mt-6 space-y-3">
       <Button class="w-full" size="lg">
         <Phone class="h-5 w-5 mr-2" />
         Show Phone Number
       </Button>
       <NuxtLink to="/messages">
       <Button  variant="secondary" class="w-full" size="lg">
          <MessageCircle class="h-5 w-5 mr-2" />
          Send Message
       </Button>
      </NuxtLink>
    </div>
  </div>
</template>