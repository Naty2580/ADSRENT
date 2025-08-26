<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>

<template>
   <article class="group relative flex flex-col overflow-hidden rounded-lg bg-card text-card-foreground shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
     <NuxtLink :to="`/blog/${post.slug}`" class="block">
       <NuxtImg
         :src="post.imageUrl"
         :alt="`Image for ${post.title}`"
         class="aspect-[16/9] w-full object-cover"
         width="400"
         height="225"
       />
     </NuxtLink>
     <div class="flex flex-1 flex-col p-4">
       <div class="flex-1">
          <p class="text-sm text-primary">{{ post.category }}</p>
         <NuxtLink :to="`/blog/${post.slug}`" class="mt-2 block">
           <p class="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{{ post.title }}</p>
           <p class="mt-3 text-sm text-muted-foreground line-clamp-2">{{ post.description }}</p>
         </NuxtLink>
       </div>
       <div class="mt-4 flex items-center border-t pt-4">
          <p class="text-xs text-muted-foreground">{{ post.date }} &middot; {{ post.readTime }} min read</p>
       </div>
     </div>
   </article>
</template>