<script setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/toTypedSchema';
import { addPropertySchema } from '~/utils/schemas';
import FormField from '~/components/ui/FormField.vue';
import PropertyForm from '~/components/lessor/PropertyForm.vue';

import Button from '~/components/ui/Button.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: ['authed', 'role'], // Apply BOTH middleware
  roles: ['lister', 'admin'],     // Specify REQUIRED roles
});

const { $api } = useNuxtApp();
const router = useRouter();

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
    validationSchema: toTypedSchema(addPropertySchema),
    initialValues: {
        listingType: 'rent',
        propertyType: 'apartment',
        currency: 'ETB',
        isFurnished: false,
        address: {},
    }
});

// Define fields for cleaner template binding
const [title, titleAttrs] = defineField('title');
const [description, descriptionAttrs] = defineField('description');
const [listingType, listingTypeAttrs] = defineField('listingType');
const [propertyType, propertyTypeAttrs] = defineField('propertyType');
const [price, priceAttrs] = defineField('price');
const [area, areaAttrs] = defineField('area');
const [bedrooms, bedroomsAttrs] = defineField('bedrooms');
const [bathrooms, bathroomsAttrs] = defineField('bathrooms');
const [region, regionAttrs] = defineField('address.region');
const [city, cityAttrs] = defineField('address.city');
const [subcity, subcityAttrs] = defineField('address.subcity');
const [specificArea, specificAreaAttrs] = defineField('address.specificArea');


const onSubmit = handleSubmit(async (values) => {
    // Here we will eventually get the list of uploaded media keys
    // const mediaKeys = [ ... ];
    // const payload = { ...values, media_keys: mediaKeys };
    // const { $api } = useNuxtApp();
    // await $api.post('/properties', payload);
    // navigateTo('/dashboard/lessor/listings');

    console.log("Form Submitted:", values);
    alert('Form submitted! Integration with backend and media uploads is next.');
});

async function handleCreateProperty(formData) {
  try {
    // We can add media keys here in the future
    const newProperty = await $api.post('/properties', formData);
    console.log('Property created:', newProperty);
    // Redirect to the listings page on success
    router.push('/dashboard/lessor/listings');
  } catch (error) {
    console.error('Failed to create property:', error);
    // You could show an error message to the user here
    alert('Error: Could not create property.');
  }
}


</script>

<template>
    <div>
      <h1 class="font-display text-3xl font-bold">Add New Property</h1>
      <p class="mt-2 text-muted-foreground">Fill in the details below to list your property.</p>
      
      <div class="mt-8">
        <PropertyForm @submit="handleCreateProperty" />
      </div>
    </div>
  </template>

<style scoped>
.form-input { @apply block w-full rounded-md border-0 bg-secondary py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6; }
</style>