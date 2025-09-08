<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <Upload class="h-6 w-6 text-primary" />
        Upload New Property
      </h2>
      <p class="text-gray-600">Fill in the details below to list your property for rent or sale.</p>
    </div>

    <!-- Single container wrapping the entire form -->
    <Card>
      <CardContent class="p-6">
        <form @submit.prevent="onSubmit" class="space-y-8">
          <!-- Listing Type -->
          <section>
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star class="h-5 w-5 text-purple-500" />
              Property Listing Type
            </h3>
            <div class="flex gap-6">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" v-model="form.listingType" value="rent" class="w-4 h-4" />
                <span class="text-sm font-medium">For Rent</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" v-model="form.listingType" value="sale" class="w-4 h-4" />
                <span class="text-sm font-medium">For Sale</span>
              </label>
            </div>
          </section>

          <!-- Photos -->
          <section>
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <Camera class="h-5 w-5 text-primary" />
              Property Photos
            </h3>

            <div class="space-y-4">
              <div
                class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                @click="triggerFileUpload"
                @dragover.prevent
                @drop.prevent="handleFileDrop"
              >
                <input
                  ref="fileInput"
                  type="file"
                  multiple
                  accept="image/*"
                  class="hidden"
                  @change="handleUpload"
                />
                <Camera class="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p class="text-gray-600">Click to upload images or drag and drop</p>
                <p class="text-sm text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB each.</p>
              </div>

              <!-- Previews -->
              <div v-if="uploadedImages.length" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="(img, idx) in uploadedImages" :key="idx" class="relative group">
                  <img :src="img.preview" alt="Preview" class="w-full h-32 object-cover rounded-lg" />
                  <button
                    type="button"
                    @click="removeImage(idx)"
                    class="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X class="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- Title -->
          <section>
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <Home class="h-5 w-5 text-primary" />
              Property Title
            </h3>
            <Input v-model="form.title" placeholder="e.g., Modern 2BR Apartment in Bole" class="w-full" />
            <p v-if="errors.title" class="text-sm text-red-600 mt-1">{{ errors.title }}</p>
          </section>

          <!-- Location -->
          <section>
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin class="h-5 w-5 text-red-500" />
              Location Details
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Region</Label>
                <Select v-model="form.region" :options="regionOptions" class="w-full" />
              </div>

              <div>
                <Label>Subcity</Label>
                <Select v-model="form.subcity" :options="subcityOptions" class="w-full" />
              </div>

              <div>
                <Label>Specific Area</Label>
                <Input v-model="form.specificArea" placeholder="e.g., Near Edna Mall" class="w-full" />
              </div>
            </div>
          </section>

          <!-- Specs -->
          <section>
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <Building class="h-5 w-5 text-primary" />
              Property Specifications
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <Label>Property Type</Label>
                <Select v-model="form.propertyType" :options="propertyTypeOptions" class="w-full" />
              </div>

              <div>
                <Label>Bedrooms</Label>
                <Input v-model.number="form.bedrooms" type="number" placeholder="0" class="w-full" />
              </div>

              <div>
                <Label>Bathrooms</Label>
                <Input v-model.number="form.bathrooms" type="number" placeholder="0" class="w-full" />
              </div>

              <div>
                <Label>Size (sq.m)</Label>
                <Input v-model.number="form.area" type="number" placeholder="0" class="w-full" />
              </div>

              <!-- <div>
                <Label>Availability Status</Label>
                <Select v-model="form.status" :options="statusOptions" class="w-full" />
              </div> -->
            </div>
          </section>

          <!-- Price -->
          <section>
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <DollarSign class="h-5 w-5 text-primary" />
              {{ priceLabel }}
            </h3>
            <Input v-model.number="form.price" type="number" placeholder="0" class="w-full" />
            <p v-if="errors.price" class="text-sm text-red-600 mt-1">{{ errors.price }}</p>
          </section>

          <!-- Description -->
          <section>
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText class="h-5 w-5 text-primary" />
              Description
            </h3>
            <Textarea v-model="form.description" :rows="4" placeholder="Describe your property..." class="w-full" />
          </section>

          <!-- Map -->
          <section>
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <Globe class="h-5 w-5 text-primary" />
              Google Map Link
            </h3>
            <Input v-model="form.mapLink" type="url" placeholder="https://maps.google.com/..." class="w-full" />
          </section>

          <!-- Features -->
          <section>
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star class="h-5 w-5 text-primary" />
              Property Features & Amenities
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div v-for="(col, ci) in amenitiesColumns" :key="ci" class="space-y-3">
                <div v-for="amen in col" :key="amen.value" class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    :id="amen.value"
                    :value="amen.value"
                    :checked="form.features.includes(amen.value)"
                    @change="onFeatureChange(amen.value, $event)"
                    class="w-4 h-4"
                  />
                  <label :for="amen.value" class="text-sm">{{ amen.label }}</label>
                </div>
              </div>
            </div>
          </section>

          <!-- Submit -->
          <div class="flex justify-end">
            <Button :disabled="isSubmitting" type="submit" class="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg">
              <Home class="h-5 w-5 mr-2" />
              {{ submitButtonLabel }}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import Card from '@/components/ui/card.vue'
import CardContent from '@/components/ui/card-content.vue'
import Input from '@/components/ui/input.vue'
import Label from '@/components/ui/label.vue'
import Select from '@/components/ui/select.vue'
import Textarea from '@/components/ui/textarea.vue'
import Button from '@/components/ui/button.vue'
import {
  Upload,
  Star,
  Camera,
  Home,
  MapPin,
  Building,
  DollarSign,
  FileText,
  Globe,
  X
} from 'lucide-vue-next'

const emit = defineEmits(['submit'])

