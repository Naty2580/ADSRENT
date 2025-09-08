<script setup>

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
});
 
</script>

<template>
  <div class="flex items-center justify-center min-h-screen p-4">
    <div class="w-full max-w-3xl border-2 border-muted-foreground rounded-2xl shadow-md bg-background">
      <!-- Header -->
      <div class="p-6">
        <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-foreground">
          Sign in to your account
        
        </h2>
      </div>

      <!-- Form --> 
      <div class="p-6 pt-0">
        <AuthLoginForm /> 
      </div>

      <!-- Footer -->
      <div class="border-t p-6 text-center text-sm">
        <p class="text-muted-foreground">
          Not a member?
          <NuxtLink
            to="/auth/register"
            class="font-semibold leading-6 text-primary hover:text-primary/80"
          >
            Sign up now
          </NuxtLink>
        </p> 
      </div> 
    </div>
  </div> 
</template>
