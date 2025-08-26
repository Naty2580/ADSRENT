<template>
  <div class="bg-gray-50 text-gray-800 font-sans">
    <!-- Blog Section -->
    <section class="max-w-5xl mx-auto py-16 px-6">
      <h2 class="text-4xl font-bold mb-8 text-center text-indigo-600">🏡 What People Say About Our Homes</h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div v-for="(post, index) in blogPosts" :key="index" class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 class="text-xl font-semibold text-indigo-700 mb-2">{{ post.title }}</h3>
          <p class="text-gray-600 mb-4">{{ post.content }}</p>
          <p class="text-sm text-gray-400">— {{ post.author }}</p>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="bg-indigo-100 py-16 px-6">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-4xl font-bold mb-8 text-center text-indigo-700">📬 Contact Us</h2>
        
        <!-- Contact Info -->
        <div class="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <p class="text-lg mb-4"><strong>Phone:</strong> +251 912 345 678</p>
            <p class="text-lg mb-4"><strong>Email:</strong> info@shoppingcenter.et</p>
            <div class="flex space-x-4 mt-4">
              <a href="#" class="text-indigo-600 hover:text-indigo-800 text-2xl"><i class="fab fa-facebook"></i></a>
              <a href="#" class="text-indigo-600 hover:text-indigo-800 text-2xl"><i class="fab fa-twitter"></i></a>
              <a href="#" class="text-indigo-600 hover:text-indigo-800 text-2xl"><i class="fab fa-instagram"></i></a>
              <a href="#" class="text-indigo-600 hover:text-indigo-800 text-2xl"><i class="fab fa-linkedin"></i></a>
            </div>
          </div>

          <!-- Message Form -->
          <form class="bg-white p-6 rounded-lg shadow space-y-4">
            <input type="text" placeholder="Your Name" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            <input type="email" placeholder="Your Email" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            <textarea rows="4" placeholder="Your Message" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"></textarea>
            <button type="submit" class="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const blogPosts = [
  {
    title: "Spacious and Modern!",
    content: "I love how open and airy the layout is. Perfect for families.",
    author: "Selam T."
  },
  {
    title: "Great Location",
    content: "Close to everything I need—shops, cafes, and transport.",
    author: "Abel M."
  },
  {
    title: "Affordable Luxury",
    content: "Feels high-end without breaking the bank. Highly recommend!",
    author: "Lily G."
  },
  {
    title: "Safe and Peaceful",
    content: "Security is top-notch, and the neighborhood is quiet.",
    author: "Yonas K."
  }
]
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
</style>