<script setup>
import { ref } from 'vue';
import '~/types/api.js';
import { useForm, useField, FieldArray } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { addPropertySchema } from '~/utils/schemas'; // We'll need to update this schema


import Button from '~/components/ui/Button.vue'; 
import FormField from '~/components/ui/FormField.vue';

// Data Imports (centralized options)
import { regions, subcities, propertyTypes, amenitiesColumns } from '~/utils/searchData'; // Assuming we add amenitiesColumns

// Icon Imports
import { Upload, Star, Camera, Home, MapPin, Building, DollarSign, FileText, Globe, X, Loader2 } from 'lucide-vue-next';


const props = defineProps({
  initialData: { type: Object, default: () => null, },
  isSubmitting: { type: Boolean, default: false },
});
const emit = defineEmits(['submit']);

const isEditMode = computed(() => !!props.initialData);
const uploadedImages = ref([]); // For image previews
const uploadedFiles = ref([]); // For the actual File objects

const { handleSubmit, errors, values } = useForm({
    validationSchema: toTypedSchema(addPropertySchema),
    initialValues: props.initialData || {
        listingType: 'rent',
        amenities: [], // Initialize as an empty array
        address: {},
    }
});

// Field definitions using useField for robustness
const { value: listingType } = useField('listingType');
const { value: title, errorMessage: titleError } = useField('title');
const { value: description, errorMessage: descriptionError } = useField('description');
const { value: price, errorMessage: priceError } = useField('price');
const { value: area, errorMessage: areaError } = useField('area');
const { value: bedrooms, errorMessage: bedroomsError } = useField('bedrooms');
const { value: bathrooms, errorMessage: bathroomsError } = useField('bathrooms');
const { value: addressRegion, errorMessage: addressRegionError } = useField('address.region');
const { value: addressSubcity, errorMessage: addressSubcityError } = useField('address.subcity');
const { value: addressSpecificArea, errorMessage: addressSpecificAreaError } = useField('address.specificArea');
const { value: propertyTypeValue, errorMessage: propertyTypeError } = useField('propertyType');

// Using FieldArray for the amenities checklist
const { fields: amenityFields, push: addAmenity, remove: removeAmenity } = FieldArray('amenities');
const amenitiesModel = computed({
  get: () => values.amenities || [],
  set: (val) => {} // VeeValidate handles updates via toggle function
});
const toggleAmenity = (amenityValue) => {
    const idx = amenitiesModel.value.findIndex(a => a === amenityValue);
    if (idx > -1) {
        removeAmenity(idx);
    } else {
        addAmenity(amenityValue);
    }
}

const fileInput = ref(null);
const triggerFileUpload = () => fileInput.value?.click();
const handleFileChange = (e) => {
    // Logic for handling file uploads (addFile function)
    const files = e.target.files;
    if (!files) return;
    for (const file of files) addFile(file);
};
const addFile = (file) => {
    if (file.size > 2 * 1024 * 1024 || !file.type.startsWith('image/')) {
        alert('Invalid file. Must be an image under 2MB.');
        return;
    }
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


const onSubmit = handleSubmit((formValues) => {
    // Here, we emit both the form data AND the raw files for the parent page to handle.
    emit('submit', { formData: formValues, files: uploadedFiles.value });
});
</script>

<template>
  <div>
    <!-- The template from the new component is inserted here, but with our bindings -->
    <form @submit.prevent="onSubmit" class="space-y-8">
      <UiCard><UiCardContent class="p-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2"><Star class="h-5 w-5"/>Property Listing Type</h3>
        <div class="flex gap-6"><label class="flex items-center gap-2"><input type="radio" v-model="listingType" value="rent"/>For Rent</label><label class="flex items-center gap-2"><input type="radio" v-model="listingType" value="sale"/>For Sale</label></div>
      </UiCardContent></UiCard>
      
      <UiCard><UiCardContent class="p-6">
          <h3 class="text-lg font-semibold mb-4 flex items-center gap-2"><Camera class="h-5 w-5"/>Property Photos</h3>
          <div class="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50" @click="triggerFileUpload">
              <input ref="fileInput" type="file" multiple @change="handleFileChange" class="hidden"/>
              <Camera class="h-12 w-12 text-gray-400 mx-auto mb-4"/>
              <p>Click to upload or drag & drop</p>
          </div>
          <div v-if="uploadedImages.length" class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div v-for="(img, idx) in uploadedImages" :key="idx" class="relative group">
                  <img :src="img" class="w-full h-32 object-cover rounded-lg"/>
                  <button type="button" @click="removeImage(idx)" class="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1"><X class="h-4 w-4"/></button>
              </div>
          </div>
      </UiCardContent></UiCard>

      <UiCard><UiCardContent class="p-6">
          <h3 class="text-lg font-semibold mb-4">Property Details</h3>
          <div class="space-y-4">
            <FormField label="Property Title *" :error="titleError"><Input v-model="title" /></FormField>
            <FormField label="Description *" :error="descriptionError"><Textarea v-model="description" rows="5" /></FormField>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Property Type *" :error="propertyTypeError">
                  <select v-model="propertyTypeValue" class="w-full form-input"><option value="">Select type</option><option v-for="pt in propertyTypes" :key="pt.value" :value="pt.value">{{ pt.label }}</option></select>
                </FormField>
                <FormField label="Bedrooms" :error="bedroomsError"><Input v-model.number="bedrooms" type="number"/></FormField>
                <FormField label="Bathrooms" :error="bathroomsError"><Input v-model.number="bathrooms" type="number"/></FormField>
                <FormField label="Area (m²)" :error="areaError"><Input v-model.number="area" type="number"/></FormField>
                <FormField label="Price (ETB)" :error="priceError"><Input v-model.number="price" type="number"/></FormField>
            </div>
          </div>
      </UiCardContent></UiCard>

       <UiCard><UiCardContent class="p-6">
           <h3 class="text-lg font-semibold mb-4">Location</h3>
           <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="Region" :error="addressRegionError"><select v-model="addressRegion" class="form-input"><option value="">Select region</option><option v-for="r in regions" :key="r.value" :value="r.value">{{ r.label }}</option></select></FormField>
              <FormField label="Sub-City" :error="addressSubcityError"><select v-model="addressSubcity" class="form-input"><option value="">Select sub-city</option></select></FormField>
              <FormField label="Specific Area" :error="addressSpecificAreaError"><Input v-model="addressSpecificArea" /></FormField>
           </div>
       </UiCardContent></UiCard>
      
       <UiCard><UiCardContent class="p-6">
          <h3 class="text-lg font-semibold mb-4">Amenities</h3>
           <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
               <div v-for="amenity in amenitiesColumns" :key="amenity.value" class="flex items-center gap-2">
                   <input type="checkbox" :id="amenity.value" :value="amenity.value" :checked="amenitiesModel.includes(amenity.value)" @change="toggleAmenity(amenity.value)" class="h-4 w-4"/>
                   <label :for="amenity.value">{{ amenity.label }}</label>
               </div>
           </div>
       </UiCardContent></UiCard>

       <div class="flex justify-end">
         <Button type="submit" :disabled="props.isSubmitting" size="lg">
           <Loader2 v-if="props.isSubmitting" class="h-5 w-5 mr-2 animate-spin" />
           {{ isEditMode ? 'Save Changes' : 'Submit Property' }}
         </Button>
       </div>
    </form>
  </div>
</template>

<style scoped>
.form-input { @apply block w-full rounded-md border-0 bg-secondary py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6; }
</style>