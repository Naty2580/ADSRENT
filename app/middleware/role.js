import { useAuthStore } from "~/stores/auth";

/**
 * A middleware that checks if the user has one of the required roles.
 * Usage in page: `definePageMeta({ middleware: ['authed', 'role'], roles: ['lessor', 'admin'] })`
 *
 * @param {import('vue-router').RouteLocationNormalized} to
 */
export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const requiredRoles = to.meta.roles || [];

  if (!authStore.isLoggedIn) {
    // This should ideally be caught by the 'authed' middleware first,
    // but this is a defensive check.
    return navigateTo('/auth/login');
  }
  
  const userRoles = authStore.roles;
  const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

  if (!hasRequiredRole) {
    // User is logged in but doesn't have the permission.
    // Redirect them to their main dashboard or show a "403 Forbidden" error.
    console.warn(`Access denied. User does not have required roles: ${requiredRoles.join(', ')}`);
    return navigateTo('/dashboard', { replace: true });
    // For a more robust solution, you could navigate to an actual `/unauthorized` page.
  }
});