<template>
    <nav class="bg-white shadow-sm border-b border-dividerGray sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <img src="/images/logo.svg" alt="AddisRent Logo" class="h-8 w-auto" />
          <span class="text-lg font-semibold text-darkText">AddisRent</span>
        </div>
  
          
        <!-- Menu -->
        <div class="hidden md:flex items-center space-x-4 text-sm text-gray-600">
          <a href="#" class="hover:text-orangeAccent transition">Home</a>
          <a href="#" class="hover:text-orangeAccent transition">Listings</a>
          <a href="#" class="hover:text-orangeAccent transition">Contact</a>
          <button
            class="bg-orangeAccent text-white px-3 py-1.5 rounded-full hover:bg-orangeAccent/90 transition"
          >
            Post a Listing
          </button>
        </div>
      </div>
    </nav>
  </template>
  