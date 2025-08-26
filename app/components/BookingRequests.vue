<script setup lang="ts">
import { ref, computed } from 'vue'

import {
  MessageSquare,
  Search,
  Filter,
  Download,
  Check,
  X,
  User,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  Eye
} from 'lucide-vue-next'

interface BookingRequest {
  id: string
  tenantName: string
  tenantAvatar: string
  tenantPhone?: string
  tenantEmail?: string
  propertyTitle: string
  message: string
  requestDate: string
  moveInDate?: string
  status: 'Pending' | 'Accepted' | 'Declined'
}

const searchQuery = ref('')
const statusFilter = ref('')
const propertyFilter = ref('')
const processingRequests = ref<Set<string>>(new Set())

const requests = ref<BookingRequest[]>([
  {
    id: '1',
    tenantName: 'Ahmed Hassan',
    tenantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    tenantPhone: '+251 911 123 456',
    tenantEmail: 'ahmed.hassan@email.com',
    propertyTitle: 'Modern 2BR Apartment in Bole',
    message: "Hi, I'm very interested in this property. I work at a tech company and can provide references. When can we schedule a viewing? I'm looking to move in by next month.",
    requestDate: '2025-01-25T10:30:00',
    moveInDate: '2025-02-15',
    status: 'Pending'
  },
  {
    id: '2',
    tenantName: 'Sara Bekele',
    tenantAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    tenantPhone: '+251 922 234 567',
    tenantEmail: 'sara.bekele@email.com',
    propertyTitle: 'Luxury Villa with Garden',
    message: 'This villa looks perfect for my family. We have two children and are looking for a long-term rental. The garden space is exactly what we need.',
    requestDate: '2025-01-24T14:15:00',
    moveInDate: '2025-03-01',
    status: 'Pending'
  },
  {
    id: '3',
    tenantName: 'Michael Tesfaye',
    tenantAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    tenantPhone: '+251 933 345 678',
    tenantEmail: 'michael.tesfaye@email.com',
    propertyTitle: 'Office Space in Commercial District',
    message: 'I need this office space for my consulting business. Ready to sign lease immediately. Can we discuss the terms?',
    requestDate: '2025-01-23T09:45:00',
    moveInDate: '2025-02-01',
    status: 'Accepted'
  },
  {
    id: '4',
    tenantName: 'Fatima Ali',
    tenantAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    tenantPhone: '+251 944 456 789',
    tenantEmail: 'fatima.ali@email.com',
    propertyTitle: 'Modern 2BR Apartment in Bole',
    message: 'Interested in viewing this apartment. Is it still available?',
    requestDate: '2025-01-22T16:20:00',
    status: 'Declined'
  }
])

const filteredRequests = computed(() => {
  return requests.value.filter(request => {
    const matchesSearch = request.tenantName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         request.propertyTitle.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !statusFilter.value || request.status === statusFilter.value
    const matchesProperty = !propertyFilter.value || request.propertyTitle === propertyFilter.value
    
    return matchesSearch && matchesStatus && matchesProperty
  })
})

const totalRequests = computed(() => requests.value.length)
const pendingCount = computed(() => requests.value.filter(r => r.status === 'Pending').length)
const acceptedCount = computed(() => requests.value.filter(r => r.status === 'Accepted').length)
const declinedCount = computed(() => requests.value.filter(r => r.status === 'Declined').length)

const uniqueProperties = computed(() => {
  const properties = requests.value.map(r => r.propertyTitle)
  return Array.from(new Set(properties))
})

function getStatusVariant(status: BookingRequest['status']) {
  switch (status) {
    case 'Pending': return 'secondary'
    case 'Accepted': return 'default'
    case 'Declined': return 'destructive'
    default: return 'outline'
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

function isProcessing(requestId: string) {
  return processingRequests.value.has(requestId)
}

async function handleAccept(requestId: string) {
  processingRequests.value.add(requestId)
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    requests.value = requests.value.map(req =>
      req.id === requestId ? { ...req, status: 'Accepted' } : req
    )
    showToast('Booking request accepted! 🎉', 'success')
  } finally {
    processingRequests.value.delete(requestId)
  }
}

async function handleDecline(requestId: string) {
  processingRequests.value.add(requestId)
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    requests.value = requests.value.map(req =>
      req.id === requestId ? { ...req, status: 'Declined' } : req
    )
    showToast('Booking request declined', 'info')
  } finally {
    processingRequests.value.delete(requestId)
  }
}

function viewDetails(requestId: string) {
  console.log('View details for request:', requestId)
  // Add logic for viewing detailed booking information
}

function scheduleViewing(requestId: string) {
  console.log('Schedule viewing for request:', requestId)
  // Add logic for scheduling property viewing
}

