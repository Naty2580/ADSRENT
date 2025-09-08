<script setup>
import { ref, computed } from 'vue';
import '~/types/api.js';
import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { addPropertySchema } from '~/utils/schemas';
import { regions,cities, subcities, propertyTypes, amenities } from '~/utils/searchData';
import { Upload, Star, Camera, Home, MapPin, Building, DollarSign, FileText, Globe, X, Loader2 } from 'lucide-vue-next';


import Button from '~/components/ui/Button.vue';
import FormField from '~/components/ui/FormField.vue';

// Define Props & Emits
const props = defineProps({
  initialData: { type: Object, default: null }, 
  isSubmitting: { type: Boolean, default: false },
});
const emit = defineEmits(['submit']);

const isEditMode = computed(() => !!props.initialData);
const fileInput = ref(null);
const uploadedImages = ref([]); // For image previews
const uploadedFiles = ref([]); // For the actual File objects

// Setup VeeValidate Form
const { handleSubmit, errors, values } = useForm({
    validationSchema: toTypedSchema(addPropertySchema),
    initialValues: props.initialData || {
        listingType: 'rent',
        propertyType: '',
        address: {},
        amenities: [],
    }
});

// Define all fields using useField for robustness
const { value: listingType } = useField('listingType');
const { value: title, errorMessage: titleError } = useField('title');
const { value: description, errorMessage: descriptionError } = useField('description');
const { value: price, errorMessage: priceError } = useField('price');
const { value: currency, errorMessage: currencyError } = useField('currency');
const { value: area, errorMessage: areaError } = useField('area');
const { value: bedrooms, errorMessage: bedroomsError } = useField('bedrooms');
const { value: bathrooms, errorMessage: bathroomsError } = useField('bathrooms');
const { value: propertyTypeValue, errorMessage: propertyTypeError } = useField('propertyType');
const { value: addressRegion, errorMessage: addressRegionError } = useField('address.region');
const { value: addressCity, errorMessage: addressCityError } = useField('address.city');
const { value: addressSubcity, errorMessage: addressSubcityError } = useField('address.subcity');
const { value: addressSpecificArea, errorMessage: addressSpecificAreaError } = useField('address.specificArea');
const { value: amenitiesModel, errorMessage: amenitiesError } = useField('amenities');
const { value: isFurnished, errorMessage: isFurnishedError } = useField('isFurnished');
const {value: latitude, errorMessage: latitudeError} = useField('latitude');
const {value: longitude, errorMessage: longitudeError} = useField('longitude');

// Helper functions
const addAmenity = (amenityValue) => {
    amenitiesModel.value.push(amenityValue);
};
const removeAmenity = (index) => {
    amenitiesModel.value.splice(index, 1);
};
const toggleAmenity = (amenityValue) => {
    const idx = amenitiesModel.value.findIndex(a => a === amenityValue);
    idx > -1 ? removeAmenity(idx) : addAmenity(amenityValue);
};

// Computed property for price label
const priceLabel = computed(() => (listingType.value === 'rent' ? 'Monthly Rent ' : 'Sale Price '));
const availableCities = computed(() => values.address?.region ? cities[values.address.region] || [] : []);
const availableSubcities = computed(() => values.address?.city ? subcities[values.address.region] || [] : []);

// File upload logic
const triggerFileUpload = () => fileInput.value?.click();
const handleFileChange = (e) => { 
    const files = e.target.files;
    if (files) Array.from(files).forEach(addFile);
}; 
const addFile = (file) => {
    if (file.size > 2 * 1024 * 1024 || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedImages.value.push(e.target.result);
        uploadedFiles.value.push(file);
    };
    reader.readAsDataURL(file);
};
const removeImage = (index) => {
    uploadedImages.value.splice(index, 1);
    uploadedFiles.value.splice(index, 1);
};
const handleFileDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) Array.from(files).forEach(addFile);
}

// Form submission handler that emits data to the parent page
const onSubmit = handleSubmit((formValues) => {
    emit('submit', { formData: formValues, files: uploadedFiles.value });
});
</script> 

