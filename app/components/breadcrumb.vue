<template>
  <nav v-bind="$attrs" aria-label="breadcrumb" data-slot="breadcrumb">
    <slot />
  </nav>
</template>

<script>
export default {
  name: "Breadcrumb",
};
</script>