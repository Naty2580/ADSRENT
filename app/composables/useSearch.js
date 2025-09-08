import { reactive, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { debounce } from 'lodash-es';

export function useSearch() {
  const route = useRoute();
  const router = useRouter();

  // The state now includes ALL possible filters from the hero search and sidebar
  const filters = reactive({
    listing_type: route.query.listing_type || 'rent',
    keywords: route.query.keywords || '',
    address_region: route.query.address_region || '',
    address_subcity: route.query.address_subcity || '',
    address_specific_area: route.query.address_specific_area || '',
    property_type: route.query.property_type || 'all',
    min_price: route.query.min_price || '',
    max_price: route.query.max_price || '',
    min_area: route.query.min_area || '',
    max_area: route.query.max_area || '',
    bedrooms: route.query.bedrooms || 'any',
    bathrooms: route.query.bathrooms || 'any',
    is_furnished: route.query.is_furnished === 'true', // Convert string from URL to boolean
  });

  // This debounced function pushes filter changes from the sidebar to the URL.
  const updateUrl = debounce(() => {
    const query = {};
    for (const [key, value] of Object.entries(filters)) {
      if ((typeof value === 'boolean' && value === true) || (typeof value !== 'boolean' && value && value !== 'all' && value !== 'any')) {
        query[key] = value;
      }
    }
    // Using replace: true prevents bloating the browser history with every minor filter change
    router.replace({ path: '/properties', query });
  }, 500); // 500ms delay after user stops typing/selecting

  // Watch for changes in the filters object (i.e., when user interacts with the sidebar)
  watch(filters, updateUrl, { deep: true });
  
  // When the URL changes externally (e.g. back button), update our reactive filters
  watch(() => route.query, (newQuery) => {
    for (const key in filters) {
        filters[key] = newQuery[key] || (key === 'is_furnished' ? false : (key.includes('bedrooms') || key.includes('bathrooms') ? 'any' : (key === 'property_type' ? 'all' : '')));
    }
    filters.listing_type = newQuery.listing_type || 'rent';
    filters.is_furnished = newQuery.is_furnished === 'true';
  }, { deep: true, immediate: true });

  return {
    filters,
  };
}