<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Card from '@/components/ui/card/Card.vue'
import CardContent  from '@/components/ui/card/CardContent.vue'
import CardHeader  from '@/components/ui/card/CardHeader.vue'
import CardTitle  from '@/components/ui/card/CardTitle.vue'
import  Button  from '@/components/ui/Button.vue'
import  Input  from '@/components/ui/Input.vue'
import Label  from '@/components/ui/Label.vue'
import  Textarea  from '@/components/ui/Textarea.vue'

import Select from '@/components/ui/select/Select.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import { X, Upload } from 'lucide-vue-next'

interface BlogFormData {
  title: string
  category: string
  content: string
  featuredImage?: string
}

const props = defineProps<{
  isOpen: boolean
  initialData?: Partial<BlogFormData>
  isEdit?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: BlogFormData): void
}>()

const categories = [
  'Real Estate Tips',
  'Home Improvement',
  'Rental Advice',
  'Investment',
  'Other'
]

const formData = ref<BlogFormData>({
  title: props.initialData?.title || '',
  category: props.initialData?.category || '',
  content: props.initialData?.content || '',
  featuredImage: props.initialData?.featuredImage || ''
})

const imagePreview = ref<string | null>(props.initialData?.featuredImage || null)

function handleSubmit() {
  emit('submit', {
    ...formData.value,
    featuredImage: imagePreview.value || undefined
  })
  emit('close')
}

function handleImageUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

function removeImage() {
  imagePreview.value = null
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <Card class="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <CardHeader class="flex flex-row items-center justify-between">
        <CardTitle>{{ isEdit ? 'Edit Blog Post' : 'Add New Blog Post' }}</CardTitle>
        <Button variant="ghost" size="sm" @click="emit('close')">
          <X class="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-2">
            <Label for="title">Blog Title</Label>
            <Input
              id="title"
              v-model="formData.title"
              placeholder="Enter blog title"
              required
            />
          </div>

          <div class="space-y-2">
            <Label for="category">Category</Label>
            <Select v-model="formData.category" required>
              <SelectTrigger placeholder="Select a category">
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="category in categories"
                  :key="category"
                  :value="category"
                >
                  {{ category }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <Label for="image">Featured Image (Optional)</Label>
            <div class="flex items-center space-x-4">
              <Input
                id="image"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleImageUpload"
              />
              <Button
                type="button"
                variant="outline"
                @click="document.getElementById('image')?.click()"
              >
                <Upload class="w-4 h-4 mr-2" />
                Upload Image
              </Button>
              <Button
                v-if="imagePreview"
                type="button"
                variant="outline"
                @click="removeImage"
              >
                <X class="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
            <div v-if="imagePreview" class="mt-4">
              <img
                :src="imagePreview"
                alt="Preview"
                class="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>

          <div class="space-y-2">
            <Label for="content">Content</Label>
            <Textarea
              id="content"
              v-model="formData.content"
              placeholder="Write your blog content here... (In a real app, this would be a rich text editor)"
              class="min-h-48"
              required
            />
            <p class="text-sm text-muted-foreground">
              Note: In the full application, this would be a rich text editor with formatting options.
            </p>
          </div>

          <div class="flex space-x-4">
            <Button type="submit" class="flex-1">
              {{ isEdit ? 'Update Post' : 'Submit for Review' }}
            </Button>
            <Button type="button" variant="outline" @click="emit('close')">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>