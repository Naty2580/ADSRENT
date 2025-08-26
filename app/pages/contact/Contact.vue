<template>
  <section class="min-h-screen bg-white px-6 py-12">
    <div class="max-w-xl mx-auto bg-gray-50 p-8 rounded-lg shadow">
      <h1 class="text-3xl font-bold text-indigo-700 mb-6 text-center">Get in Touch</h1>
      <form class="space-y-4">
        <input type="text" placeholder="Your Name" class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300" />
        <input type="email" placeholder="Your Email" class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300" />
        <textarea placeholder="Your Message" class="w-full p-3 border rounded h-32 focus:outline-none focus:ring-2 focus:ring-indigo-300"></textarea>
        <button class="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition">
          Send Message
        </button>
      </form>
    </div>
  </section>
</template>