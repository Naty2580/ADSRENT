import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    unreadCount: 0,
    pollInterval: null, // To hold the interval timer ID
  }),
  
  actions: {
    async fetchUnreadCount() {
      const { $api } = useNuxtApp();
      // Ensure the user is logged in before fetching
      const authStore = useAuthStore();
      if (!authStore.isLoggedIn) {
        this.stopPolling();
        return;
      }
      
      try {
        const response = await $api.get('/notifications/unread-count');
        this.unreadCount = response.count;
      } catch (error) {
        console.error('Failed to fetch unread notification count:', error);
      }
    },
    
    startPolling() {
      // Don't start another poll if one is already running
      if (this.pollInterval) return;
      
      console.log("Starting notification polling...");
      // Fetch immediately, then start the interval
      this.fetchUnreadCount();
      
      this.pollInterval = setInterval(() => {
        this.fetchUnreadCount();
      }, 30000); // Poll every 30 seconds
    },
    
    stopPolling() {
      if (this.pollInterval) {
        console.log("Stopping notification polling.");
        clearInterval(this.pollInterval);
        this.pollInterval = null;
        this.unreadCount = 0;
      }
    },

    async markAsRead() {
        const { $api } = useNuxtApp();
        try {
            await $api.post('/notifications/mark-as-read');
            this.unreadCount = 0; // Optimistically update the UI
        } catch(error) {
            console.error("Failed to mark notifications as read:", error);
        }
    }
  },
});