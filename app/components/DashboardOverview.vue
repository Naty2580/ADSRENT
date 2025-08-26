<template>
  <div class="space-y-8">
    <!-- Welcome Header -->
    <div class="bg-gradient-to-r from-primary via-secondary to-accent p-8 rounded-xl text-white shadow-lg">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold mb-2">Welcome back, {{ user.name }}! 🏢</h1>
          <p class="text-white/90 text-lg mb-4">Here's your {{ user.role === 'lessor' ? 'property management' : 'property sales' }} overview for today.</p>
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
              <div class="text-2xl font-bold">{{ stats.totalProperties }}</div>
              <div class="text-sm text-white/80">Active Properties</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Key Metrics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card class="hover:shadow-lg transition-all duration-300 hover:scale-105 transform border-l-4 border-l-primary">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-muted-foreground text-sm font-medium mb-1">Total Properties</p>
              <p class="text-3xl font-bold text-primary">{{ stats.totalProperties }}</p>
              <p class="text-xs text-green-600 mt-1">+2 this month</p>
            </div>
            <div class="bg-primary/10 p-3 rounded-full">
              <Home class="h-8 w-8 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="hover:shadow-lg transition-all duration-300 hover:scale-105 transform border-l-4 border-l-secondary">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-muted-foreground text-sm font-medium mb-1">Booking Requests</p>
              <p class="text-3xl font-bold text-secondary">{{ stats.totalBookings }}</p>
              <p class="text-xs text-green-600 mt-1">+5 this week</p>
            </div>
            <div class="bg-secondary/10 p-3 rounded-full">
              <Calendar class="h-8 w-8 text-secondary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="hover:shadow-lg transition-all duration-300 hover:scale-105 transform border-l-4 border-l-accent">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-muted-foreground text-sm font-medium mb-1">Total Earnings</p>
              <p class="text-3xl font-bold text-accent">${{ stats.totalEarnings.toLocaleString() }}</p>
              <p class="text-xs text-green-600 mt-1">+12% vs last month</p>
            </div>
            <div class="bg-accent/10 p-3 rounded-full">
              <DollarSign class="h-8 w-8 text-accent" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="hover:shadow-lg transition-all duration-300 hover:scale-105 transform border-l-4 border-l-green-500">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-muted-foreground text-sm font-medium mb-1">Rented Properties</p>
              <p class="text-3xl font-bold text-green-600">{{ stats.rentedProperties }}</p>
              <p class="text-xs text-green-600 mt-1">85% occupancy</p>
            </div>
            <div class="bg-green-500/10 p-3 rounded-full">
              <CheckCircle class="h-8 w-8 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Charts and Analytics -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Activity -->
      <Card>
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

      <!-- Quick Stats -->
      <Card>
        <CardContent class="p-6">
          <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 class="h-5 w-5 text-primary" />
            Property Status
          </h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <span class="font-medium">Available</span>
              </div>
              <span class="text-lg font-bold text-green-600">5</span>
            </div>
            <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span class="font-medium">Occupied</span>
              </div>
              <span class="text-lg font-bold text-blue-600">3</span>
            </div>
            <div class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span class="font-medium">Under Maintenance</span>
              </div>
              <span class="text-lg font-bold text-yellow-600">1</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Quick Actions -->
    <Card>
      <CardContent class="p-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap class="h-5 w-5 text-primary" />
          Quick Actions
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button class="w-full justify-start h-12" variant="outline" @click="$emit('navigate', 'add-property')">
            <Plus class="h-4 w-4 mr-2" />
            Add New Property
          </Button>
          <Button class="w-full justify-start h-12" variant="outline" @click="$emit('navigate', 'bookings')">
            <Calendar class="h-4 w-4 mr-2" />
            View Bookings
          </Button>
          <Button class="w-full justify-start h-12" variant="outline" @click="$emit('navigate', 'my-listings')">
            <BarChart3 class="h-4 w-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import Card from '@/components/ui/card.vue'
import CardContent from '@/components/ui/card-content.vue'
import Button from '@/components/ui/button.vue'
import { 
  Home, 
  Calendar, 
  DollarSign, 
  Activity,
  BarChart3,
  Zap,
  Plus,
  CheckCircle
} from 'lucide-vue-next'

const props = defineProps({
  stats: {
    type: Object,
    required: true,
    validator(value) {
      return (
        typeof value.totalProperties === 'number' &&
        typeof value.totalBookings === 'number' &&
        typeof value.totalEarnings === 'number' &&
        typeof value.rentedProperties === 'number'
      )
    },
  },
  user: {
    type: Object,
    required: true,
    default: () => ({
      name: 'Tadesse',
      role: 'lessor'
    })
  }
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