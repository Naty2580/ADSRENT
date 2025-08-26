<template>
  <div
    ref="viewport"
    class="relative"
    role="region"
    aria-roledescription="carousel"
    @keydown.capture="handleKeyDown"
    data-slot="carousel"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, provide, onMounted, onUnmounted, watch } from 'vue'
import useEmblaCarousel from 'embla-carousel-vue'

const props = defineProps({
  opts: Object,
  plugins: Array,
  orientation: {
    type: String,
    default: 'horizontal',
  },
})

const viewport = ref(null)
const [emblaRef, emblaApi] = useEmblaCarousel({
  axis: props.orientation === 'horizontal' ? 'x' : 'y',
  ...props.opts,
}, props.plugins)

const canScrollPrev = ref(false)
const canScrollNext = ref(false)

function updateScrollState() {
  if (!emblaApi.value) return
  canScrollPrev.value = emblaApi.value.canScrollPrev()
  canScrollNext.value = emblaApi.value.canScrollNext()
}

function scrollPrev() {
  emblaApi.value?.scrollPrev()
}

function scrollNext() {
  emblaApi.value?.scrollNext()
}

function handleKeyDown(e) {
  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    scrollPrev()
  } else if (e.key === 'ArrowRight') {
    e.preventDefault()
    scrollNext()
  }
}

onMounted(() => {
  watch(emblaApi, (api) => {
    if (!api) return
    updateScrollState()
    api.on('select', updateScrollState)
    api.on('reInit', updateScrollState)
  })
})

onUnmounted(() => {
  emblaApi.value?.off('select', updateScrollState)
})

provide('carousel', {
  emblaRef,
  emblaApi,
  scrollPrev,
  scrollNext,
  canScrollPrev,
  canScrollNext,
  orientation: props.orientation,
})
</script>