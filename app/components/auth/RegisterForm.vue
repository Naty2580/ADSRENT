<script setup>
// Imports
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { registerSchema } from '~/utils/schemas';
import { Eye, EyeOff } from 'lucide-vue-next';
import {useAuthStore} from "~/stores/auth";
import { 
  Home, Building2, Search, TrendingUp, Shield, Upload, User, Sparkles 
} from 'lucide-vue-next';
import {regions, subcities, cities} from "~/utils/searchData.js";





const router = useRouter();
const authStore = useAuthStore();
const isSubmitting = ref(false);
const isSuccess = ref(false);
const apiError = ref(null);

const formData = reactive({
    preference: 'tenant',
    type: 'person', // Default account type
});


// Form Setup with VeeValidate
const { defineField, errors, values, handleSubmit } = useForm({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: formData,
});

// Field definitions
const [preference, preferenceAttrs] = defineField('preference');
const [type, typeAttrs] = defineField('type');
const [name, nameAttrs] = defineField('name');
const [gender, genderAttrs] = defineField('gender');
const [email, emailAttrs] = defineField('email');
const [phoneNumber, phoneNumberAttrs] = defineField('phoneNumber');
const [password, passwordAttrs] = defineField('password');
const [password_confirmation, passwordConfirmationAttrs] = defineField('password_confirmation');
const [region, regionAttrs] = defineField('address.region');
const [city, cityAttrs] = defineField('address.city');
const [subcity, subcityAttrs] = defineField('address.subcity');
const [specificArea, specificAreaAttrs] = defineField('address.specificArea');
const [agreeToTerms, agreeToTermsAttrs] = defineField('agreeToTerms');

const showPassword = ref(false);

const availableSubcities = computed(() => {
  return subcities[region.value] || [];
});

const availableAreas = computed(() => {
  return areas[subcity.value] || [];
})

const availableCities = computed(() => {
  return cities[region.value] || [];
})

const roleOptions = computed(() => [
    { id: 'tenant', label: 'tenant', icon: Home, description: 'tenantDesc', color: 'bg-blue-500' },
    { id: 'buyer', label: 'buyer', icon: Search, description: 'buyerDesc', color: 'bg-green-500' },
    { id: 'lessor', label: 'lessor', icon: Building2, description: 'lessorDesc', color: 'bg-orange-500' },
    { id: 'seller', label: 'seller', icon: TrendingUp, description: 'sellerDesc', color: 'bg-purple-500' }
]);


async function handleRegistration(formData) {
  console.log("Form Data:", formData);

    isSubmitting.value = true;
    isSuccess.value = false;
    apiError.value = null;

    try {
console.log("Form Data:  inside try ", formData);
    const backendForm = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      type: formData.type,
      phone_number: formData.phoneNumber,
      location_region: formData.address.region,
      location_city: formData.address.city,
      location_subcity: formData.address.subcity,
      location_specific_area: formData.address.specificArea,
      preference: formData.preference
    };
    if (formData.type === 'company') {
      backendForm.business_license_path = "";
      backendForm.google_map_link = formData.googleMapLink;
    } else if (formData.type === 'person') {
      backendForm.gender = formData.gender;
    }
    console.log("Form Data: after form interchange", formData);
    console.log("Form Submitted:", backendForm);
    console.log("recieved form", formData);
    await authStore.register(backendForm);
        isSuccess.value = true;
        // Redirect after a short delay to show success message
        setTimeout(() => {
            router.push('/dashboard');
        }, 2000);

    } catch (error) {
        apiError.value = error.message || "An unexpected registration error occurred.";
    } finally {
        isSubmitting.value = false;
    }
} 

const onSubmit = handleSubmit(handleRegistration);

