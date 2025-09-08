<script setup>
import 'maplibre-gl/dist/maplibre-gl.css';
import { Map, Marker, Popup } from 'maplibre-gl';
import { onMounted, shallowRef, watch } from 'vue';

const props = defineProps({ properties: Array });
const mapContainer = shallowRef(null);
const map = shallowRef(null);

onMounted(() => {
    map.value = new Map({
        container: mapContainer.value,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=...`, // Add your MapTiler key
        center: [38.7578, 9.0227], // Default to Addis
        zoom: 11
    });

    watch(() => props.properties, (newProperties) => {
        // Clear old markers
        // Add new markers
        newProperties.forEach(prop => {
            if (prop.latitude && prop.longitude) {
                new Marker({ color: "#FF6F3C" })
                    .setLngLat([prop.longitude, prop.latitude])
                    .setPopup(new Popup().setHTML(`<h5>${prop.title}</h5><p>${prop.price.amount} ${prop.price.currency}</p>`))
                    .addTo(map.value);
            }
        });
    }, { immediate: true });
});
</script>
<template>
  <div class="h-[calc(100vh-145px)] w-full" ref="mapContainer"></div>
</template>