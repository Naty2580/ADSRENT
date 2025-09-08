<script setup>
import '~/types/api.js';
import { ref, computed } from 'vue';
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-vue-next';
import VueEasyLightbox from 'vue-easy-lightbox';

/**
 * @type {import('vue').defineProps<{
 *   media: Media[],
 *   propertyTitle: string
 * }>}
 */
const props = defineProps({
  media: { type: Array, required: true },
  propertyTitle: { type: String, default: 'Property Image' }
});

const images = computed(() => props.media.filter(m => m.type === 'image'));
const imageUrls = computed(() => images.value.map(img => img.url));

const activeImageIndex = ref(0);
const lightboxVisible = ref(false);
const lightboxIndex = ref(0);
const imageErrors = ref(new Set()); // Track images that fail to load

const activeImageUrl = computed(() => {
    return images.value[activeImageIndex.value]?.url || '';
});

function setActiveImage(index) {
  activeImageIndex.value = index;
}

function nextImage() {
  activeImageIndex.value = (activeImageIndex.value + 1) % images.value.length;
}

function prevImage() {
  activeImageIndex.value = (activeImageIndex.value - 1 + images.value.length) % images.value.length;
}

function showLightbox(index) {
  lightboxIndex.value = index;
  lightboxVisible.value = true;
}

function onImageError(index) {
  imageErrors.value.add(index);
}

function handleHideLightbox() {
  lightboxVisible.value = false;
}
</script>

<template>
  <div class="space-y-4">
    <!-- Main Image Display -->
    <div class="relative group aspect-[16/9] w-full overflow-hidden rounded-lg bg-secondary cursor-pointer" @click="showLightbox(activeImageIndex)">
      <Transition name="fade" mode="out-in">
        <div v-if="!imageErrors.has(activeImageIndex)" :key="activeImageUrl">
           <NuxtImg
              :src="activeImageUrl"
              :alt="propertyTitle"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              width="1200"
              height="675"
              @error="onImageError(activeImageIndex)"
           />
        </div>
        <div v-else :key="`error-${activeImageIndex}`" class="h-full w-full flex flex-col items-center justify-center text-muted-foreground">
           <ImageOff class="h-12 w-12" />
           <p class="mt-2 text-sm">Image not available</p>
        </div>
      </Transition>
      <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <!-- Navigation Buttons -->
      <button @click.stop="prevImage" class="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white backdrop-blur-sm transition-opacity opacity-0 group-hover:opacity-100 hover:bg-black/60">
        <ChevronLeft class="h-6 w-6" />
      </button>
       <button @click.stop="nextImage" class="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white backdrop-blur-sm transition-opacity opacity-0 group-hover:opacity-100 hover:bg-black/60">
        <ChevronRight class="h-6 w-6" />
      </button>
    </div>

    <!-- Thumbnail Scroller -->
    <div v-if="images.length > 1" class="w-full">
      <div class="flex space-x-3 overflow-x-auto pb-2 -mx-1 px-1">
        <button
          v-for="(image, index) in images"
          :key="image.id"
          @click="setActiveImage(index)"
          :class="['flex-shrink-0 h-24 w-32 rounded-md overflow-hidden ring-offset-background transition-all duration-200',
                   index === activeImageIndex ? 'ring-2 ring-primary scale-105' : 'hover:opacity-80'
                  ]"
        >
          <div v-if="!imageErrors.has(index)" class="h-full w-full">
            <NuxtImg
              :src="image.url"
              :alt="`Thumbnail ${index + 1}`"
              class="h-full w-full object-cover"
              width="128"
              height="96"
              @error="onImageError(index)"
            />
          </div>
          <div v-else class="h-full w-full flex items-center justify-center bg-secondary text-muted-foreground">
              <ImageOff class="h-6 w-6"/>
          </div>
        </button>
      </div>
    </div>
    
    <!-- Lightbox Component -->
    <VueEasyLightbox
        :visible="lightboxVisible"
        :imgs="imageUrls"
        :index="lightboxIndex"
        @hide="handleHideLightbox"
    ></VueEasyLightbox>

  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>