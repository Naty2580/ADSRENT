<script >
import { ref, computed } from 'vue'

import {
  User,
  MapPin,
  Bell,
  Lock,
  Upload,
  Loader2,
  AlertTriangle,
  Trash2,
  Settings
} from 'lucide-vue-next'

const isSaving = ref(false)
const isChangingPassword = ref(false)

const accountData = ref({
  profileImage: '',
  name: 'Tadesse Girma',
  email: 'tadesse@example.com',
  phone: '+251-911-123456',
  isOrganization: true,
  organizationName: 'Girma Real Estate',
  officeLocation: 'Bole District, Near Edna Mall',
  mapLink: 'https://maps.google.com/example',
  emailNotifications: true,
  smsNotifications: false
})

const passwords = ref({
  current: '',
  new: '',
  confirm: ''
})

const errors = ref({
  name: '',
  email: ''
})

const canChangePassword = computed(() => {
  return passwords.value.current && 
         passwords.value.new && 
         passwords.value.confirm && 
         passwords.value.new === passwords.value.confirm
})

async function saveProfile() {
  isSaving.value = true
  try {
    // Validate form
    errors.value = { name: '', email: '' }
    if (!accountData.value.name.trim()) {
      errors.value.name = 'Name is required'
    }
    if (!accountData.value.email.trim()) {
      errors.value.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accountData.value.email)) {
      errors.value.email = 'Please enter a valid email address'
    }

    if (Object.keys(errors.value).length > 0) {
      return
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    showToast('Profile updated successfully!', 'success')
  } catch (error) {
    showToast('Failed to update profile', 'error')
  } finally {
    isSaving.value = false
  }
}

async function changePassword() {
  if (!canChangePassword.value) return

  isChangingPassword.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    passwords.value = { current: '', new: '', confirm: '' }
    showToast('Password changed successfully!', 'success')
  } catch (error) {
    showToast('Failed to change password', 'error')
  } finally {
    isChangingPassword.value = false
  }
}

function resetForm() {
  accountData.value = {
    profileImage: '',
    name: 'Tadesse Girma',
    email: 'tadesse@example.com',
    phone: '+251-911-123456',
    isOrganization: true,
    organizationName: 'Girma Real Estate',
    officeLocation: 'Bole District, Near Edna Mall',
    mapLink: 'https://maps.google.com/example',
    emailNotifications: true,
    smsNotifications: false
  }
  errors.value = { name: '', email: '' }
}

function uploadImage() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = (e) => {
    const file = (e.target).files?.[0]
    if (file) {
      // Handle file upload
      const reader = new FileReader()
      reader.onload = (e) => {
        accountData.value.profileImage = e.target?.result 
      }
      reader.readAsDataURL(file)
    }
  }
  input.click()
}

function deleteAccount() {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    showToast('Account deletion initiated', 'info')
  }
}