const isSubmitting = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

// Form state (reactive)
const form = reactive({
  listingType: 'rent',
  title: '',
  region: '',
  subcity: '',
  specificArea: '',
  propertyType: '',
  bedrooms: 0,
  bathrooms: 0,
  area: 0,
  price: 0,
  description: '',
  mapLink: '',
  status: '',
  features: [] as string[]
})

// uploaded images previews/files
const uploadedImages = ref<{ preview: string; file: File }[]>([])

// small validation errors
const errors = reactive<{ [k: string]: string }>({})

// Options for selects
const regionOptions = [
  { value: '', label: 'Select region' },
  { value: 'addis-ababa', label: 'Addis Ababa' },
  { value: 'oromia', label: 'Oromia' },
  { value: 'amhara', label: 'Amhara' },
  { value: 'tigray', label: 'Tigray' }
]

const subcityOptions = [
  { value: '', label: 'Select subcity' },
  { value: 'bole', label: 'Bole' },
  { value: 'kirkos', label: 'Kirkos' },
  { value: 'yeka', label: 'Yeka' }
]

const propertyTypeOptions = [
  { value: '', label: 'Select type' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'villa', label: 'Villa' },
  { value: 'office', label: 'Office' },
  { value: 'condo', label: 'Condo' },
  { value: 'land', label: 'Land' },
  { value: 'shop', label: 'Shop' },
  { value: 'warehouse', label: 'Warehouse' },
  { value: 'studio', label: 'Studio' },
  { value: 'building', label: 'Building' },
  { value: 'guesthouse', label: 'Guesthouse' },
  { value: 'other', label: 'Other' }
]

const statusOptions = [
  { value: '', label: 'Select Status' },
  { value: 'available', label: 'Available' },
  { value: 'occupied', label: 'Occupied' }
]

const amenitiesColumns = [
  [
    { value: 'furnished', label: 'Furnished' },
    { value: 'swimming-pool', label: 'Swimming Pool' },
    { value: 'air-conditioning', label: 'Air Conditioning' },
    { value: 'modern-kitchen', label: 'Modern Kitchen' },
    { value: 'near-school', label: 'Near School' }
  ],
  [
    { value: 'parking', label: 'Parking' },
    { value: 'gym', label: 'Gym' },
    { value: 'internet-wifi', label: 'Internet/WiFi' },
    { value: 'walk-in-closet', label: 'Walk-in Closet' },
    { value: 'near-hospital', label: 'Near Hospital' }
  ],
  [
    { value: 'garden', label: 'Garden' },
    { value: 'elevator', label: 'Elevator' },
    { value: 'generator', label: 'Generator' },
    { value: 'city-view', label: 'City View' },
    { value: 'balcony', label: 'Balcony' }
  ]
]

// computed labels
const priceLabel = computed(() => (form.listingType === 'rent' ? 'Monthly Rent (ETB)' : 'Sale Price (ETB)'))
const submitButtonLabel = computed(() => (form.listingType === 'rent' ? 'List for Rent' : 'List for Sale'))

// helpers
const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files) return
  for (let i = 0; i < target.files.length; i++) {
    const file = target.files[i]
    addFile(file)
  }
  // reset input so same file can be re-selected if needed
  target.value = ''
}

const handleFileDrop = (event: DragEvent) => {
  event.preventDefault()
  const droppedFiles = event.dataTransfer?.files
  if (!droppedFiles) return
  for (let i = 0; i < droppedFiles.length; i++) {
    addFile(droppedFiles[i])
  }
}

function addFile(file: File) {
  if (file.size > 2 * 1024 * 1024) { // 2MB
    alert('Image size exceeds 2MB limit.')
    return
  }
  if (!file.type.startsWith('image/')) {
    alert('Please upload only images.')
    return
  }
  const reader = new FileReader()
  reader.onload = (ev) => {
    uploadedImages.value.push({ preview: ev.target?.result as string, file })
  }
  reader.readAsDataURL(file)
}

const removeImage = (index: number) => {
  uploadedImages.value.splice(index, 1)
}

const toggleFeature = (featureValue: string, checked: boolean) => {
  const idx = form.features.indexOf(featureValue)
  if (checked && idx === -1) form.features.push(featureValue)
  if (!checked && idx !== -1) form.features.splice(idx, 1)
}

const onFeatureChange = (featureValue: string, event: Event) => {
  const target = event.target as HTMLInputElement
  toggleFeature(featureValue, target.checked)
}

const validate = () => {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!form.title || !form.title.trim()) errors.title = 'Title is required.'
  if (!form.price || form.price <= 0) errors.price = 'Price must be greater than 0.'
  if (!form.region) errors.region = 'Region is required.'
  return Object.keys(errors).length === 0
}

const resetForm = () => {
  form.listingType = 'rent'
  form.title = ''
  form.region = ''
  form.subcity = ''
  form.specificArea = ''
  form.propertyType = ''
  form.bedrooms = 0
  form.bathrooms = 0
  form.area = 0
  form.price = 0
  form.description = ''
  form.mapLink = ''
  form.status = ''
  form.features = []
  uploadedImages.value = []
  Object.keys(errors).forEach(k => delete errors[k])
}

const onSubmit = async () => {
  if (!validate()) return

  isSubmitting.value = true
  try {
    // prepare payload
    const payload = {
      ...JSON.parse(JSON.stringify(form)),
      images: uploadedImages.value.map(i => i.file) // real upload should use FormData
    }

    // simulate API call
    await new Promise((r) => setTimeout(r, 900))

    // emit to parent
    emit('submit', payload)

    // reset UI
    resetForm()
    alert('Property submitted!')
  } catch (err) {
    console.error(err)
    alert('There was an error submitting — check console.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
