<script setup>
import '~/types/api.js';
import { useAuthStore } from '~/stores/auth';
import Button from '~/components/ui/Button.vue';
import { Phone, MessageCircle, Calendar, Flag, Building2, User } from 'lucide-vue-next';

/**
 * @type {import('vue').defineProps<{
 *   lister: Lister,
 *   propertyId: number
 * }>}
 */
const props = defineProps({
  lister: { type: Object, required: true },
  propertyId: { type: Number, required: true }
});

const authStore = useAuthStore();
const router = useRouter();

const showPhoneNumber = ref(false);
const bookViewingModalOpen = ref(false);

function handleSendMessage() {
    if (!authStore.isLoggedIn) {
        return router.push('/auth/login');
    }
    // As per your request, navigate to the dedicated messaging page
    // We would pass the lister ID to start a conversation.
    router.push(`/dashboard/messages?to=${props.lister.id}`);
}
</script>

<template>
  <div class="p-6 bg-card rounded-lg shadow-sm border space-y-4">
    <!-- Lessor Info Header -->
    <div class="flex items-center space-x-4">
      <img :src="lister.avatarUrl" :alt="lister.name" class="h-16 w-16 rounded-full object-cover">
      <div>
        <h3 class="font-display text-xl font-semibold">{{ lister.name }}</h3>
        <p class="text-sm text-muted-foreground">{{ lister.preference }} - Member since {{ lister.memberSince }}</p>
      </div>
    </div>
    
    <!-- Action Buttons -->
    <div class="space-y-3">
        <Button class="w-full" size="lg" @click="showPhoneNumber = !showPhoneNumber">
             <Phone class="h-5 w-5 mr-2" />
             <span v-if="!showPhoneNumber">Show Phone Number Now</span>
             <a v-else :href="`tel:${lister.phone_number}`" class="tracking-widest">{{ lister.phone_number }}</a>
        </Button>
        <Button variant="secondary" class="w-full" size="lg" @click="handleSendMessage">
            <MessageCircle class="h-5 w-5 mr-2" />
            Send Message
        </Button>
         <Button variant="secondary" class="w-full" size="lg" @click="bookViewingModalOpen = true">
            <Calendar class="h-5 w-5 mr-2" />
            Book Viewing
        </Button>
    </div>
    
    <!-- Report Button -->
    <div class="text-center pt-2">
      <Button variant="ghost" size="sm" class="w-full text-muted-foreground hover:text-destructive">
          <Flag class="h-4 w-4 mr-2" />
          Report this listing
      </Button>
    </div>

    <!-- Book Viewing Modal -->
    <UiDialog v-model:open="bookViewingModalOpen">
      <!-- The main `InquiryForm` component is placed inside the dialog -->
      <PropertyInquiryForm :property-id="propertyId" />
    </UiDialog>
  </div>
</template>