<template>
  <div>

    <!-- If an error occurred, show the fallback container -->
    <div
      v-if="didError"
      :class="['inline-block bg-gray-100 text-center align-middle', $attrs.class as string]"
      :style="$attrs.style as any"
    >
      <div class="flex items-center justify-center w-full h-full">
        <img
          :src="ERROR_IMG_SRC"
          alt="Error loading image"
          :data-original-url="src"
          v-bind="imgOnlyAttrs"
        />
      </div>
    </div>
  
    <!-- Otherwise, attempt to render the primary image -->
    <img
      v-else
      :src="src"
      :alt="alt"
      v-bind="$attrs"
      @error="handleError"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue';

// Define the constant for the fallback placeholder image
const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

// Disable Vue's default behavior of inheriting attributes on the root element.
// This gives us full control over where to apply them ($attrs).
defineOptions({
  inheritAttrs: false,
});

// Define the props that the component logic explicitly uses.
// All other attributes (like class, style, data-*, etc.) will be in `$attrs`.
defineProps<{
  src?: string;
  alt?: string;
}>();

// `useAttrs` provides access to all attributes not declared as props.
const attrs = useAttrs();

// Reactive state to track if the image has failed to load.
const didError = ref(false);

// Event handler for the image's @error event.
const handleError = () => {
  didError.value = true;
};

// In the error case, we only want to pass non-style attributes to the inner
// fallback <img> tag, since `class` and `style` are applied to the outer div.
const imgOnlyAttrs = computed(() => {
  const rest = { ...attrs };
  delete rest.class;
  delete rest.style;
  return rest;
});
</script>