import { defineStore } from 'pinia';

export const useCurrencyStore = defineStore('currency', {
    state: () => ({
        selectedCurrency: 'ETB',
        rates: { ETB: 1, USD: 0.018, EUR: 0.017 }, // Default rates
    }),
    actions: {
        setCurrency(currency) {
            this.selectedCurrency = currency;
        },
        async fetchRates() {
            // In a real app:
            // const { $api } = useNuxtApp();
            // this.rates = await $api.get('/rates');
            console.log("Fetched exchange rates.");
        },
        /**
         * @param {number} etbAmount - The price in the base currency, ETB.
         */
        convert(etbAmount) {
            if (!etbAmount) return { amount: '0.00', currency: this.selectedCurrency };
            
            const rate = this.rates[this.selectedCurrency];
            const convertedAmount = etbAmount * rate;
            
            return {
                amount: new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: this.selectedCurrency
                }).format(convertedAmount),
                currency: this.selectedCurrency
            }
        }
    },
    persist: {
        paths: ['selectedCurrency'],
    },
});