import axios from 'axios';
import { useAuthStore } from '~/stores/auth'; // Ensure this is imported here for Nuxt 3's auto-import context

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  
  const api = axios.create({
    baseURL: config.public.apiBase,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // --- Request Interceptor ---
  // This runs BEFORE each request is sent.
  api.interceptors.request.use(
    (config) => {
      // We must get the store inside the interceptor,
      // because the store is initialized after the plugin setup.
      const authStore = useAuthStore();
      
      if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`;
      }
      return config;
    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
  );

  // --- Response Interceptor ---
  // This runs AFTER a response is received.
  api.interceptors.response.use(
    (response) => {
      // Axios wraps the response data in a `data` property.
      // We can return response.data to simplify our API calls in components.
      return response.data;
    },
    (error) => { 
      // We must get the store inside the interceptor here as well.
      const authStore = useAuthStore();
      
      // Handle global error cases, like 401 Unauthorized
      if (error.response?.status === 401) {
        console.warn('Axios interceptor: Received 401 Unauthorized, logging out.');
        // If the server returns a 401, log the user out.
        authStore.logout();
      }

      // Always reject the promise so that local `.catch()` blocks can handle
      // specific error messages (e.g., showing 'Invalid credentials' on a login form).
      return Promise.reject(error.response?.data || error.message);
    }
  );

  // Provide the configured axios instance to the Nuxt app
  // Now we can use `$api` in any component or page.
  return {
    provide: {
      api,
    },
  };
});