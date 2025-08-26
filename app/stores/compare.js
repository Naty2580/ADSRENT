import { defineStore } from 'pinia';
import '~/types/api.js';

export const useCompareStore = defineStore('compare', {
  state: () => ({
    /** @type {number[]} */
    compareIds: [],
    MAX_COMPARE_ITEMS: 4,
  }),
  getters: {
    /** @returns {number} */
    count: (state) => state.compareIds.length,
    /** @param {number} propertyId */
    isComparing: (state) => (propertyId) => state.compareIds.includes(propertyId),
    /** @returns {boolean} */
    isFull: (state) => state.compareIds.length >= state.MAX_COMPARE_ITEMS,
  },
  actions: {
    toggleCompare(propertyId) {
      if (this.isComparing(propertyId)) {
        // Remove it
        this.compareIds = this.compareIds.filter(id => id !== propertyId);
      } else {
        // Add it
        if (this.isFull) {
          this.compareIds.shift(); // Remove the first (oldest) item
        }
        this.compareIds.push(propertyId);
      }
    },
    clearCompare() {
      this.compareIds = [];
    }
  },
  persist: true, // This will use pinia-plugin-persistedstate to save to localStorage
});