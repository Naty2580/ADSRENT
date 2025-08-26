import { reactive, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { debounce } from 'lodash-es';

export function useSearch() {
  const route = useRoute();
  const router = useRouter();

  // The reactive state holds our filter values.
  // It's initialized from the current URL query parameters.
  const filters = reactive({
    keyword: route.query.keyword || '',
    listingType: route.query.listingType || 'rent', // Changed 'type' to 'listingType' for clarity
    propertyType: route.query.propertyType || 'all',
    region: route.query.region || '',
    subcity: route.query.subcity || '',
    minPrice: route.query.minPrice || '',
    maxPrice: route.query.maxPrice || '',
    bedrooms: route.query.bedrooms || 'any',
  });

  // This computed property generates a cache key from the filters.
  // It's useful for making useAsyncData re-fetch when filters change.
  const queryKey = computed(() => JSON.stringify(filters));

  // A debounced function to push filter changes to the URL.
  // This prevents updating the URL on every single keystroke.
  const updateUrl = debounce(() => {
    const query = {};
    // Only add filters to the query string if they have a value.
    for (const [key, value] of Object.entries(filters)) {
      if (value && value !== 'all' && value !== 'any' && value !== '') {
        query[key] = value;
      }
    }
    router.push({ path: '/properties', query });
  }, 500); // 500ms debounce delay

  watch(() => filters.region, () => {
    filters.subcity = '';
  });

  function performSearch() {
    const query = {};
     for (const [key, value] of Object.entries(filters)) {
       if (value && value !== 'all' && value !== 'any' && value !== '') {
         query[key] = value;
       }
     }
     navigateTo({ path: '/properties', query });
 }



  // Watch for any changes in our filters object and update the URL.
  // watch(filters, updateUrl, { deep: true });

  return {
    filters,
    queryKey,
    performSearch
  };
}