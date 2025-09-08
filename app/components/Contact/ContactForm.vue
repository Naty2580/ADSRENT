<script setup lang="ts">
import { ref } from 'vue'
import  Card  from '@/components/ui/card/Card.vue'
import CardContent  from '@/components/ui/card/CardContent.vue'
import  CardHeader  from '@/components/ui/card/CardHeader.vue'
import  CardTitle  from '@/components/ui/card/CardTitle.vue'
import Button  from '@/components/ui/Button.vue'
import  Input  from '@/components/ui/Input.vue'
import  Label  from '@/components/ui/Label.vue'
import  Textarea  from '@/components/ui/Textarea.vue'
import { CheckCircle, Send } from 'lucide-vue-next'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

const formData = ref<ContactFormData>({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitted = ref(false)
const isSubmitting = ref(false)

async function handleSubmit() {
  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  isSubmitted.value = true
  isSubmitting.value = false
  formData.value = { name: '', email: '', subject: '', message: '' }

  // Reset success message after 3 seconds
  setTimeout(() => {
    isSubmitted.value = false
  }, 3000)
}
</script>

<template>
  <Card v-if="isSubmitted" class="border-addis-light">
    <CardContent class="p-8">
      <div class="text-center">
        <div class="w-16 h-16 bg-addis-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle class="w-8 h-8 text-addis-accent" />
        </div>
        <h3 class="text-xl text-addis-primary mb-2">Thank you!</h3>
        <p class="text-muted-foreground">
          We've received your message and will get back to you shortly.
        </p>
      </div>
    </CardContent>
  </Card>

  <Card v-else class="border-addis-light shadow-sm">
    <CardHeader class="bg-addis-warm/50">
      <CardTitle class="text-addis-primary flex items-center space-x-2">
        <Send class="w-5 h-5 text-addis-accent" />
        <span>Send us a Message</span>
      </CardTitle>
    </CardHeader>

    <CardContent class="p-6">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="name" class="text-addis-primary">Name *</Label>
            <Input
              id="name"
              v-model="formData.name"
              placeholder="Your full name"
              class="border-addis-light focus:ring-addis-accent focus:border-addis-accent"
              required
            />
          </div>
          <div class="space-y-2">
            <Label for="email" class="text-addis-primary">Email *</Label>
            <Input
              id="email"
              type="email"
              v-model="formData.email"
              placeholder="your.email@example.com"
              class="border-addis-light focus:ring-addis-accent focus:border-addis-accent"
              required
            />
          </div>
        </div>

        <div class="space-y-2">
          <Label for="subject" class="text-addis-primary">Subject *</Label>
          <Input
            id="subject"
            v-model="formData.subject"
            placeholder="What's this about?"
            class="border-addis-light focus:ring-addis-accent focus:border-addis-accent"
            required
          />
        </div>

        <div class="space-y-2">
          <Label for="message" class="text-addis-primary">Message *</Label>
          <Textarea
            id="message"
            v-model="formData.message"
            placeholder="Tell us more about your inquiry..."
            class="min-h-32 border-addis-light focus:ring-addis-accent focus:border-addis-accent resize-none"
            required
          />
        </div>

        <Button
          type="submit"
          class="w-full bg-addis-accent hover:bg-addis-hover text-white border-0"
          :disabled="isSubmitting"
        >
          <Send class="w-4 h-4 mr-2" />
          {{ isSubmitting ? 'Sending...' : 'Send Message' }}
        </Button>
      </form>
    </CardContent>
  </Card>
</template>