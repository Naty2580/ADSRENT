<template>
  <div class="space-y-8 animate-slide-in">
    <!-- Welcome Header -->
    <div class="bg-gradient-to-r from-primary via-secondary to-accent p-8 rounded-xl text-white shadow-lg">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold mb-2">Welcome back, {{ userName }}! 🏢</h1>
          <p class="text-white/90 text-lg mb-4">Here's what's happening with your properties today.</p>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span class="text-sm">All systems operational</span>
            </div>
            <span class="text-white/70">•</span>
            <span class="text-sm">{{ new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
          </div>
        </div>
        <div class="hidden lg:block">
          <div class="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <div class="text-center">
              <div class="text-2xl font-bold">{{ stats.listedProperties }}</div>
              <div class="text-sm text-white/80">Active Listings</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card class="hover:shadow-lg transition-all duration-300 hover:scale-105 transform border-l-4 border-l-primary">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-muted-foreground text-sm font-medium mb-1">Listed Properties</p>
              <p class="text-2xl font-bold text-primary">{{ stats.listedProperties }}</p>
              <p class="text-xs text-green-600 mt-1">+2 this month</p>
            </div>
            <div class="bg-primary/10 p-3 rounded-full">
              <Home class="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="hover:shadow-lg transition-all duration-300 hover:scale-105 transform border-l-4 border-l-secondary">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-muted-foreground text-sm font-medium mb-1">Bookings Received</p>
              <p class="text-2xl font-bold text-secondary">{{ stats.bookingsReceived }}</p>
              <p class="text-xs text-green-600 mt-1">+5 this week</p>
            </div>
            <div class="bg-secondary/10 p-3 rounded-full">
              <Calendar class="h-6 w-6 text-secondary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="hover:shadow-lg transition-all duration-300 hover:scale-105 transform border-l-4 border-l-accent">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-muted-foreground text-sm font-medium mb-1">Currently Rented</p>
              <p class="text-2xl font-bold text-accent">{{ stats.currentlyRented }}</p>
              <p class="text-xs text-green-600 mt-1">85% occupancy</p>
            </div>
            <div class="bg-accent/10 p-3 rounded-full">
              <Building2 class="h-6 w-6 text-accent" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="hover:shadow-lg transition-all duration-300 hover:scale-105 transform border-l-4 border-l-orange-500">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-muted-foreground text-sm font-medium mb-1">Monthly Revenue</p>
              <p class="text-2xl font-bold text-orange-600">${{ (stats.currentlyRented * 2500).toLocaleString() }}</p>
              <p class="text-xs text-green-600 mt-1">+12% vs last month</p>
            </div>
            <div class="bg-orange-500/10 p-3 rounded-full">
              <DollarSign class="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Quick Actions & Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Quick Actions -->
      <Card class="lg:col-span-1">
        <CardContent class="p-6">
          <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap class="h-5 w-5 text-primary" />
            Quick Actions
          </h3>
          <div class="space-y-3">
            <Button 
              class="w-full justify-start" 
              variant="outline"
              @click="$emit('navigate', 'add-property')"
            >
              <Plus class="h-4 w-4 mr-2" />
              Add New Property
            </Button>
            <Button 
              class="w-full justify-start" 
              variant="outline"
              @click="$emit('navigate', 'bookings')"
            >
              <Calendar class="h-4 w-4 mr-2" />
              View Bookings
            </Button>
            <Button 
              class="w-full justify-start" 
              variant="outline"
              @click="$emit('navigate', 'my-listings')"
            >
              <BarChart3 class="h-4 w-4 mr-2" />
              View Analytics
            </Button>
            <Button 
              class="w-full justify-start" 
              variant="outline"
              @click="$emit('navigate', 'settings')"
            >
              <Settings class="h-4 w-4 mr-2" />
              Account Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- Recent Activity -->
      <Card class="lg:col-span-2">
        <CardContent class="p-6">
          <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity class="h-5 w-5 text-primary" />
            Recent Activity
          </h3>
          <div class="space-y-4">
            <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div class="w-2 h-2 rounded-full" :class="activity.color"></div>
              <div class="flex-1">
                <p class="text-sm font-medium">{{ activity.title }}</p>
                <p class="text-xs text-muted-foreground">{{ activity.description }}</p>
              </div>
              <span class="text-xs text-muted-foreground">{{ activity.time }}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup>
import Card from '@/components/ui/card.vue'
import CardContent from '@/components/ui/card-content.vue'
import Button from '@/components/ui/button.vue'
import { 
  Home, 
  Calendar, 
  Building2, 
  DollarSign, 
  Zap, 
  Plus, 
  BarChart3, 
  Settings, 
  Activity 
} from 'lucide-vue-next'

const props = defineProps({
  userName: {
    type: String,
    required: true,
  },
  stats: {
    type: Object,
    required: true,
    validator(value) {
      return (
        typeof value.listedProperties === 'number' &&
        typeof value.bookingsReceived === 'number' &&
        typeof value.currentlyRented === 'number'
      )
    },
  },
})

defineEmits(['navigate'])

const recentActivities = [
  {
    id: 1,
    title: 'New booking request',
    description: 'Ahmed Hassan requested to view Modern 2BR Apartment',
    time: '2 hours ago',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'Property listed',
    description: 'Luxury Villa with Garden is now live',
    time: '1 day ago',
    color: 'bg-green-500'
  },
  {
    id: 3,
    title: 'Payment received',
    description: 'Monthly rent payment from Sara Bekele',
    time: '2 days ago',
    color: 'bg-purple-500'
  },
  {
    id: 4,
    title: 'Maintenance request',
    description: 'AC repair needed at Office Space property',
    time: '3 days ago',
    color: 'bg-orange-500'
  }
]
</script>
