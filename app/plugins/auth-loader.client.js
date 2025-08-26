import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin(async (nuxtApp) => {
    const authStore = useAuthStore();
    
    // Only attempt to initialize and fetch user on the client side.
    // Call the initialize action to hydrate state from localStorage.
    authStore.initialize();
    
    // If the store is now logged in (token exists),
    // then fetch the user data to ensure it is fresh and the token is valid.
    if (authStore.isLoggedIn) {
        await authStore.fetchUser();
    }
});