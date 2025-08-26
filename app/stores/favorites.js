import { defineStore } from 'pinia';
import '~/types/api.js';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    /** @type {Set<number>} */
    favoriteIds: new Set(),
    isLoaded: false, // Prevents refetching on every page navigation
  }),

  getters: {
    /**
     * Checks if a property is in the favorites.
     * @param {number} propertyId
     * @returns {boolean}
     */
    isFavorite: (state) => (propertyId) => {
      return state.favoriteIds.has(propertyId);
    },
  },

  actions: {
    /**
     * Fetches the initial list of favorite IDs from the API.
     */
    async fetchFavorites() {
      if (this.isLoaded) return; // Don't fetch if we already have the data

      const { $api } = useNuxtApp();
      try {
        const ids = await $api.get('/favorites');
        this.favoriteIds = new Set(ids);
        this.isLoaded = true;
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    },
    
    /**
     * Toggles the favorite status of a property with optimistic UI updates.
     * @param {Property} property
     */
    async toggleFavorite(property) {
      const { $api } = useNuxtApp();
      const propertyId = property.id;

      const authStore = useAuthStore();
      if (!authStore.isLoggedIn) {
          // This is a defensive check; the UI should already prevent this.
          return navigateTo('/auth/login');
      }
      
      const isCurrentlyFavorite = this.isFavorite(propertyId);

      // --- Optimistic Update ---
      // Instantly update the UI before the API call completes.
      if (isCurrentlyFavorite) {
        this.favoriteIds.delete(propertyId);
      } else {
        this.favoriteIds.add(propertyId);
      }

      // --- API Call ---
      try {
        await $api.post('/favorites/toggle', { property_id: propertyId }); await $api.post('/favorites', { property_id: propertyId });
        
      } catch (error) {
        console.error("Failed to toggle favorite:", error);
        // --- Revert UI on Failure ---
        // If the API call fails, revert the change to keep UI consistent with the backend.
        if (isCurrentlyFavorite) {
          this.favoriteIds.add(propertyId);
        } else {
          this.favoriteIds.delete(propertyId);
        }
        // Optionally show an error toast to the user here.
      }
    },
    
    // Action to clear favorites on logout
    clearFavorites() {
        this.favoriteIds = new Set();
        this.isLoaded = false;
    }
  },
});