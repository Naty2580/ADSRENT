<script setup>
import UpdateProfileForm from '~/components/profile/UpdateProfileForm.vue';
import { useAuthStore } from '~/stores/auth';

definePageMeta({
  layout: 'dashboard',
  middleware: 'authed',
});

const authStore = useAuthStore();
const user = authStore.user;

</script>

<template>
  <div class="space-y-8"> 
    <div>
      <h1 class="font-display text-3xl font-bold">Account Management</h1>
      <p class="mt-2 text-muted-foreground">Manage your account settings and personal information.</p>
    </div>
    
    <!-- Profile Information Card -->
    <div class="bg-card rounded-lg shadow-sm border">
      <div class="border-b p-4 sm:px-6">
        <h3 class="text-lg font-semibold leading-6 text-foreground">
          Profile Information
        </h3>
        <p class="mt-1 text-sm text-muted-foreground">
          Update your personal details here.
        </p>
      </div>
      <div class="p-4 sm:p-6">
          <UpdateProfileForm />
      </div>
    </div>
    
     <!-- Security Settings Card -->
    <div class="bg-card rounded-lg shadow-sm border">
      <div class="border-b p-4 sm:px-6">
        <h3 class="text-lg font-semibold leading-6 text-foreground">
          Security Settings
        </h3>
        <p class="mt-1 text-sm text-muted-foreground">
          Change your password and manage account security.
        </p>
      </div>
      <div class="p-4 sm:p-6 text-muted-foreground">
          Coming Soon: A form to change your password will be here.
      </div>
    </div>
  </div>
</template>