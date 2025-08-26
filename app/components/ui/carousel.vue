<template>
  <div
    :class="['relative', className]"
    role="region"
    aria-roledescription="carousel"
    data-slot="carousel"
    v-bind="$attrs"
    @keydown.capture="handleKeyDown"
  >
    <slot />
  </div>
</template>

<script>
import { ref, provide, onMounted, onUnmounted } from "vue";
import useEmblaCarousel from "embla-carousel-vue";

export default {
  name: "Carousel",
  props: {
    className: String,
    orientation: {
      type: String,
      default: "horizontal",
    },
    opts: Object,
    plugins: Array,
  },
  setup(props) {
    const carouselRef = ref(null);
    const { emblaApi, emblaRef } = useEmblaCarousel({
      axis: props.orientation === "horizontal" ? "x" : "y",
      ...props.opts,
    });

    const canScrollPrev = ref(false);
    const canScrollNext = ref(false);

    const onSelect = () => {
      if (!emblaApi.value) return;
      canScrollPrev.value = emblaApi.value.canScrollPrev();
      canScrollNext.value = emblaApi.value.canScrollNext();
    };

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        emblaApi.value?.scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        emblaApi.value?.scrollNext();
      }
    };

    onMounted(() => {
      if (!emblaApi.value) return;
      emblaApi.value.on("select", onSelect);
    });

    onUnmounted(() => {
      if (!emblaApi.value) return;
      emblaApi.value.off("select", onSelect);
    });

    provide("carouselContext", {
      carouselRef,
      emblaApi,
      canScrollPrev,
      canScrollNext,
    });

    return {
      carouselRef,
      handleKeyDown,
    };
  },
};
</script>