function showToast(message: string, type: 'success' | 'info' = 'info') {
  const toast = document.createElement('div')
  toast.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
    type === 'success' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
  }`
  toast.textContent = message
  document.body.appendChild(toast)
  
  setTimeout(() => {
    document.body.removeChild(toast)
  }, 3000)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Booking Management</h2>
        <p class="text-gray-600">Manage tenant booking requests and view rental history</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline">
          <Download class="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button>
          <Filter class="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
    </div>

    <!-- Stats Summary -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Total Requests</p>
              <p class="text-2xl font-bold">{{ totalRequests }}</p>
            </div>
            <MessageSquare class="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Pending</p>
              <p class="text-2xl font-bold text-yellow-600">{{ pendingCount }}</p>
            </div>
            <Clock class="h-8 w-8 text-yellow-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Accepted</p>
              <p class="text-2xl font-bold text-green-600">{{ acceptedCount }}</p>
            </div>
            <CheckCircle class="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Declined</p>
              <p class="text-2xl font-bold text-red-600">{{ declinedCount }}</p>
            </div>
            <XCircle class="h-8 w-8 text-red-500" />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Search and Filters -->
    <Card>
      <CardContent class="p-4">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <Input
              v-model="searchQuery"
              placeholder="Search by tenant name or property..."
              class="w-full"
            >
              <template #prefix>
                <Search class="h-4 w-4 text-gray-400" />
              </template>
            </Input>
          </div>
          <Select v-model="statusFilter" class="w-full md:w-48">
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Declined">Declined</option>
          </Select>
          <Select v-model="propertyFilter" class="w-full md:w-48">
            <option value="">All Properties</option>
            <option v-for="property in uniqueProperties" :key="property" :value="property">
              {{ property }}
            </option>
          </Select>
        </div>
      </CardContent>
    </Card>

    <!-- Booking Requests -->
    <div class="space-y-4">
      <div
        v-for="(request, index) in filteredRequests"
        :key="request.id"
        class="Card hover:shadow-lg transition-all duration-300 animate-slide-in"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <CardContent class="p-6">
          <div class="flex flex-col lg:flex-row gap-6">
            <!-- Tenant Info -->
            <div class="flex items-start gap-4 flex-1">
              <Avatar class="h-16 w-16">
                <img 
                  :src="request.tenantAvatar" 
                  :alt="request.tenantName" 
                  class="h-full w-full rounded-full object-cover" 
                />
                <div class="h-full w-full rounded-full bg-gray-200 flex items-center justify-center">
                  <User class="h-8 w-8 text-gray-500" />
                </div>
              </Avatar>

              <div class="flex-1 space-y-3">
                <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">{{ request.tenantName }}</h3>
                    <p class="text-sm text-gray-600">{{ request.propertyTitle }}</p>
                    <div class="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span class="flex items-center gap-1">
                        <Calendar class="h-3 w-3" />
                        {{ formatDate(request.requestDate) }}
                      </span>
                      <span class="flex items-center gap-1">
                        <Clock class="h-3 w-3" />
                        {{ formatTime(request.requestDate) }}
                      </span>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-2">
                    <Badge :variant="getStatusVariant(request.status)">
                      {{ request.status }}
                    </Badge>
                    <Button variant="outline" size="sm" @click="viewDetails(request.id)">
                      <Eye class="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <!-- Message -->
                <div class="bg-gray-50 p-4 rounded-lg">
                  <p class="text-gray-700">{{ request.message }}</p>
                </div>

                <!-- Additional Info -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div class="flex items-center gap-2">
                    <Phone class="h-4 w-4 text-gray-400" />
                    <span>{{ request.tenantPhone || 'Phone not provided' }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Mail class="h-4 w-4 text-gray-400" />
                    <span>{{ request.tenantEmail || 'Email not provided' }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Calendar class="h-4 w-4 text-gray-400" />
                    <span>Move-in: {{ request.moveInDate || 'Not specified' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div v-if="request.status === 'Pending'" class="flex flex-col gap-2 lg:w-48">
              <Button 
                class="w-full bg-green-500 hover:bg-green-600 text-white" 
                @click="handleAccept(request.id)"
                :disabled="isProcessing(request.id)"
              >
                <Check class="h-4 w-4 mr-2" />
                Accept Request
              </Button>
              <Button 
                class="w-full bg-red-500 hover:bg-red-600 text-white" 
                @click="handleDecline(request.id)"
                :disabled="isProcessing(request.id)"
              >
                <X class="h-4 w-4 mr-2" />
                Decline Request
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                class="w-full"
                @click="scheduleViewing(request.id)"
              >
                <Calendar class="h-4 w-4 mr-2" />
                Schedule Viewing
              </Button>
            </div>

            <div v-else class="flex flex-col gap-2 lg:w-48">
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <p class="text-sm text-gray-600">Status: {{ request.status }}</p>
                <p class="text-xs text-gray-500 mt-1">
                  {{ request.status === 'Accepted' ? 'Tenant notified' : 'Request closed' }}
                </p>
              </div>
              <Button variant="outline" size="sm" class="w-full" @click="viewDetails(request.id)">
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredRequests.length === 0" class="text-center py-12">
      <MessageSquare class="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No booking requests found</h3>
      <p class="text-gray-600 mb-4">Try adjusting your search or filters</p>
    </div>
  </div>
</template>

<style scoped>
.animate-slide-in {
  animation: slide-in 0.3s ease-in-out both;
}

@keyframes slide-in {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>