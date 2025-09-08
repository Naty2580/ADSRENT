<script setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { updateProfileSchema } from '~/utils/schemas';
import { useAuthStore } from '~/stores/auth';
import Button from '~/components/ui/Button.vue';

const authStore = useAuthStore();
const user = authStore.user;

const apiError = ref(null);
const successMessage = ref(null);

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(updateProfileSchema),
  // Initialize the form with the user's current data
  initialValues: {
    name: user.name,
    phoneNumber: user.phoneNumber,
    address: {
      region: user.address.region,
      city: user.address.city,
      subcity: user.address.subcity,
    },
  },
});

const [name, nameAttrs] = defineField('name');
const [phoneNumber, phoneNumberAttrs] = defineField('phoneNumber');
const [region, regionAttrs] = defineField('address.region');
const [city, cityAttrs] = defineField('address.city');
const [subcity, subcityAttrs] = defineField('address.subcity');

const onSubmit = handleSubmit(async (values) => {
  apiError.value = null;
  successMessage.value = null;
  
  try {
    await authStore.updateProfile(values);
    successMessage.value = "Your profile has been updated successfully!";
    // Clear the success message after a few seconds
    setTimeout(() => successMessage.value = null, 3000);
  } catch (error) {
    apiError.value = error.message || "An unexpected error occurred.";
  }
});

</script>

<template>
  <form @submit="onSubmit" class="space-y-6">
    <div v-if="apiError" class="rounded-md bg-destructive/10 p-4 text-sm text-destructive">{{ apiError }}</div>
    <div v-if="successMessage" class="rounded-md bg-accent/10 p-4 text-sm text-accent-foreground">{{ successMessage }}</div>

    <!-- Static Email Display -->
    <UiFormField label="Email Address">
      <input type="email" :value="user.email" disabled class="w-full form-input bg-secondary/70 cursor-not-allowed" />
      <p class="mt-1 text-xs text-muted-foreground">Email address cannot be changed.</p>
    </UiFormField>
    
    <!-- Editable Fields -->
     <UiFormField :label="user.type === 'person' ? 'Full Name' : 'Company Name'" :error="errors.name">
        <input v-model="name" v-bind="nameAttrs" type="text" class="w-full form-input" />
    </UiFormField>

     <UiFormField label="Phone Number" :error="errors.phoneNumber">
        <input v-model="phoneNumber" v-bind="phoneNumberAttrs" type="tel" class="w-full form-input" />
    </UiFormField>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <UiFormField label="Region" :error="errors['address.region']">
        <input v-model="region" v-bind="regionAttrs" type="text" class="w-full form-input" />
      </UiFormField>
      <UiFormField label="City" :error="errors['address.city']">
        <input v-model="city" v-bind="cityAttrs" type="text" class="w-full form-input" />
      </UiFormField>
      <UiFormField label="Sub-City" :error="errors['address.subcity']">
        <input v-model="subcity" v-bind="subcityAttrs" type="text" class="w-full form-input" />
      </UiFormField>
    </div>
    
    <div class="flex justify-end">
       <Button type="submit" :disabled="isSubmitting">
        <span v-if="isSubmitting">Saving...</span>
        <span v-else>Save Changes</span>
      </Button>
    </div>
  </form>
</template>

<style scoped>
.form-input {
  @apply block w-full rounded-md border-0 bg-secondary py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6;
}
</style>