import { defineStore } from 'pinia';
import '~/types/api.js';

/**
 * Helper to get the user from local storage safely.
 * We store the user object to avoid re-fetching on every page refresh,
 * but the token remains the primary source of truth for auth state.
 * @returns {User | null}
 */
export const getStoredUser = () => {
  if (import.meta.client) {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
}

/**
 * Helper to get the token.
 * This can be from a cookie or localStorage.
 * We'll use localStorage for simplicity, but a secure cookie is a good future enhancement.
 * @returns {string | null}
 */
export const getStoredToken = () => {
  if (import.meta.client) {
    return localStorage.getItem('token');
  }
  return null;
}

 
export const useAuthStore = defineStore('auth', {
  state: () => ({
     /** @type {User | null} */
     user: null,
     /** @type {string | null} */
     token: null,
     returnUrl: null,
     isInitialized: false,
    returnUrl: null,
  }),

  getters: {
    /** @returns {boolean} */
    isLoggedIn: (state) => !!state.token && !!state.user,

    /** @returns {string[]} */
    roles: (state) => state.user?.roles || [],

    /** @returns {boolean} */
    isAdmin: (state) => state.user?.roles?.includes('admin') || false,

    /** @returns {boolean} */
    isLessor: (state) => state.user?.roles?.includes('lister') || false,
  },

  actions: {

    initialize() {
      if (this.isInitialized) return;
 
      if (import.meta.client) {
          this.token = localStorage.getItem('token');
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
              this.user = JSON.parse(storedUser);
          }
      }
      this.isInitialized = true;
  },

    /**
     * @param {AuthResponse} authResponse
     */
    _setAuthData(authResponse) {
      this.user = authResponse.user;
      this.token = authResponse.token;
      if (import.meta.client) {
        localStorage.setItem('user', JSON.stringify(authResponse.user));
        localStorage.setItem('token', authResponse.token);
      }
    },

    async login(payload) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api.post('/login', payload);
        this._setAuthData(response);
        return response;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    
    /**
     * @param {User} user
     */
    _setUser(user) {
        this.user = user;
        if (import.meta.client) {
          localStorage.setItem('user', JSON.stringify(user));
        }
    },

    async fetchUser() {
      if (!this.token) {
        // No token, no need to fetch
        return;
      }
      
      const { $api } = useNuxtApp();
      try {
        // We will implement the 'me' endpoint as recommended.
        const user = await $api.get('/user');
        this._setUser(user.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        // If we get a 401, it means the token is invalid. Log out.
        if (error.response?.status === 401) {
            this.logout();
        }
      }
    },

    async register(payload) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api.post('/register', payload);
        this._setAuthData(response); // Log the user in immediately after registration
        return response;
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      }
    },

    async updateProfile(payload) {
      const { $api } = useNuxtApp();
      try {
        const updatedUser = await $api.put('/user', payload);
        this._setUser(updatedUser); // Reuse our existing helper to update state
        return updatedUser;
      } catch (error) {
        console.error('Profile update failed:', error);
        throw error;
      }
    },
    
    

    async logout() {
      const { $api } = useNuxtApp();
      try {
        // Inform the backend to invalidate the token if needed
        await $api.post('/logout');
      } catch (error) {
        console.error('Logout API call failed, proceeding with client-side logout:', error);
      } finally {
        // Always perform client-side cleanup
        const favoritesStore = useFavoritesStore();
        favoritesStore.clearFavorites();
        this.$reset();
        if (import.meta.client) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
        // Redirect to homepage after logout
        await navigateTo('/');
      }
    },

  },
  
});