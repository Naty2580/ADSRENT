<script setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { inquirySchema } from '~/utils/schemas';
import { useAuthStore } from '~/stores/auth';
import Button from '~/components/ui/Button.vue';

const props = defineProps({
  propertyId: {
    type: Number,
    required: true,
  }
});

const authStore = useAuthStore();
const apiMessage = ref(null);
const messageType = ref('success');

const { defineField, handleSubmit, errors, isSubmitting, resetForm } = useForm({
  validationSchema: toTypedSchema(inquirySchema),
});

const [message, messageAttrs] = defineField('message');

const onSubmit = handleSubmit(async (values) => {
    apiMessage.value = null;
    const { $api } = useNuxtApp();
    try {
        await $api.post(`/properties/${props.propertyId}/book`, {
            message: values.message,
        });
        messageType.value = 'success';
        apiMessage.value = "Your inquiry has been sent successfully!";
        resetForm();
    } catch (error) {
        messageType.value = 'error';
        apiMessage.value = error.message || "Failed to send your inquiry. Please try again.";
    }
});
</script>

<template>
  <div class="p-6 bg-card rounded-lg shadow-md border">
    <h3 class="font-display text-xl font-semibold">Make an Inquiry</h3>
    <p class="mt-1 text-sm text-muted-foreground">Contact the lessor about this property.</p>

    <div v-if="!authStore.isLoggedIn" class="mt-4 text-center">
        <p class="text-sm text-muted-foreground">You must be logged in to send an inquiry.</p>
        <Button to="/auth/login" class="mt-2 w-full">Login or Register</Button>
    </div>
    <form v-else @submit="onSubmit" class="mt-4 space-y-4">
       <div v-if="apiMessage" :class="['rounded-md p-3 text-sm', messageType === 'success' ? 'bg-accent/10 text-accent-foreground' : 'bg-destructive/10 text-destructive']">
            {{ apiMessage }}
        </div>
       <UiFormField label="Your Message" :error="errors.message">
          <textarea v-model="message" v-bind="messageAttrs" rows="5" class="w-full form-input"></textarea>
       </UiFormField>
       <Button type="submit" :disabled="isSubmitting" class="w-full">
            <span v-if="isSubmitting">Sending...</span>
            <span v-else>Send Inquiry</span>
       </Button>
    </form>
  </div>
</template>

<style scoped>
.form-input { @apply block w-full rounded-md border-0 bg-secondary py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6; }
</style>