<template>
  <form @submit="onSubmit" class="space-y-8">
      
      <!-- Listing Type Section -->
      <UiCard>
          <UiCardContent class="p-6">
              <h3 class="text-lg font-semibold mb-4 flex items-center gap-2"><Star class="h-5 w-5 text-purple-500" />Property Listing Type</h3>
              <div class="flex gap-6">
                  <label class="flex items-center gap-2 cursor-pointer"><input type="radio" v-model="listingType" value="rent" class="w-4 h-4 text-primary focus:ring-primary"/> For Rent</label>
                  <label class="flex items-center gap-2 cursor-pointer"><input type="radio" v-model="listingType" value="sale" class="w-4 h-4 text-primary focus:ring-primary"/> For Sale</label>
              </div>
          </UiCardContent>
      </UiCard>

      <!-- Photos Section -->
      <UiCard>
          <UiCardContent class="p-6">
              <h3 class="text-lg font-semibold mb-4 flex items-center gap-2"><Camera class="h-5 w-5"/>Property Photos</h3>
              <div class="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50" @click="triggerFileUpload" @dragover.prevent @drop.prevent="handleFileDrop">
                  <input ref="fileInput" type="file" multiple @change="handleFileChange" accept="image/*" class="hidden"/>
                  <Camera class="h-12 w-12 text-gray-400 mx-auto mb-4"/>
                  <p>Click to upload or drag & drop</p>
                  <p class="text-sm text-gray-500 mt-2">Recommended size: 800x600px</p>
              </div>
              <div v-if="uploadedImages.length" class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div v-for="(img, idx) in uploadedImages" :key="idx" class="relative group">
                      <img :src="img" class="w-full h-32 object-cover rounded-lg"/>
                      <button type="button" @click="removeImage(idx)" class="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"><X class="h-4 w-4"/></button>
                  </div>
              </div>
          </UiCardContent>
      </UiCard>

      <!-- Details Section -->
      <UiCard> 
          <UiCardContent class="p-6 space-y-4">
            <FormField label="Property Title *" :error="titleError">
              <UiInput v-model="title" placeholder="e.g., Modern 2BR Apartment in Bole"/>
            </FormField>
            <FormField label="Description *" :error="descriptionError">
              <UiTextarea v-model="description" rows="5" placeholder="Describe the key features of your property..."/>
            </FormField>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Property Type *" :error="propertyTypeError">
                    <select v-model="propertyTypeValue" class="form-input">
                      <option value="">Select type</option>
                      <option v-for="pt in propertyTypes" :key="pt.value" :value="pt.value">{{ pt.label }}</option>
                    </select>
                </FormField>
                <FormField label="Price *" :error="priceError">
                    <UiInput v-model.number="price" type="number" :placeholder="priceLabel"/>
                </FormField>
                <FormField label="Cuurency *" :error="currencyError">
                    <select v-model="currency" class="form-input">
                      <option value="">Select currency</option>
                      <option v-for="c in [{ value: 'USD', label: 'USD' }, { value: 'ETB', label: 'ETB' }, { value: 'GBP', label: 'GBP' }]" :key="c.value" :value="c.value">{{ c.label }}</option>
                    </select>
                </FormField>
               
            </div>
          </UiCardContent>
      </UiCard>
 
       <!-- Specifications Section -->
      <UiCard>
          <UiCardContent class="p-6">
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2"><Building class="h-5 w-5"/>Property Specifications</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="Bedrooms" :error="bedroomsError">
                <UiInput v-model.number="bedrooms" type="number" placeholder="e.g., 3"/>
              </FormField>
              <FormField label="Bathrooms" :error="bathroomsError">
                <UiInput v-model.number="bathrooms" type="number" placeholder="e.g., 2"/>
              </FormField>
              <FormField label="Size (m²)" :error="areaError">
                <UiInput v-model.number="area" type="number" placeholder="e.g., 120"/>
              </FormField>
            </div>
          </UiCardContent>
      </UiCard>
      
      <!-- Location Section -->
      <UiCard>
          <UiCardContent class="p-6">
              <h3 class="text-lg font-semibold mb-4 flex items-center gap-2"><MapPin class="h-5 w-5"/>Location Details</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="Region *" :error="addressRegionError">
                  <select v-model="addressRegion" class="form-input">
                    <option value="">Select Region</option>
                    <option v-for="r in regions" :key="r.value" :value="r.value">{{ r.label }}</option>
                  </select>
                </FormField>
                <FormField label="City *" :error="addressCityError">
                  <select v-model="addressCity" class="form-input">
                    <option value="">Select City</option>
                    <option v-for="c in availableCities" :key="c.value" :value="c.value">{{ c.label }}</option>
                  </select>
                </FormField>
                <FormField label="Sub-City *" :error="addressSubcityError">
                  <select v-model="addressSubcity" :disabled="!values.address.region" class="form-input">
                    <option value="">Select Sub-City</option>
                    <option v-for="s in availableSubcities" :key="s.value" :value="s.value">{{ s.label }}</option>
                  </select>
                </FormField>
                <FormField label="Specific Area *" :error="addressSpecificAreaError">
                  <UiInput v-model="addressSpecificArea" placeholder="e.g., Near Edna Mall"/>
                </FormField>
              </div>
          </UiCardContent>
      </UiCard>
      <!-- //isfurnished boolean value -->
      <UiCard>
        <UiCardContent class="p-6">
           <h3 class="text-lg font-semibold mb-4 flex items-center gap-2"><Building class="h-5 w-5"/>Furnishing</h3>
           <FormField>
              <UiCheckBox v-model="isFurnished" :label="isFurnished ? 'Furnished' : 'Not Furnished'" :error="isFurnishedError" />
           </FormField>
        </UiCardContent>
      </UiCard>

      <!-- Amenities Section -->
      <UiCard>
        <UiCardContent class="p-6">
           <h3 class="text-lg font-semibold mb-4 flex items-center gap-2"><Star class="h-5 w-5"/>Amenities</h3>
           <FormField :error="amenitiesError">
              <!-- USE OUR NEW COMPONENT HERE -->
              <UiCheckBoxGroup 
                v-model="amenitiesModel" 
                :options="amenities" 
              />
           </FormField>
        </UiCardContent>
      </UiCard>

      <!-- latitude and logtitude or map -->
      <UiCard>
        <UiCardContent class="p-6">
           <h3 class="text-lg font-semibold mb-4 flex items-center gap-2"><MapPin class="h-5 w-5"/>Location</h3>
           <FormField :error="latitudeError">
              <UiInput v-model="latitude" type="number" placeholder="latitude"/>
           </FormField>
           <FormField :error="longitudeError">
              <UiInput v-model="longitude" type="number" placeholder="longitude"/>
           </FormField>
        </UiCardContent>
      </UiCard>

      <!-- Submission -->
      <div class="flex justify-end pt-4">
        <Button type="submit" :disabled="props.isSubmitting" size="lg">
          <Loader2 v-if="props.isSubmitting" class="h-5 w-5 mr-2 animate-spin" />
          {{ isEditMode ? 'Save Changes' : 'Submit ' }}
        </Button>
      </div>
  </form>
</template>

<style scoped>
.form-input { @apply block w-full rounded-md border-0 bg-secondary py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6; }
</style>