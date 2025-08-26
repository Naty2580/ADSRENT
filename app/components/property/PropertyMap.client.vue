<script setup>
import 'maplibre-gl/dist/maplibre-gl.css';
import { Map, Marker } from 'maplibre-gl';
import { onMounted, shallowRef } from 'vue';

const props = defineProps({
    longitude: Number,
    latitude: Number
});

const mapContainer = shallowRef(null);
const map = shallowRef(null);

onMounted(() => {
    if (!props.latitude || !props.longitude) return;

    map.value = new Map({
        container: mapContainer.value,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=get-your-own-key`, // Replace with your key
        center: [props.longitude, props.latitude],
        zoom: 14
    });

    new Marker({color: "#FF6F3C"})
        .setLngLat([props.longitude, props.latitude])
        .addTo(map.value);
});

// For maplibre, you can get a free key from maptiler.com
</script>

<template>
    <div ref="mapContainer" class="w-full h-[400px] bg-secondary rounded-lg"></div>
</template>