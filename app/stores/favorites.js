import { defineStore } from 'pinia';
import '~/types/api.js';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    /** @type {Set<number>} */
    favoriteIds: new Set(),
    isLoaded: false,
  }),

  getters: {
    isFavorite: (state) => (propertyId) => {
      return state.favoriteIds.has(propertyId);
    },
    count: (state) => state.favoriteIds.size,
  },

  actions: {
    /**
     * Fetches the initial list of favorites and correctly extracts the IDs.
     */
    async fetchFavorites() {
      // If we already fetched the list for this session, don't do it again.
      if (this.isLoaded) return;

      const { $api } = useNuxtApp();
      try {
        // Your backend returns a paginated list of full property objects.
        const response = await $api.get('/favorites');
        
        // Extract just the IDs from the 'data' array in the response.
        const ids = response.data.map(property => property.id);
        
        this.favoriteIds = new Set(ids);
        this.isLoaded = true;
        console.log("Favorites loaded, IDs:", this.favoriteIds);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    },
    
    /**
     * Toggles a favorite with optimistic UI, aligned with the backend.
     * @param {Property | {id: number}} property
     */
    async toggleFavorite(property) {
      const { $api } = useNuxtApp();

      if (!property || typeof property.id !== 'number') return;
      
      const authStore = useAuthStore();
      if (!authStore.isLoggedIn) {
          return navigateTo('/auth/login');
      }

      const propertyId = property.id;
      const isCurrentlyFavorite = this.isFavorite(propertyId);

      // Optimistic UI Update
      if (isCurrentlyFavorite) {
        this.favoriteIds.delete(propertyId);
      } else {
        this.favoriteIds.add(propertyId);
      }

      // API Call to the correct toggle endpoint
      try {
        await $api.post(`/properties/${propertyId}/favorite`);
      } catch (error) {
        console.error("Failed to toggle favorite status:", error);
        // Revert UI on failure
        if (isCurrentlyFavorite) {
          this.favoriteIds.add(propertyId);
        } else {
          this.favoriteIds.delete(propertyId);
        }
      }
    },
    
    clearFavorites() {
      this.favoriteIds = new Set();
      this.isLoaded = false;
    }
  },
});