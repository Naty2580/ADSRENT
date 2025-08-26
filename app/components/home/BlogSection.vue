<script setup>
import BlogCard from '../blog/BlogCard.vue';

// --- MOCK DATA ---
const latestPosts = ref([
  {
    slug: '5-tips-for-first-time-home-buyers',
    title: '5 Essential Tips for First-Time Home Buyers in Addis',
    description: 'Navigating the real estate market can be daunting. Here are five key tips to help you make an informed decision.',
    category: 'Buying Guide',
    date: 'July 25, 2025',
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa'
  },
  {
    slug: 'rental-market-trends-2025',
    title: 'Rental Market Trends in Ethiopia for 2025',
    description: 'What can tenants and landlords expect from the rental market this year? We dive into the data and predictions.',
    category: 'Market Insights',
    date: 'July 18, 2025',
    readTime: 7,
    imageUrl: 'https://images.unsplash.com/photo-1448630360428-65456885c650'
  },
  {
    slug: 'how-to-stage-your-home-for-sale',
    title: 'How to Stage Your Home to Attract More Buyers',
    description: 'A well-staged home can sell faster and for a higher price. Learn the secrets from professional home stagers.',
    category: 'Selling Tips',
    date: 'July 10, 2025',
    readTime: 6,
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'
  }
]);
</script>

<template>
  <div class="py-12 md:py-20">
    <div class="text-center">
      <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground">
        From Our Blog
      </h2>
      <p class="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
        Get the latest real estate tips, news, and market insights.
      </p>
    </div>
    <div class="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BlogCard 
        v-for="post in latestPosts"
        :key="post.slug"
        :post="post"
      />
    </div>
  </div>
</template>