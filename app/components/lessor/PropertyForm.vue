<script setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/toTypedSchema';
import { addPropertySchema } from '~/utils/schemas';
import FormField from '~/components/ui/FormField.vue';
import Button from '~/components/ui/Button.vue';

// The component now accepts the initial property data as a prop
const props = defineProps({
  initialData: {
    type: Object,
    default: () => null,
  },
});

// We can check if we are in "edit" mode by seeing if initialData was passed.
const isEditMode = computed(() => !!props.initialData);

// The `emit` function is used to communicate back to the parent page (e.g., when the form is submitted).
const emit = defineEmits(['submit']);

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
    validationSchema: toTypedSchema(addPropertySchema),
    // If we're in edit mode, use the initialData. Otherwise, use default values for a new form.
    initialValues: props.initialData || {
        listingType: 'rent',
        propertyType: 'apartment',
        currency: 'ETB',
        isFurnished: false,
        address: {},
    }
});

const [title, titleAttrs] = defineField('title');
// ... (define all other fields exactly as we did in `add-property.vue`)
const [description, descriptionAttrs] = defineField('description');
const [listingType, listingTypeAttrs] = defineField('listingType');
const [propertyType, propertyTypeAttrs] = defineField('propertyType');
const [price, priceAttrs] = defineField('price');
const [area, areaAttrs] = defineField('area');
const [bedrooms, bedroomsAttrs] = defineField('bedrooms');
const [bathrooms, bathroomsAttrs] = defineField('bathrooms');
const [region, regionAttrs] = defineField('address.region');
const [city, cityAttrs] = defineField('address.city');
const [subcity, subcityAttrs] = defineField('address.subcity');
const [specificArea, specificAreaAttrs] = defineField('address.specificArea');


// When the form is submitted, we don't handle the API call here.
// Instead, we emit the form data up to the parent page.
const onSubmit = handleSubmit((values) => {
  emit('submit', values);
});

</script>

<template>
 <form @submit="onSubmit" class="space-y-8">
    <!-- The entire form structure from add-property.vue goes here. NO CHANGES NEEDED inside the <form> tags -->
     <!-- Basic Information Card -->
      <div class="bg-card rounded-lg border">
        <div class="p-6 border-b"><h3 class="text-lg font-semibold">Basic Information</h3></div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
           <FormField label="Property Title" :error="errors.title" class="md:col-span-2"><input v-model="title" v-bind="titleAttrs" class="form-input"/></FormField>
           <FormField label="Description" :error="errors.description" class="md:col-span-2"><textarea v-model="description" v-bind="descriptionAttrs" rows="5" class="form-input"></textarea></FormField>
            <FormField label="Listing Type" :error="errors.listingType"><select v-model="listingType" v-bind="listingTypeAttrs" class="form-input capitalize"><option value="rent">For Rent</option><option value="sale">For Sale</option></select></FormField>
            <FormField label="Property Type" :error="errors.propertyType"><select v-model="propertyType" v-bind="propertyTypeAttrs" class="form-input capitalize"><option value="apartment">Apartment</option><option value="house">House</option></select></FormField>
             <FormField label="Price" :error="errors.price"><input v-model.number="price" v-bind="priceAttrs" type="number" class="form-input"/></FormField>
             <FormField label="Area (in m²)" :error="errors.area"><input v-model.number="area" v-bind="areaAttrs" type="number" class="form-input"/></FormField>
        </div>
      </div>
       <!-- ... All other form cards (Location, Details, Media) go here exactly as before ... -->
      <div class="flex justify-end">
          <Button type="submit" :disabled="isSubmitting" size="lg">
              <span v-if="isSubmitting">{{ isEditMode ? 'Saving Changes...' : 'Submitting...' }}</span>
              <span v-else>{{ isEditMode ? 'Save Changes' : 'Submit for Review' }}</span>
          </Button>
      </div>
  </form>
</template>

<style scoped>
.form-input { @apply block w-full rounded-md border-0 bg-secondary py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6; }
</style>