<script setup>
import '~/types/api.js';

/**
 * @type {import('vue').defineProps<{
 *   media: Media[],
 *   propertyTitle: string
 * }>}
 */
const props = defineProps({
  media: {
    type: Array,
    required: true,
  },
  propertyTitle: {
    type: String,
    default: 'Property Image'
  }
});

const images = computed(() => props.media.filter(m => m.type === 'image'));
const selectedImage = ref(images.value[0]?.url || '');
</script>

<template>
  <div>
    <div class="aspect-[16/9] w-full overflow-hidden rounded-lg bg-secondary">
       <NuxtImg
          :src="selectedImage"
          :alt="propertyTitle"
          class="h-full w-full object-cover"
          width="1200"
          height="675"
        />
    </div>
    <div v-if="images.length > 1" class="mt-4">
      <div class="flex space-x-5 overflow-x-auto pb-2">
         <button 
          v-for="image in images" 
          :key="image.id" 
          @click="selectedImage = image.url"
          class="flex-shrink-0 h-16 w-20  rounded-md overflow-hidden ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          :class="{ 'ring-2 ring-primary': selectedImage === image.url }"
         >
            <NuxtImg
              :src="image.url"
              :alt="` ${propertyTitle}`"
              class="h-full w-full object-cover"
             
            />
          </button>
      </div>
    </div>
  </div>
</template>