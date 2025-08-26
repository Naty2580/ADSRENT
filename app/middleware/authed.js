import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (!authStore.isLoggedIn) {
    // Store the intended URL so we can redirect after login
    authStore.returnUrl = to.fullPath;
    return navigateTo('/auth/login');
  }
});