<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  properties: {
    type: Array,
    default: () => []
  }
})

let map
let markersLayer
const mapContainer = ref(null)

function initMap() {
  if (map) return
  map = L.map(mapContainer.value, {
    center: [8.9806, 38.7578],
    zoom: 12,
  })
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)
  markersLayer = L.layerGroup().addTo(map)
}

function refreshMarkers() {
  if (!map) return
  markersLayer.clearLayers()

  const bounds = L.latLngBounds([])
  props.properties.forEach(p => {
    if (p.lat && p.lng) {
      const marker = L.marker([p.lat, p.lng])
        .bindPopup(`
          <div style='min-width: 200px;'>
            <strong>${p.title || 'Property'}</strong><br/>
            ${p.location || ''}<br/>
            ${p.price ? `ETB ${Number(p.price).toLocaleString()}` : ''}
          </div>
        `)
      markersLayer.addLayer(marker)
      bounds.extend([p.lat, p.lng])
    }
  })

  if (props.properties.length && bounds.isValid()) {
    map.fitBounds(bounds.pad(0.2))
  } else {
    map.setView([8.9806, 38.7578], 12)
  }
}

onMounted(() => {
  initMap()
  refreshMarkers()
})

watch(
  () => props.properties,
  () => {
    refreshMarkers()
  },
  { deep: true }
)
</script>

<template>
  <div ref="mapContainer" class="h-[500px] w-full rounded-lg border border-dividerGray"></div>
</template>

<style scoped>
:global(.leaflet-container) {
  font-family: inherit;
}
</style>
