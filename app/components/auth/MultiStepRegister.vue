<script setup>
import { useAuthStore } from '~/stores/auth';
import RoleSelector from './RoleSelector.vue';
import RegisterForm from './RegisterForm.vue';
import { Sparkles, ArrowLeft } from 'lucide-vue-next';

const authStore = useAuthStore();
const router = useRouter();

const currentStep = ref(1);
const isSubmitting = ref(false);
const isSuccess = ref(false);
const apiError = ref(null);
const formData = reactive({
    preference: '',
    type: 'person', // Default account type
});

function handleRoleSelected(role) {
    formData.preference = role;
    currentStep.value = 2; // Move to the next step
}

async function handleRegisterSubmit(formValues) {
    isSubmitting.value = true;
    apiError.value = null;
    try {
        const payload = { ...formValues };

    const backendForm = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      type: payload.type,
      phone_number: payload.phoneNumber,
      location_region: payload.address.region,
      location_city: payload.address.city,
      location_subcity: payload.address.subcity,
      location_specific_area: payload.address.specificArea,
      preference: payload.preference
    };
    if (payload.type === 'company') {
      backendForm.business_license_path = "";
      backendForm.google_map_link = payload.googleMapLink;
    } else if (payload.type === 'person') {
      backendForm.gender = payload.gender;
    }
    console.log("Form Submitted:", backendForm);
    console.log("recieved form", payload);
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
</script>

<template>
  <div class="p-6 pt-0">
     <!-- Success Screen -->
    <div v-if="isSuccess" class="text-center py-8">
        <div class="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6 mx-auto">
          <Sparkles class="w-10 h-10 text-accent" />
        </div>
        <h3 class="text-2xl font-bold">Welcome to AdissRent!</h3>
        <p class="mt-2 text-muted-foreground">Your account has been created. Redirecting you to your dashboard...</p>
    </div>
    
    <!-- Multi-Step Form -->
    <div v-else>
        <!-- Back Button for Step 2 -->
        <div v-if="currentStep === 2" class="mb-4">
            <Button variant="ghost" @click="currentStep = 1">
                <ArrowLeft class="h-4 w-4 mr-2"/>
                Back to Role Selection
            </Button>
        </div>
        
        <RoleSelector v-if="currentStep === 1" v-model="formData.userRole" @update:model-value="handleRoleSelected"/>
        
        <RegisterForm v-if="currentStep === 2" 
                      :initial-values="formData"
                      :is-submitting="isSubmitting" 
                      :api-error="apiError"
                      @submit="handleRegisterSubmit" 
        />
    </div>
  </div>
</template>