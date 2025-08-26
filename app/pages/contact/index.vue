
<script setup>
import { ref, computed,inject } from 'vue'

import { Plus, BookOpen, MessageCircle } from 'lucide-vue-next'
import { mockBlogs, mockUsers } from '@/lib/mockData'

const POSTS_PER_PAGE = 6

// Auth state
// Blog state
const currentUser=inject("currentUser")
const blogs = ref([...mockBlogs])
const currentPage = ref(1)
const selectedBlog = ref(null)
const isReaderOpen = ref(false)
const isBlogFormOpen = ref(false)
const editingBlog = ref(null)

// Approved blogs
const approvedBlogs = computed(() =>
  blogs.value.filter(blog => blog.status === 'approved')
)

const totalPages = computed(() =>
  Math.ceil(approvedBlogs.value.length / POSTS_PER_PAGE)
)

const currentBlogs = computed(() => {
  const startIndex = (currentPage.value - 1) * POSTS_PER_PAGE
  return approvedBlogs.value.slice(startIndex, startIndex + POSTS_PER_PAGE)
})

// Blog handlers
function handleReadMore(blog) {
  selectedBlog.value = blog
  isReaderOpen.value = true
}

function handleAddBlog() {
  if (!isSignedIn.value) {
    alert('Please sign in to post a blog.')
    return
  }
  editingBlog.value = null
  isBlogFormOpen.value = true
}

function handleEditBlog(blog) {
  editingBlog.value = blog
  isBlogFormOpen.value = true
}

function handleDeleteBlog(blogId) {
  if (confirm('Are you sure you want to delete this blog post?')) {
    blogs.value = blogs.value.filter(blog => blog.id !== blogId)
  }
}

function handleBlogSubmit(formData) {
  if (editingBlog.value) {
    blogs.value = blogs.value.map(blog =>
      blog.id === editingBlog.value.id
        ? {
            ...blog,
            ...formData,
            excerpt: formData.content.substring(0, 200) + '...'
          }
        : blog
    )
  } else {
    const newBlog = {
      id: Date.now().toString(),
      title: formData.title,
      excerpt: formData.content.substring(0, 200) + '...',
      content: formData.content,
      category: formData.category,
      featuredImage: formData.featuredImage,
      authorName: currentUser.value?.name || 'Anonymous',
      authorId: currentUser.value?.id || '1',
      publishDate: new Date().toISOString(),
      status: 'pending'
    }
    blogs.value = [newBlog, ...blogs.value]
  }
  isBlogFormOpen.value = false
}
</script>
<template>
  <div>
    <section class="bg-addis-warm py-12">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
            <div>
              <div class="flex items-center space-x-2 mb-3">
                <BookOpen class="w-6 h-6 text-addis-accent" />
                <h2 class="text-3xl text-addis-primary">Real Estate Blog</h2>
              </div>
              <p class="text-muted-foreground max-w-2xl">
                Insights, tips, and experiences from the Ethiopian real estate community.
                Share your knowledge and learn from industry experts.
              </p>
            </div>
            <Button
              @click="handleAddBlog"
              class="bg-addis-accent hover:bg-addis-hover text-white border-0 flex items-center space-x-2 shrink-0"
            >
              <Plus class="w-4 h-4" />
              <span>Add Blog</span>
            </Button>
          </div>

          <!-- Blog Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <BlogCard
              v-for="blog in currentBlogs"
              :key="blog.id"
              :post="blog"
              :currentUserId="currentUser?.id"
              @readMore="handleReadMore"
              @edit="handleEditBlog"
              @delete="handleDeleteBlog"
            />
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center">
            <Pagination
              :currentPage="currentPage"
              :totalPages="totalPages"
              @pageChange="page => currentPage = page"
            />
          </div>

          <!-- Empty State -->
          <div v-if="approvedBlogs.length === 0" class="text-center py-16">
            <BookOpen class="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 class="text-xl text-addis-primary mb-2">No blog posts yet</h3>
            <p class="text-muted-foreground text-lg">
              Be the first to share your insights with the AddisRent community!
            </p>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="bg-white py-12">
        <div class="container mx-auto px-4">
          <div class="mb-8">
            <div class="flex items-center space-x-2 mb-3">
              <MessageCircle class="w-6 h-6 text-addis-accent" />
              <h2 class="text-3xl text-addis-primary">Contact Us</h2>
            </div>
            <p class="text-muted-foreground max-w-2xl">
              Have questions or need assistance? We're here to help you with all your real estate needs in Ethiopia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <UiContactForm />
            <UiContactInfo />
          </div>
        </div>
      </section>
     <UiBlogForm
      :isOpen="isBlogFormOpen"
      :initialData="editingBlog || undefined"
      :isEdit="!!editingBlog"
      @close="isBlogFormOpen = false"
      @submit="handleBlogSubmit"
    />

    <UiBlogReader
      :post="selectedBlog"
      :isOpen="isReaderOpen"
      @close="isReaderOpen = false"
    />
  </div>
  
</template>


<style scoped>
/* Optional: Add subtle animations or custom fonts */
</style>