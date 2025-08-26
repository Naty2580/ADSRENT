<script setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { loginSchema } from '~/utils/schemas';
import { useAuthStore } from '~/stores/auth';
import Button from '~/components/ui/Button.vue';
import FormField from '~/components/ui/FormField.vue';

const authStore = useAuthStore();
const router = useRouter();

// General error message for API failures (e.g., "Invalid credentials")
const apiError = ref(null);

// VeeValidate form setup
const { defineField, handleSubmit, errors, isSubmitting } = useForm({ 
  validationSchema: toTypedSchema(loginSchema),
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const onSubmit = handleSubmit(async (values) => {
  apiError.value = null;
  try { 
    await authStore.login(values);

    // Redirect the user after successful login
    // If a `returnUrl` was stored (e.g., user tried to access a protected page), go there.
    const redirectPath = authStore.returnUrl || '/dashboard';
    authStore.returnUrl = null;
    router.push(redirectPath);

  } catch (error) {
    // Catch errors from the Pinia store's login action
    apiError.value = error.message || 'An unexpected error occurred. Please try again.';
  }
});
</script>

<template>
  <form @submit="onSubmit" class="space-y-6">
    <!-- API Error Display -->
    <div v-if="apiError" class="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
      {{ apiError }}
    </div>

    <!-- Email Field -->
    <FormField label="Email Address" :error="errors.email">
      <input
        v-model="email"
        v-bind="emailAttrs"
        type="email"
        autocomplete="email"
        placeholder="you@example.com"
        class="block w-full rounded-md border-0 bg-secondary py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
      />
    </FormField>

    <!-- Password Field -->
    <FormField label="Password" :error="errors.password">
      <input
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        autocomplete="current-password"
        placeholder="••••••••"
        class="block w-full rounded-md border-0 bg-secondary py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
      />
    </FormField>
    
    <div class="flex items-center justify-end">
        <div class="text-sm">
            <NuxtLink to="/auth/forgot-password" class="font-medium text-primary hover:text-primary/80">Forgot password?</NuxtLink>
        </div>
    </div>

    <div>
      <Button type="submit" :disabled="isSubmitting" class="w-full">
        <span v-if="isSubmitting">Signing in...</span>
        <span v-else>Sign in</span>
      </Button>
    </div>
  </form>
</template>