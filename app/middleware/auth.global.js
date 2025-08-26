import { useAuthStore } from "~/stores/auth";
import { useFavoritesStore } from "~/stores/favorites";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // This middleware runs on every route change.

  const authStore = useAuthStore();

  // On the initial server-side load, if the user has a token,
  // we should try to fetch the user's data to populate the store.
  if (process.import.meta.server && authStore.token && !authStore.user) {
    await authStore.fetchUser();
  }

  // If the user was successfully fetched, they are logged in.
    // Now, fetch their favorites.
  if (authStore.isLoggedIn) {
    const favoritesStore = useFavoritesStore();
    await favoritesStore.fetchFavorites();
}
}); 