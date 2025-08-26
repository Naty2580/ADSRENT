<script setup>
import '~/types/api.js';
import { BedDouble, Bath, Framer, Heart, Share, Check } from 'lucide-vue-next';

// --- Data Fetching & SEO ---
const route = useRoute();
const propertyId = route.params.id;

// --- MOCK API FETCH for a single property ---
const { data: property, pending, error } = await useAsyncData(
  `property-${propertyId}`,
  () => {
    // This would be your API call: $fetch(`/api/properties/${propertyId}`)
    console.log(`Fetching property with id: ${propertyId}`);
    // Simulate API response
    return new Promise(resolve => {
        setTimeout(() => {
             resolve({ 
                id: 1, title: 'Spacious Villa with Lush Garden in Bole', description: '<p>Discover unparalleled comfort in this stunning villa located in the heart of Bole. This property boasts an expansive living area with high ceilings, large windows that flood the space with natural light, and elegant hardwood flooring throughout.</p><p>The modern kitchen is a chef\'s dream, equipped with top-of-the-line appliances and a breakfast nook. Each of the four bedrooms is a private retreat with its own en-suite bathroom. The master suite features a walk-in closet and a luxurious spa-like bathroom.</p><p>Step outside to your private oasis—a beautifully landscaped garden perfect for relaxation or entertaining guests. The property also includes a dedicated office space, staff quarters, and secure parking for multiple vehicles.</p>', 
                listingType: 'rent', status: 'active',
                price: { amount: '85,000.00', raw: 85000, currency: 'ETB' }, 
                location: { region: 'Addis Ababa', city: 'Addis Ababa', subcity: 'Bole', specificArea: 'Near Atlas Hotel', latitude: 9.0054, longitude: 38.7749 }, 
                bedrooms: 4, bathrooms: 5, area: 300, isFurnished: true,
                amenities: ['Swimming Pool', 'Gym', 'Backup Generator', '24/7 Security', 'High-speed Internet', 'Garden', 'Balcony', 'Staff Quarters'],
                lister: { id: 101, name: 'Ethio Real Estate', avatarUrl: 'https://i.pravatar.cc/150?u=ethio-re', memberSince: '2023' },
                media: [
                    { id: 1, url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', type: 'image' },
                    { id: 2, url: 'https://images.unsplash.com/photo-1600585153313-a4b7a1dfa521', type: 'image' },
                    { id: 3, url: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198', type: 'image' },
                    { id: 4, url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c', type: 'image' }
                ],
                postedAt: '3 weeks ago',
            });
        }, 500);
    });
  }
);

// Handle cases where the property isn't found
if (error.value || !property.value) {
    showError({ statusCode: 404, statusMessage: 'Property Not Found', fatal: true });
}

// Set dynamic SEO meta tags for this page
useHead({
  title: () => `${property.value?.title || 'Property Details'} | AdissRent`,
  meta: [
    { name: 'description', content: () => property.value?.description.substring(0, 155) || 'View details for this property.' }
  ]
})
</script>

<template>
  <div v-if="pending" class="text-center py-40">Loading...</div>
  <div v-else-if="property" class="bg-secondary/30">
    <div class="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

        <!-- Left / Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <PropertyGallery :media="property.media" :propertyTitle="property.title" />

          <!-- Header & Stats -->
          <div class="bg-card p-6 rounded-lg shadow-sm">
            <div class="flex flex-col md:flex-row justify-between items-start">
              <div>
                <h1 class="font-display text-3xl font-bold text-foreground">{{ property.title }}</h1>
                <p class="mt-2 text-muted-foreground">{{ property.location.specificArea }}, {{ property.location.city }}</p>
              </div>
              <div class="flex items-center space-x-2 mt-4 md:mt-0">
                  <Button variant="outline" size="sm"><Heart class="h-4 w-4 mr-2" /> Favorite</Button>
                  <Button variant="outline" size="sm"><Share class="h-4 w-4 mr-2" /> Share</Button>
              </div>
            </div>

            <div class="border-t my-6"></div>
            
            <div class="flex items-center justify-between text-muted-foreground">
               <div class="flex flex-wrap gap-x-6 gap-y-3">
                 <div v-if="property.bedrooms" class="flex items-center text-sm"><BedDouble class="h-4 w-4 mr-2 text-primary" /> {{ property.bedrooms }} Bedrooms</div>
                 <div v-if="property.bathrooms" class="flex items-center text-sm"><Bath class="h-4 w-4 mr-2 text-primary" /> {{ property.bathrooms }} Bathrooms</div>
                 <div class="flex items-center text-sm"><Framer class="h-4 w-4 mr-2 text-primary" /> {{ property.area }} m²</div>
               </div>
                <div class="flex-shrink-0">
                    <p class="text-2xl font-bold text-primary">{{ new Intl.NumberFormat('en-US').format(property.price.raw) }} {{ property.price.currency }}</p>
                </div>
            </div>
          </div>
          
          <!-- Description -->
          <div class="bg-card p-6 rounded-lg shadow-sm">
              <h2 class="font-display text-2xl font-semibold mb-4">About this property</h2>
              <div class="prose max-w-none text-foreground/80" v-html="property.description"></div>
          </div>
          
          <!-- Amenities -->
           <div class="bg-card p-6 rounded-lg shadow-sm">
              <h2 class="font-display text-2xl font-semibold mb-4">Amenities</h2>
              <ul class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <li v-for="amenity in property.amenities" :key="amenity" class="flex items-center">
                    <Check class="h-5 w-5 text-accent mr-2" />
                    <span class="text-foreground/80">{{ amenity }}</span>
                  </li>
              </ul>
          </div>
          
          <!-- Map -->
           <div class="bg-card p-6 rounded-lg shadow-sm">
              <h2 class="font-display text-2xl font-semibold mb-4">Location</h2>
              <PropertyMap.client :latitude="property.location.latitude" :longitude="property.location.longitude" />
           </div>

        </div>
 
        <!-- Right / Sidebar -->
        <aside class="lg:col-span-1">
           <div class="sticky top-24 space-y-8">
              <PropertyLessorInfoCard :lister="property.lister" />
              <!-- Booking Form will go here -->
              <PropertyInquiryForm :property-id="property.id" />

           </div>
        </aside>

      </div>
    </div>
  </div>
</template>