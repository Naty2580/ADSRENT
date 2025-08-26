<script setup>
// This component is currently presentational. It can be wired with v-model later.
</script>

<template>
  <aside class="bg-white border border-dividerGray rounded-lg p-3 w-56 space-y-4 text-darkText text-xs">
    <!-- Bedrooms -->
    <div>
      <h3 class="font-semibold mb-2 text-sm">Bedrooms</h3>
      <select class="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-orangeAccent transition">
        <option value="">Any</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5+</option>
      </select>
    </div>

    <!-- Bathrooms -->
    <div>
      <h3 class="font-semibold mb-2 text-sm">Bathrooms</h3>
      <select class="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-orangeAccent transition">
        <option value="">Any</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4+</option>
      </select>
    </div>

    <!-- Size -->
    <div>
      <h3 class="font-semibold mb-2 text-sm">Size (m²)</h3>
      <input
        type="number"
        min="0"
        placeholder="Min size"
        class="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-orangeAccent transition"
      />
    </div>

    <!-- Amenities -->
    <div>
      <h3 class="font-semibold mb-2 text-sm">Amenities</h3>
      <div class="grid grid-cols-2 gap-2">
        <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="accent-orangeAccent" /><span>Parking</span></label>
        <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="accent-orangeAccent" /><span>Wi‑Fi</span></label>
        <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="accent-orangeAccent" /><span>Furnished</span></label>
        <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="accent-orangeAccent" /><span>Elevator</span></label>
        <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="accent-orangeAccent" /><span>Balcony</span></label>
        <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="accent-orangeAccent" /><span>Gym</span></label>
        <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="accent-orangeAccent" /><span>Pool</span></label>
        <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="accent-orangeAccent" /><span>AC</span></label>
        <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="accent-orangeAccent" /><span>Laundry</span></label>
        <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="accent-orangeAccent" /><span>Security</span></label>
      </div>
    </div>

    <!-- Available From -->
    <div>
      <h3 class="font-semibold mb-2 text-sm">Available From</h3>
      <input
        type="date"
        class="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-orangeAccent transition"
      />
    </div>

    <button
      class="w-full bg-orangeAccent text-white py-2 rounded-lg hover:bg-orangeAccent/90 font-semibold transition text-xs"
    >
      Apply Filters
    </button>
  </aside>
</template>
