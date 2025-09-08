<script setup>
import '~/types/api.js';
import { useAuthStore } from '~/stores/auth';
import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { updateProfileSchema } from '~/utils/schemas';
import FormField from '~/components/ui/FormField.vue';

import {
  User,
  MapPin,
  Bell,
  Lock,
  Upload,
  Loader2,
  AlertTriangle,
  Trash2,
  Settings
} from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
  middleware: 'authed',
});

const authStore = useAuthStore();
const user = computed(() => authStore.user);
console.log("user", user.value);
const apiError = ref(null);
const successMessage = ref(null);

// Form setup
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(updateProfileSchema),
  initialValues: {
    name: user.value?.name,
    email: user.value?.email,
    phoneNumber: user.value?.phone_number,
    address: {
      region: user.value?.location_region || '',
      city: user.value?.location_city || '',
      subcity: user.value?.location_subcity || '',
    },
  },
});
const { value: name, errorMessage: nameError } = useField('name');
const { value: email, errorMessage: emailError } = useField('email');
const { value: phoneNumber, errorMessage: phoneError } = useField('phoneNumber');
const { value: addressRegion, errorMessage: addressRegionError } = useField('address.region');
const { value: addressCity, errorMessage: addressCityError } = useField('address.city');
const { value: addressSubcity, errorMessage: addressSubcityError } = useField('address.subcity');
// Note: for deep objects, you might need individual fields for address later.

const onProfileSubmit = handleSubmit(async (values) => {
  console.log("trying to update profile", values);

  const backendPayload = {
    name: values.name,
    email: values.email,
    phone_number: values.phoneNumber,
    address: values.address,
    gender: user.value.gender
  }
  console.log("backendPayload", backendPayload);
    apiError.value = null;
    successMessage.value = null;
    try {
        await authStore.updateProfile(backendPayload);

        successMessage.value = "Profile updated successfully!";
        setTimeout(() => successMessage.value = null, 3000);
    } catch (e) {
        apiError.value = e.response?.data?.message || e.message || "Failed to update profile.";
    }
});
</script>

<template>
  <div class="space-y-8">
    <div class="mb-8">
      <h1 class="font-display text-3xl font-bold flex items-center gap-2"><Settings class="h-6 w-6" />Account Settings</h1>
      <p class="mt-2 text-muted-foreground">Manage your profile, security, and preferences.</p>
    </div>

    <!-- Profile Information -->
    <UiCard>
      <UiCardContent class="p-6">
        <h3 class="text-lg font-semibold mb-6 flex items-center gap-3"><User class="h-5 w-5" />Profile Information</h3>
        <div v-if="successMessage" class="mb-4 p-3 bg-accent/10 text-accent-foreground rounded-md">{{ successMessage }}</div>
        <div v-if="apiError" class="mb-4 p-3 bg-destructive/10 text-destructive rounded-md">{{ apiError }}</div>
        
     

        <form @submit="onProfileSubmit" class="space-y-4"> 
           
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Full Name *" :error="nameError">
              <UiInput v-model="name" />
            </FormField>

             <FormField label="Email address *" :error="emailError">
              <UiInput v-model="email"  class="cursor-not-allowed bg-secondary/70"/>
            </FormField>

             <FormField label="Phone Number" :error="phoneError">
              <UiInput v-model="phoneNumber"/>
            </FormField>

          </div>

          <div class="pt-4 border-t">
              <h4 class="font-medium mb-4">address</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField label="Region *" :error="addressRegionError">
                      <UiInput v-model="addressRegion"/>
                  </FormField>
                  <FormField label="City *" :error="addressCityError">
                      <UiInput v-model="addressCity"/>
                  </FormField>
                  <FormField label="Sub-City *" :error="addressSubcityError">
                      <UiInput v-model="addressSubcity"/>
                  </FormField>
              </div>
          </div>

           <div class="flex justify-end">
             <button type="submit" class="bg-orange-500 hover:bg-orange-700  text-white">
                <Loader2 v-if="isSubmitting" class="h-4 w-4 mr-2 animate-spin" />
                {{ isSubmitting ? 'Saving...' : 'Save Profile Changes' }}
             </button>
           </div>
        </form>
      </UiCardContent>
    </UiCard>

    <!-- Change Password -->
     <UiCard>
      <UiCardContent class="p-6">
        <h3 class="text-lg font-semibold mb-6 flex items-center gap-3"><Lock class="h-5 w-5" />Change Password</h3>
         <p class="text-muted-foreground">Coming soon...</p>
      </UiCardContent>
    </UiCard>
  </div>
</template>