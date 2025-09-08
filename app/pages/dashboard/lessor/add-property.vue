<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNuxtApp } from '#app';
import { Upload } from 'lucide-vue-next';
import PropertyForm from '~/components/lessor/PropertyForm.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: ['authed', 'role'],
  // Corrected roles to match our application's standard
  roles: ['lister', 'admin'],
});

const { $api } = useNuxtApp();
const router = useRouter();
const isSubmitting = ref(false); // We'll manage the submitting state here
const apiError = ref(null); // To pass any API errors back to the form

/** 
 * This function is called when the PropertyForm component emits a 'submit' event.
 * It receives the validated form data and the raw files.
 * @param {{ formData: object, files: File[] }} payload
 */
async function handleCreateProperty(payload) {
  isSubmitting.value = true;
  apiError.value = null;

  console.log("Received from form component:", payload);

  // We are not handling file uploads yet, but this is where it would go.
  // 1. Upload files to get their keys/URLs. 
  // 2. Add those keys/URLs to the formData.
  // For now, we'll just submit the form data.
  //define backendform object
  

  const formData = payload.formData; // for easier access

// --- THIS IS THE DEFINITIVE MAPPING TO MATCH THE BACKEND ---
const backendPayload = {
  // Basic Info
  title: formData.title,
  description: formData.description,
  listing_type: formData.listingType,
  property_type: formData.propertyType,

  // Pricing (convert to cents/lowest unit)
  price: formData.price * 100,
  currency: formData.currency,

  // Specifications
  area: formData.area,
  bedrooms: formData.bedrooms,
  bathrooms: formData.bathrooms,
  is_furnished: formData.isFurnished, // Convert from checkbox to boolean for backend
  
  // Amenities 
  amenities: formData.amenities,

  // Location
  address_region: formData.address.region,
  address_city: formData.address.city,
  address_subcity: formData.address.subcity,
  address_specific_area: formData.address.specificArea,
  
  // Coordinates
  latitude: formData.latitude,
  longitude: formData.longitude,
  
  // --- THIS WILL BE ADDED WHEN FILE UPLOADS ARE READY ---
  // media_keys: [], // Example: ["uploads/key1.jpg", "uploads/key2.png"]
};

console.log("Payload being sent to backend:", backendPayload);


  try {
    const newProperty = await $api.post('/lessor/properties', backendPayload); // Assumes you use a dedicated lessor endpoint

    console.log('Property created successfully:', newProperty);
    // Redirect to the listings page on success
    router.push('/dashboard/lessor/listings');
  } catch (error) {
    console.error('Failed to create property:', error);
    apiError.value = error.response?._data?.message || 'An error occurred. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="font-display text-3xl font-bold flex items-center gap-2">
        <Upload class="h-6 w-6" />
        Add  New Property
      </h1>
      <p class="mt-2 text-muted-foreground">Fill in the details below to list your property on the marketplace.</p>
    </div>

    <!-- The Reusable Form Component -->
    <PropertyForm 
        :is-submitting="isSubmitting" 
        @submit="handleCreateProperty" 
    />

    <!-- We could display the apiError here if we wanted it outside the form card -->
    <div v-if="apiError" class="mt-4 p-4 bg-destructive/10 text-destructive rounded-md">
      {{ apiError }}
    </div>
  </div>
</template>