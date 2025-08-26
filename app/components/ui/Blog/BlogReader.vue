<script setup lang="ts">
import Card  from '@/components/ui/card/Card.vue'
import  CardContent from '@/components/ui/card/CardContent.vue'
import CardHeader  from '@/components/ui/card/CardHeader.vue'
import  Button  from '@/components/ui/Button.vue'
import Badge  from '@/components/ui/Badge.vue'
import { Calendar, User, X } from 'lucide-vue-next'
import ImageWithFallback from '@/components/figma/ImageWithFallback.vue'

interface BlogPost {
  id: string
  title: string
  content: string
  category: string
  authorName: string
  publishDate: string
  featuredImage?: string
}

defineProps<{
  post: BlogPost | null
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div v-if="isOpen && post" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <Card class="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <CardHeader class="flex flex-row relative items-center justify-between">
        <div class="flex-1">
          <Badge variant="secondary" class="mb-3">{{ post.category }}</Badge>
          <h1 class="text-3xl mb-4">{{ post.title }}</h1>
          <div class="flex items-center space-x-4 text-muted-foreground">
            <div class="flex items-center space-x-1">
              <User class="w-4 h-4" />
              <span>{{ post.authorName }}</span>
            </div>
            <div class="flex items-center space-x-1">
              <Calendar class="w-4 h-4" />
              <span>{{ new Date(post.publishDate).toLocaleDateString() }}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" class="absolute right-1 top-1" size="sm" @click="emit('close')">
          <X class="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent>
        <div v-if="post.featuredImage" class="mb-6">
          <ImageWithFallback
            :src="post.featuredImage"
            :alt="post.title"
            class="w-full h-64 object-cover rounded-lg"
          />
        </div>

        <div class="prose max-w-none">
          <div class="whitespace-pre-wrap">{{ post.content }}</div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>