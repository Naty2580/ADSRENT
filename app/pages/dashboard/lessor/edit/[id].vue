<script setup>
import PropertyForm from '~/components/lessor/PropertyForm.vue';
import '~/types/api.js';

definePageMeta({
  layout: 'dashboard',
  middleware: ['authed', 'role'],
  roles: ['lessor', 'admin'],
});

const route = useRoute();
const router = useRouter();
const propertyId = route.params.id;

// Fetch the property data for the given ID to pre-fill the form
const { data: property, pending, error } = await useAsyncData(
  `lessor-property-${propertyId}`,
  async () => {
    const { $api } = useNuxtApp();
    // This endpoint must be protected to ensure a user can only fetch their own property
    return $api.get(`/lessor/properties/${propertyId}`);
  }
);

// If the property is not found or user is not authorized, redirect or show an error
if (error.value) {
    showError({ statusCode: 404, statusMessage: 'Property not found or you do not have permission to edit it.' });
}


async function handleUpdateProperty(formData) {
  try {
    const { $api } = useNuxtApp();
    await $api.put(`/lessor/properties/${propertyId}`, formData);
    // Redirect back to the listings page on success
    router.push('/dashboard/lessor/listings');
  } catch (error) {
    console.error('Failed to update property:', error);
    alert('Error: Could not update property.');
  }
}
</script>

<template>
  <div>
    <h1 class="font-display text-3xl font-bold">Edit Property</h1>
    <p class="mt-2 text-muted-foreground">Update the details for your property listing.</p>
    
    <div v-if="pending" class="mt-8 text-center">Loading property data...</div>
    <div v-else-if="error" class="mt-8 text-center text-destructive">Failed to load property data.</div>
    <div v-else-if="property" class="mt-8">
      <!-- We pass the fetched data into our reusable form component -->
      <PropertyForm :initial-data="property" @submit="handleUpdateProperty" />
    </div>
  </div>
</template>