function showToast(message) {
  const toast = document.createElement('div')
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
  toast.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 text-white ${bgColor}`
  toast.textContent = message
  document.body.appendChild(toast)
  
  setTimeout(() => {
    document.body.removeChild(toast)
  }, 3000)
}
</script>


<template>
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <Settings class="h-6 w-6 text-primary" />
        Account Settings
      </h2>
      <p class="text-gray-600">Manage your profile, security, and preferences</p>
    </div>

    <!-- Profile Information -->
    <Card>
      <CardContent class="p-6">
        <div class="flex items-center gap-3 mb-6">
          <User class="h-5 w-5 text-primary" />
          <h3 class="text-lg font-semibold">Profile Information</h3>
        </div>

        <div class="space-y-6">
          <!-- Profile Image -->
          <div class="flex items-center gap-6">
            <Avatar class="h-24 w-24">
              <img 
                :src="accountData.profileImage || '/default-avatar.png'" 
                :alt="accountData.name" 
                class="h-full w-full rounded-full object-cover"
              />
              <div class="h-full w-full rounded-full bg-gray-200 flex items-center justify-center">
                <User class="h-10 w-10 text-gray-500" />
              </div>
            </Avatar>
            <div class="space-y-2">
              <Button variant="outline" size="sm" @click="uploadImage">
                <Upload class="h-4 w-4 mr-2" />
                Change Photo
              </Button>
              <p class="text-sm text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
            </div>
          </div>

          <!-- Profile Form -->
          <form @submit.prevent="saveProfile" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="name">Full Name *</Label>
                <Input 
                  id="name" 
                  v-model="accountData.name" 
                  placeholder="Enter your full name"
                  :class="{ 'border-red-500': errors.name }"
                />
                <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
              </div>

              <div class="space-y-2">
                <Label for="email">Email Address *</Label>
                <Input 
                  id="email" 
                  type="email" 
                  v-model="accountData.email" 
                  placeholder="your.email@example.com"
                  :class="{ 'border-red-500': errors.email }"
                />
                <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
              </div>

              <div class="space-y-2">
                <Label for="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  v-model="accountData.phone" 
                  placeholder="+251-911-123456"
                />
              </div>

              <div class="space-y-2">
                <Label for="organization">Organization Name</Label>
                <Input 
                  id="organization" 
                  v-model="accountData.organizationName" 
                  placeholder="Your company name"
                  :disabled="!accountData.isOrganization"
                />
              </div>
            </div>

            <!-- Organization Toggle -->
            <div class="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
              <div>
                <h4 class="font-medium">Organization Account</h4>
                <p class="text-sm text-gray-600">Enable if you're representing a company</p>
              </div>
              <Switch v-model="accountData.isOrganization" />
            </div>

            <div class="flex justify-end gap-4">
              <Button variant="outline" @click="resetForm">
                Cancel
              </Button>
              <Button type="submit" :disabled="isSaving" class="bg-primary hover:bg-primary/90 text-white">
                <Loader2 v-if="isSaving" class="h-4 w-4 mr-2 animate-spin" />
                {{ isSaving ? 'Saving...' : 'Save Profile Changes' }}
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>

    <!-- Office Location -->
    <Card>
      <CardContent class="p-6">
        <div class="flex items-center gap-3 mb-6">
          <MapPin class="h-5 w-5 text-primary" />
          <h3 class="text-lg font-semibold">Office Location</h3>
        </div>

        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="office-location">Office Address</Label>
            <Textarea 
              id="office-location" 
              :rows="3"
              v-model="accountData.officeLocation" 
              placeholder="Enter your office address"
            />
          </div>

          <div class="space-y-2">
            <Label for="map-link">Google Maps Link</Label>
            <Input 
              id="map-link" 
              type="url" 
              v-model="accountData.mapLink" 
              placeholder="https://maps.google.com/example"
            />
            <p class="text-sm text-gray-500">Optional: Add a Google Maps link for easy navigation</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Notification Preferences -->
    <Card>
      <CardContent class="p-6">
        <div class="flex items-center gap-3 mb-6">
          <Bell class="h-5 w-5 text-primary" />
          <h3 class="text-lg font-semibold">Notification Preferences</h3>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 class="font-medium">Email Notifications</h4>
              <p class="text-sm text-gray-600">Receive booking updates via email</p>
            </div>
            <Switch v-model="accountData.emailNotifications" />
          </div>

          <div class="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 class="font-medium">SMS Notifications</h4>
              <p class="text-sm text-gray-600">Receive urgent updates via SMS</p>
            </div>
            <Switch v-model="accountData.smsNotifications" />
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Security Settings -->
    <Card>
      <CardContent class="p-6">
        <div class="flex items-center gap-3 mb-6">
          <Lock class="h-5 w-5 text-primary" />
          <h3 class="text-lg font-semibold">Change Password</h3>
        </div>

        <div class="space-y-6">
          <!-- Change Password -->
          <div class="space-y-4">
            <form @submit.prevent="changePassword" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="space-y-2">
                  <Label for="current-password">Current Password</Label>
                  <Input 
                    id="current-password" 
                    type="password" 
                    v-model="passwords.current"
                    placeholder="Enter current password"
                  />
                </div>

                <div class="space-y-2">
                  <Label for="new-password">New Password</Label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    v-model="passwords.new"
                    placeholder="Enter new password"
                  />
                </div>

                <div class="space-y-2">
                  <Label for="confirm-password">Confirm Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    v-model="passwords.confirm"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div class="flex justify-end">
                <Button 
                  type="submit" 
                  :disabled="!canChangePassword || isChangingPassword"
                  class="bg-primary hover:bg-primary/90 text-white"
                >
                  <Loader2 v-if="isChangingPassword" class="h-4 w-4 mr-2 animate-spin" />
                  {{ isChangingPassword ? 'Changing...' : 'Update Password' }}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Account Actions -->
    <Card>
      <CardContent class="p-6">
        <div class="flex items-center gap-3 mb-6">
          <AlertTriangle class="h-5 w-5 text-orange-500" />
          <h3 class="text-lg font-semibold">Danger Zone</h3>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
            <div>
              <h4 class="font-medium text-red-900">Delete Account</h4>
              <p class="text-sm text-red-700">Permanently delete your account and all associated data</p>
            </div>
            <Button variant="destructive" @click="deleteAccount">
              <Trash2 class="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
