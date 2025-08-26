<script setup lang="ts">
import {computed} from 'vue'
import  Card from '@/components/ui/card/Card.vue'
import CardContent  from '@/components/ui/card/CardContent.vue'
import  CardFooter from '@/components/ui/card/CardFooter.vue'
import Button  from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import { Calendar, User, Edit, Trash2 } from 'lucide-vue-next'
import ImageWithFallback from '@/components/figma/ImageWithFallback.vue'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  authorName: string
  authorAvatar?: string
  publishDate: string
  featuredImage?: string
  status: 'pending' | 'approved' | 'rejected'
  authorId: string
}

const props = defineProps<{
  post: BlogPost
  currentUserId?: string
}>()

const emit = defineEmits<{
  (e: 'readMore', post: BlogPost): void
  (e: 'edit', post: BlogPost): void
  (e: 'delete', postId: string): void
}>()

const isOwner = computed(() => props.currentUserId === props.post.authorId)
</script>

<template>
  <Card class="h-full flex flex-col">
    <div v-if="post.featuredImage" class="aspect-[16/9] overflow-hidden rounded-t-lg">
      <ImageWithFallback
        :src="post.featuredImage"
        :alt="post.title"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>

    <CardContent class="flex-1 p-6">
      <div class="flex items-center justify-between mb-3">
        <Badge variant="secondary">{{ post.category }}</Badge>
        <Badge
          v-if="post.status === 'pending'"
          variant="outline"
          class="text-orange-600 border-orange-600"
        >
          Pending Review
        </Badge>
      </div>

      <h3 class="mb-3 line-clamp-2">{{ post.title }}</h3>
      <p class="text-muted-foreground mb-4 line-clamp-3">{{ post.excerpt }}</p>

      <div class="flex items-center space-x-4 text-sm text-muted-foreground">
        <div class="flex items-center space-x-1">
          <User class="w-4 h-4" />
          <span>{{ post.authorName }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <Calendar class="w-4 h-4" />
          <span>{{ new Date(post.publishDate).toLocaleDateString() }}</span>
        </div>
      </div>
    </CardContent>

    <CardFooter class="p-6 pt-0 flex justify-between">
      <Button @click="emit('readMore', post)">Read More</Button>

      <div v-if="isOwner" class="flex space-x-2">
        <Button variant="outline" size="sm" @click="emit('edit', post)">
          <Edit class="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" @click="emit('delete', post.id)">
          <Trash2 class="w-4 h-4" />
        </Button>
      </div>
    </CardFooter>
  </Card>
</template>