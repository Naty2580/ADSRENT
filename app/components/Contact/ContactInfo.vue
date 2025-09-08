<script setup lang="ts">
import Card  from '@/components/ui/card/Card.vue'
import  CardContent  from '@/components/ui/card/CardContent.vue'
import  CardHeader  from '@/components/ui/card/CardHeader.vue'
import  CardTitle  from '@/components/ui/card/CardTitle.vue'
import { MapPin, Phone, Mail, Clock, Building } from 'lucide-vue-next'
</script>

<template>
  <div class="space-y-6">
    <!-- Contact Details Card -->
    <Card class="border-addis-light shadow-sm">
      <CardHeader class="bg-addis-warm/50">
        <CardTitle class="text-addis-primary flex items-center space-x-2">
          <Building class="w-5 h-5 text-addis-accent" />
          <span>Get in Touch</span>
        </CardTitle>
      </CardHeader>

      <CardContent class="p-6 space-y-6">
        <!-- Address -->
        <div class="flex items-start space-x-4">
          <div class="w-10 h-10 bg-addis-accent/10 rounded-lg flex items-center justify-center shrink-0 mt-1">
            <MapPin class="w-5 h-5 text-addis-accent" />
          </div>
          <div>
            <h4 class="text-addis-primary mb-1">Address</h4>
            <p class="text-muted-foreground">
              Bole Atlas, 4th Floor<br />
              Addis Ababa, Ethiopia
            </p>
          </div>
        </div>

        <!-- Phone -->
        <div class="flex items-start space-x-4">
          <div class="w-10 h-10 bg-addis-accent/10 rounded-lg flex items-center justify-center shrink-0 mt-1">
            <Phone class="w-5 h-5 text-addis-accent" />
          </div>
          <div>
            <h4 class="text-addis-primary mb-1">Phone</h4>
            <p class="text-muted-foreground">+251 11 123 4567</p>
          </div>
        </div>

        <!-- Email -->
        <div class="flex items-start space-x-4">
          <div class="w-10 h-10 bg-addis-accent/10 rounded-lg flex items-center justify-center shrink-0 mt-1">
            <Mail class="w-5 h-5 text-addis-accent" />
          </div>
          <div>
            <h4 class="text-addis-primary mb-1">Email</h4>
            <p class="text-muted-foreground">contact@addisrent.com</p>
          </div>
        </div>

        <!-- Business Hours -->
        <div class="flex items-start space-x-4">
          <div class="w-10 h-10 bg-addis-accent/10 rounded-lg flex items-center justify-center shrink-0 mt-1">
            <Clock class="w-5 h-5 text-addis-accent" />
          </div>
          <div>
            <h4 class="text-addis-primary mb-1">Business Hours</h4>
            <div class="text-muted-foreground space-y-1">
              <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Map Placeholder Card -->
    <Card class="border-addis-light shadow-sm">
      <CardHeader class="bg-addis-warm/50">
        <CardTitle class="text-addis-primary flex items-center space-x-2">
          <MapPin class="w-5 h-5 text-addis-accent" />
          <span>Find Us</span>
        </CardTitle>
      </CardHeader>

      <CardContent class="p-6">
        <div class="aspect-video bg-addis-warm border border-addis-light rounded-lg flex items-center justify-center">
          <div class="text-center">
            <div class="w-16 h-16 bg-addis-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin class="w-8 h-8 text-addis-accent" />
            </div>
            <h4 class="text-addis-primary mb-2">Interactive Map</h4>
            <p class="text-muted-foreground text-sm">
              Google Maps integration would be<br />
              embedded here in production
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>