</script>
<template>
  <form @submit="onSubmit" class="space-y-4">
    <!-- Error -->
    <div v-if="apiError" class="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
      {{ apiError }}
    </div>

    <!-- Preference Selection -->
    <UiFormField label="Choose Your Role" :error="errors.preference">
      <div class="grid grid-cols-2 gap-3">
        <div
          v-for="role in roleOptions"
          :key="role.id"
          type="button"
          @click="preference = role.label"
          v-motion :hovered="{ scale: 1.02 }" :tapped="{ scale: 0.98 }"

          :class="['relative p-4 rounded-xl border-2 transition-all duration-200 text-left', preference === role.label ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-400']"
        >
        <div class="flex flex-col items-center text-center space-y-2">
                          <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', role.color]">
                            <component :is="role.icon" class="w-5 h-5 text-white" />
                          </div>

                          <div>
                            <p class="font-medium text-sm text-gray-800">{{ role.label }}</p>
                            <p class="text-xs text-gray-500 mt-1">{{ role.description }}</p>
                          </div>

                        </div>
                        
                        <div v-if="preference === role.id" v-motion-pop class="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center"><div class="w-2 h-2 bg-white rounded-full" /></div>


        </div>
      </div>
    </UiFormField>

    <!-- Type (Person/Company) -->
    <UiFormField label="Account Type" :class="['space-y-4']">
      <div class="grid grid-cols-2 gap-3">
        
          <UiButton
          :class="['p-3 bg-white   rounded-lg border-2 transition-all duration-200 text-center flex flex-col items-center h-fit', formData.type === 'person'  ? 'border-orange-500 bg-orange-100' : 'border-gray-200 hover:border-gray-300 ']"
        @click="formData.type = 'person'"
           type="button" v-model="type" v-bind="typeAttrs" value="person"  >
           <User class="w-6 h-6 mx-auto mb-1 text-orange-500" />
           <p class="text-sm font-medium text-gray-800">Person</p>
          </UiButton>
       
       
          <UiButton
          :class="['p-3 bg-white rounded-lg border-2 transition-all duration-200 text-center flex flex-col items-center h-fit', formData.type === 'company' || !formData.type ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300']"
        @click="formData.type = 'company'"
           type="button" v-model="type" v-bind="typeAttrs" value="company"  >
           <Building2 class="w-6 h-6 mx-auto mb-1 text-orange-500" /><p class="text-sm font-medium text-gray-800">Company</p>
          </UiButton>
       
      </div>
    </UiFormField>

    <!-- Conditional Fields -->
    <template v-if="formData.type === 'person'">
      
      <UiFormField label="Name" :error="errors.name">
        <input v-model="name" v-bind="nameAttrs" type="text" class="form-input" />
      </UiFormField>
      <UiFormField label="Gender" :error="errors.gender">
        <div class="flex flex-row space-x-6 mt-2">
                          <div class="flex items-center space-x-2">
                            <input type="radio" id="male" value="male" v-model="gender" v-bind="genderAttrs" class="h-4 w-4    text-orange-500 focus:ring-orange-600 border-gray-300" />
                            <label for="male" class="text-md text-gray-700">Male</label>
                          </div>
                          <div class="flex items-center space-x-2">
                            <input type="radio" id="female" value="female" v-model="gender" v-bind="genderAttrs" class="h-4 w-4 text-orange-500 focus:ring-orange-600 border-gray-300" />
                            <label for="female" class="text-md text-gray-700">Female</label>
                          </div>
                        </div>
      </UiFormField>
    </template>

    <template v-else>
      <UiFormField label="Company Name" :error="errors.name">
        <input v-model="name" v-bind="nameAttrs" type="text" class="form-input" />
      </UiFormField>
    </template>

    <!-- Common Fields -->
    <UiFormField label="Email Address" :error="errors.email">
      <input v-model="email" v-bind="emailAttrs" type="email" class="form-input" />
    </UiFormField>

    <UiFormField label="Phone Number" :error="errors.phoneNumber">
      <input v-model="phoneNumber" v-bind="phoneNumberAttrs" type="tel" class="form-input" />
    </UiFormField>

    <!-- Password Fields -->
    <UiFormField label="Password" :error="errors.password">
      <div class="relative">
        <input
          v-model="password"
          v-bind="passwordAttrs"
          :type="showPassword ? 'text' : 'password'"
          class="form-input pr-10"
        />
        <button
          type="button"
          @click="showPassword = !showPassword"
          class="absolute inset-y-0 right-0 pr-3 bg-transparent flex items-center"
        >
          <component :is="showPassword ? EyeOff : Eye" class="h-4 w-4 text-orange-500" />
        </button>
      </div>
    </UiFormField>

    <UiFormField label="Confirm Password" :error="errors.password">
      <div class="relative">
        <input
          v-model="password_confirmation"
          v-bind="passwordConfirmationAttrs"
          :type="showPassword ? 'text' : 'password'"
          class="form-input pr-10"
        />
        <button
          type="button"
          @click="showPassword = !showPassword"
          class="absolute inset-y-0 right-0 pr-3 bg-transparent flex items-center"
        >
          <component :is="showPassword ? EyeOff : Eye" class="h-4 w-4 text-orange-500" />
        </button>
      </div>
    </UiFormField>


    <!-- Location -->
    <UiFormField label="Region" :error="errors['address.region']">
      <UiSelect v-model="region" v-bind="regionAttrs">
          <UiSelectTrigger>
            <UiSelectValue placeholder="Select Region" /></UiSelectTrigger>
         <UiSelectContent>
          <UiSelectItem v-for="option in regions" :key="option.value" :value="option.value">
            {{ option.label }}
          </UiSelectItem>
         </UiSelectContent>
      </UiSelect>
    </UiFormField>

    <UiFormField label="City" :error="errors['address.city']">
      <UiSelect v-model="city" v-bind="cityAttrs" >
      <UiSelectTrigger>
        <UiSelectValue placeholder="Select City" />
      </UiSelectTrigger>
      <UiSelectContent>
        <UiSelectItem
          v-for="c in availableCities"
          :key="c.value"
          :value="c.value"
        >
          {{ c.value }}
        </UiSelectItem>
      </UiSelectContent>
    </UiSelect>
    </UiFormField>

    <UiFormField label="Subcity" :error="errors['address.subcity']">
      <UiSelect v-model="subcity" v-bind="subcityAttrs" :disabled="!region">
      <UiSelectTrigger>
        <UiSelectValue placeholder="Select Subcity" />
      </UiSelectTrigger>
      <UiSelectContent>
        <UiSelectItem
          v-for="s in availableSubcities"
          :key="s.value"
          :value="s.value"
        >
          {{ s.label }}
        </UiSelectItem>
      </UiSelectContent>
    </UiSelect>
    </UiFormField>

    <UiFormField label="Area" :error="errors['address.specificArea']">
      <UiSelect v-model="specificArea" v-bind="specificAreaAttrs" :disabled="!subcity">
      <UiSelectTrigger>
        <UiSelectValue placeholder="Select Area" />
      </UiSelectTrigger>
      <UiSelectContent>
        <UiSelectItem
          v-for="a in availableAreas"
          :key="a.value"
          :value="a.value"
        >
          {{ a.label }}
        </UiSelectItem>
      </UiSelectContent>
    </UiSelect>
    </UiFormField>

   

    <!-- Terms -->
    <UiFormField :error="errors.agreeToTerms">
      <div class="flex justify-start items-start space-x-1">
        <input
          id="terms"
          v-model="agreeToTerms"
          v-bind="agreeToTermsAttrs"
          :value="true"
          type="checkbox"
          class="mt-1 h-4 w-4 rounded text-orange-500 focus:ring-orange-500"
        />
        <label for="terms" class="text-sm text-muted-foreground">
          I agree to the
          <NuxtLink to="/terms" class="text-orange-500 hover:underline">Terms & Conditions</NuxtLink>
        </label>
      </div>
    </UiFormField>

    <!-- Submit -->
    <Button type="submit" :disabled="isSubmitting" class="w-full py-3 rounded-xl text-base font-semibold">
      <span v-if="isSubmitting">Creating Account...</span>
      <span v-else>Create Account</span>
    </Button>

    
  </form>
</template>




<style scoped>
.form-input { @apply block w-full rounded-md border-0 bg-secondary py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6; }
</style>