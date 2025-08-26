<script setup>
// ========= VUE & LIBRARY IMPORTS =========
import { ref, computed, reactive, watch } from 'vue';
import { 
  Home, Building2, Search, TrendingUp, Shield, Eye, EyeOff, Upload, User, Sparkles 
} from 'lucide-vue-next';

// ===== MODIFIED: Emits now include 'signup-success' =====
const emit = defineEmits(['close', 'signup-success']);

// ========= LANGUAGE LOGIC (from useLanguage.js) =========
const language = ref('en'); // Defaults to English
const translations = {
  en: {
    'app.title': 'AddisRent', 'app.subtitle': '🌍 Ethiopia\'s Premier Platform', 'app.welcome': 'Welcome to AddisRent 🌍', 'app.description': 'Your trusted rental & investment platform in Ethiopia', 'app.tagline': '📍 Pin your next home, office, or land today', 'features.listProperties': 'List Properties', 'features.listPropertiesDesc': 'Easy listing for landlords', 'features.findRentals': 'Find Rentals', 'features.findRentalsDesc': 'Discover your perfect home', 'features.investSmart': 'Invest Smart', 'features.investSmartDesc': 'Investment opportunities', 'features.trustedNetwork': 'Trusted Network', 'features.trustedNetworkDesc': 'Verified users & properties', 'form.createAccount': 'Create Your AddisRent Account', 'form.getStarted': 'Select your role and get started', 'form.createAccountMobile': 'Create Your Account', 'form.joinToday': 'Join AddisRent today', 'roles.selectRole': 'Select your role:', 'roles.tenant': 'I\'m a Tenant', 'roles.tenantDesc': 'Looking for a place to rent', 'roles.buyer': 'I\'m a Buyer', 'roles.buyerDesc': 'Looking to purchase property', 'roles.lessor': 'I\'m a Lessor', 'roles.lessorDesc': 'I have properties to rent', 'roles.seller': 'I\'m a Seller', 'roles.sellerDesc': 'I have properties to sell', 'account.accountType': 'Account Type:', 'account.individual': 'Individual', 'account.organization': 'Organization', 'fields.fullName': 'Full Name', 'fields.fullNamePlaceholder': 'Enter your full name', 'fields.organizationName': 'Organization Name', 'fields.organizationNamePlaceholder': 'Enter organization name', 'fields.contactPerson': 'Contact Person Name', 'fields.contactPersonPlaceholder': 'Enter contact person name', 'fields.gender': 'Gender', 'fields.male': 'Male', 'fields.female': 'Female', 'fields.email': 'Email Address', 'fields.emailPlaceholder': 'Enter your email address', 'fields.phoneNumber': 'Phone Number', 'fields.phoneNumberPlaceholder': '+251 9XX XXX XXX', 'fields.password': 'Password', 'fields.passwordPlaceholder': 'Create a strong password', 'fields.confirmPassword': 'Confirm Password', 'fields.confirmPasswordPlaceholder': 'Confirm your password', 'fields.googleMapsLink': 'Google Maps Link', 'fields.googleMapsPlaceholder': 'https://maps.google.com/...', 'fields.businessLicense': 'Business License', 'fields.uploadLicense': 'Upload license', 'fields.propertyInterest': 'Property Interest', 'fields.propertyInterestPlaceholder': 'What are you looking for?', 'property.apartment': 'Apartment', 'property.house': 'House', 'property.office': 'Office Space', 'property.commercial': 'Commercial Property', 'property.land': 'Land', 'location.location': 'Location', 'location.region': 'Region', 'location.regionPlaceholder': 'Select Region', 'location.city': 'City', 'location.cityPlaceholder': 'Select City', 'location.subcity': 'Sub-City', 'location.subcityPlaceholder': 'Select Sub-City', 'location.area': 'Area', 'location.areaPlaceholder': 'Select Area', 'terms.agree': 'I agree to the', 'terms.termsConditions': 'Terms & Conditions', 'terms.and': 'and', 'terms.privacyPolicy': 'Privacy Policy', 'actions.createAccount': 'Create Account', 'actions.creatingAccount': 'Creating Account...', 'actions.getStarted': 'Get Started', 'success.welcome': 'Welcome to AddisRent! 🎉', 'success.accountCreated': 'Your account has been created successfully. You can now start exploring rental opportunities.', 'nav.alreadyAccount': 'Already have an account?', 'nav.loginHere': 'Login here', 'nav.backToHome': 'Back to Home', 'nav.help': 'Help', 'nav.privacy': 'Privacy', 'errors.emailRequired': 'Email is required', 'errors.emailInvalid': 'Invalid email format', 'errors.phoneRequired': 'Phone number is required', 'errors.phoneInvalid': 'Invalid Ethiopian phone number', 'errors.passwordRequired': 'Password is required', 'errors.passwordTooShort': 'Password must be at least 8 characters', 'errors.passwordWeak': 'Password must contain at least one lowercase, uppercase, and number', 'errors.confirmPasswordRequired': 'Please confirm your password', 'errors.passwordsNotMatch': 'Passwords do not match', 'errors.nameRequired': 'Full name is required', 'errors.nameTooShort': 'Name must be at least 2 characters', 'errors.organizationNameRequired': 'Organization name is required', 'errors.contactPersonRequired': 'Contact person name is required', 'errors.genderRequired': 'Gender is required', 'errors.subcityRequired': 'Subcity is required', 'errors.areaRequired': 'Area is required', 'errors.cityRequired': 'City is required', 'errors.regionRequired': 'Region is required'
  },
  am: {
    'app.title': 'አዲስሬንት', 'app.subtitle': '🌍 የኢትዮጵያ ቀዳሚ መድረክ', 'app.welcome': 'እንኳን ወደ አዲስሬንት በደህና መጡ 🌍', 'app.description': 'በኢትዮጵያ የሚመካ የኪራይና ኢንቨስትመንት መድረክ', 'app.tagline': '📍 የሚቀጥለውን ቤትዎን፣ ቢሮዎን ወይም መሬትዎን ዛሬ ይመዝግቡ', 'features.listProperties': 'ንብረት ይዘርዝሩ', 'features.listPropertiesDesc': 'ለቤት ባለቤቶች ቀላል መዝገብ', 'features.findRentals': 'ኪራይ ያግኙ', 'features.findRentalsDesc': 'ፍጹም ቤትዎን ያግኙ', 'features.investSmart': 'በብልህነት ኢንቨስት ያድርጉ', 'features.investSmartDesc': 'የኢንቨስትመንት እድሎች', 'features.trustedNetwork': 'የሚመካ አውታር', 'features.trustedNetworkDesc': 'የተረጋገጡ ተጠቃሚዎችና ንብረቶች', 'form.createAccount': 'የአዲስሬንት መለያዎን ይፍጠሩ', 'form.getStarted': 'ሚናዎን ይምረጡ እና ይጀምሩ', 'form.createAccountMobile': 'መለያዎን ይፍጠሩ', 'form.joinToday': 'ዛሬ አዲስሬንት ይቀላቀሉ', 'roles.selectRole': 'ሚናዎን ይምረጡ:', 'roles.tenant': 'ተከራይ ነኝ', 'roles.tenantDesc': 'ለኪራይ ቦታ እየፈለግኩ ነው', 'roles.buyer': 'ገዢ ነኝ', 'roles.buyerDesc': 'ንብረት ለመግዛት እየፈለግኩ ነው', 'roles.lessor': 'አከራይ ነኝ', 'roles.lessorDesc': 'ለኪራይ የምሰጠው ንብረት አለኝ', 'roles.seller': 'ሻጭ ነኝ', 'roles.sellerDesc': 'ለመሽጥ የምፈልገው ንብረት አለኝ', 'account.accountType': 'የመለያ ዓይነት:', 'account.individual': 'ግለሰብ', 'account.organization': 'ድርጅት', 'fields.fullName': 'ሙሉ ስም', 'fields.fullNamePlaceholder': 'ሙሉ ስምዎን ያስገቡ', 'fields.organizationName': 'የድርጅት ስም', 'fields.organizationNamePlaceholder': 'የድርጅት ስም ያስገቡ', 'fields.contactPerson': 'የመገናኛ ሰው ስም', 'fields.contactPersonPlaceholder': 'የመገናኛ ሰው ስም ያስገቡ', 'fields.gender': 'ጾታ', 'fields.male': 'ወንድ', 'fields.female': 'ሴት', 'fields.email': 'ኢሜል አድራሻ', 'fields.emailPlaceholder': 'ኢሜል አድራሻዎን ያስገቡ', 'fields.phoneNumber': 'ስልክ ቁጥር', 'fields.phoneNumberPlaceholder': '+251 9XX XXX XXX', 'fields.password': 'የይለፍ ቃል', 'fields.passwordPlaceholder': 'ጠንካራ የይለፍ ቃል ይፍጠሩ', 'fields.confirmPassword': 'የይለፍ ቃል ያጽድቁ', 'fields.confirmPasswordPlaceholder': 'የይለፍ ቃልዎን ያጽድቁ', 'fields.googleMapsLink': 'የጉግል ካርታ ሊንክ', 'fields.googleMapsPlaceholder': 'https://maps.google.com/...', 'fields.businessLicense': 'የንግድ ፍቃድ', 'fields.uploadLicense': 'ፍቃድ ይጫኑ', 'fields.propertyInterest': 'የንብረት ፍላጎት', 'fields.propertyInterestPlaceholder': 'ምን እየፈለጉ ነው?', 'property.apartment': 'አፓርትመንት', 'property.house': 'ቤት', 'property.office': 'የቢሮ ቦታ', 'property.commercial': 'የንግድ ንብረት', 'property.land': 'መሬት', 'location.location': 'አካባቢ', 'location.region': 'ክልል', 'location.regionPlaceholder': 'ክልል ይምረጡ', 'location.city': 'ከተማ', 'location.cityPlaceholder': 'ከተማ ይምረጡ', 'location.subcity': 'ክፍለ ከተማ', 'location.subcityPlaceholder': 'ክፍለ ከተማ ይምረጡ', 'location.area': 'አካባቢ', 'location.areaPlaceholder': 'አካባቢ ይምረጡ', 'terms.agree': 'እኔ እቀበላለሁ', 'terms.termsConditions': 'ውል እና ሁኔታዎች', 'terms.and': 'እና', 'terms.privacyPolicy': 'የግላዊነት ፖሊሲ', 'actions.createAccount': 'መለያ ይፍጠሩ', 'actions.creatingAccount': 'መለያ እየፈጠርን ነው...', 'actions.getStarted': 'ጀምሩ', 'success.welcome': 'እንኳን ወደ አዲስሬንት በደህና መጡ! 🎉', 'success.accountCreated': 'መለያዎ በተሳካ ሁኔታ ተፈጥሯል። አሁን የኪራይ እድሎችን ማሰስ ይጀምሩ።', 'nav.alreadyAccount': 'ቀደም ብለው መለያ አለዎት?', 'nav.loginHere': 'እዚህ ግቡ', 'nav.backToHome': 'ወደ ቤት ተመለስ', 'nav.help': 'እርዳታ', 'nav.privacy': 'ግላዊነት', 'errors.cityRequired': 'ከተማ ያስፈልጋል', 'errors.emailRequired': 'ኢሜል ያስፈልጋል', 'errors.emailInvalid': 'የተሳሳተ ኢሜል ቅርጸት', 'errors.phoneRequired': 'ስልክ ቁጥር ያስፈልጋል', 'errors.phoneInvalid': 'የተሳሳተ የኢትዮጵያ ስልክ ቁጥር', 'errors.passwordRequired': 'የይለፍ ቃል ያስፈልጋል', 'errors.passwordTooShort': 'የይለፍ ቃል ቢያንስ 8 ባህሪያት ሊኖረው ይገባል', 'errors.passwordWeak': 'የይለፍ ቃል ቢያንስ አንድ ትንሽ፣ ትልቅ እና ቁጥር ሊኖረው ይገባል', 'errors.confirmPasswordRequired': 'እባክዎ የይለፍ ቃልዎን ያጽድቁ', 'errors.passwordsNotMatch': 'የይለፍ ቃሎች አይዛመዱም', 'errors.nameRequired': 'ሙሉ ስም ያስፈልጋል', 'errors.nameTooShort': 'ስም ቢያንስ 2 ባህሪያት ሊኖረው ይገባል', 'errors.organizationNameRequired': 'የድርጅት ስም ያስፈልጋል', 'errors.contactPersonRequired': 'የመገናኛ ሰው ስም ያስፈልጋል', 'errors.genderRequired': 'ጾታ ያስፈልጋል', 'errors.regionRequired': 'ክልል ያስፈልጋል', 'errors.subcityRequired': 'ክፍለ ከተማ ያስፈልጋል', 'errors.areaRequired': 'አካባቢ ያስፈልጋል', 'errors.agreeTermsRequired': 'ሁኔታዎችን መቀበል አለቦት'
  }
};
const setLanguage = (lang) => { if (['en', 'am'].includes(lang)) { language.value = lang; } };
const t = computed(() => (key) => translations[language.value][key] || key);


// ========= LOCATION DATA (from location.js) =========
const ethiopianLocations = {
  regions: [
    { id: 'addis_ababa', name: 'Addis Ababa / አዲስ አበባ', subcities: [ { id: 'addis_ketema', name: 'Addis Ketema / አዲስ ከተማ', areas: [{ id: 'merkato', name: 'Merkato / መርካቶ' }, { id: 'autobus_tera', name: 'Autobus Tera / አውቶቡስ ተራ' }] }, { id: 'arada', name: 'Arada / አራዳ', areas: [{ id: 'piassa', name: 'Piassa / ፒያሳ' }, { id: 'arat_kilo', name: 'Arat Kilo / አራት ኪሎ' }] }, { id: 'kirkos', name: 'Kirkos / ቂርቆስ', areas: [{ id: 'kasanchis', name: 'Kasanchis / ካዛንቺስ' }, { id: 'meskel_square', name: 'Meskel Square / መስቀል አደባባይ' }] }, { id: 'bole', name: 'Bole / ቦሌ', areas: [{ id: 'bole_medhanialem', name: 'Bole Medhanialem / ቦሌ መድኃኔዓለም' }, { id: 'edna_mall', name: 'Edna Mall / ኤድና ሞል' }] }, { id: 'yeka', name: 'Yeka / የካ', areas: [{ id: 'megenagna', name: 'Megenagna / መገናኛ' }, { id: 'shola', name: 'Shola / ሾላ' }] }, ] },
    { id: 'amhara', name: 'Amhara / አማራ', cities: [ { id: 'bahir_dar', name: 'Bahir Dar / ባህር ዳር' }, { id: 'gondar', name: 'Gondar / ጎንደር' }, { id: 'dessie', name: 'Dessie / ደሴ' }, { id: 'kombolcha', name: 'Kombolcha / ኮምቦልቻ' }, { id: 'woldiya', name: 'Woldiya / ወልድያ' }, { id: 'debre_markos', name: 'Debre Markos / ደብረ ማርቆስ' }, ] },
    { id: 'oromia', name: 'Oromia / ኦሮሚያ', cities: [ { id: 'adama', name: 'Adama (Nazret) / አዳማ (ናዝሬት)' }, { id: 'jimma', name: 'Jimma / ጅማ' }, { id: 'bishoftu', name: 'Bishoftu (Debre Zeit) / ቢሾፍቱ (ደብረ ዘይት)' }, { id: 'nekemte', name: 'Nekemte / ነቀምቴ' }, { id: 'shashemene', name: 'Shashemene / ሻሸመኔ' }, { id: 'asella', name: 'Asella / አሰላ' }, ] },
    { id: 'tigray', name: 'Tigray / ትግራይ', cities: [ { id: 'mekelle', name: 'Mekelle / መቀሌ' }, { id: 'adigrat', name: 'Adigrat / አዲግራት' }, { id: 'axum', name: 'Axum / አክሱም' }, { id: 'shire', name: 'Shire / ሽሬ' }, { id: 'alamata', name: 'Alamata / አላማጣ' }, ] },
    { id: 'somali', name: 'Somali / ሶማሌ', cities: [ { id: 'jijiga', name: 'Jijiga / ጅጅጋ' }, { id: 'gode', name: 'Gode / ጎዴ' }, { id: 'kebri_dahar', name: 'Kebri Dahar / ቀብሪ ደሃር' }, { id: 'degehabur', name: 'Degehabur / ደገሃቡር' }, ] },
    { id: 'afar', name: 'Afar / አፋር', cities: [ { id: 'semera', name: 'Semera / ሰመራ' }, { id: 'asayita', name: 'Asayita / አሳይታ' }, { id: 'afambo', name: 'Afambo / አፋምቦ' }, ] },
    { id: 'sidama', name: 'Sidama / ሲዳማ', cities: [ { id: 'hawassa', name: 'Hawassa / ሀዋሳ' } ] }, { id: 'harari', name: 'Harari / ሐረሪ', cities: [ { id: 'harar', name: 'Harar / ሐረር' } ] }, { id: 'gambela', name: 'Gambela / ጋምቤላ', cities: [ { id: 'gambela_city', name: 'Gambela / ጋምቤላ' } ] }, { id: 'benishangul_gumuz', name: 'Benishangul-Gumuz / ቤኒሻንጉል ጉሙዝ', cities: [ { id: 'assosa', name: 'Assosa / አሶሳ' } ] }, { id: 'swepr', name: 'South West Ethiopia People Region / ደቡብ ምዕራብ ህዝቦች ክልል', cities: [ { id: 'bonga', name: 'Bonga / ቦንጋ' } ] }, { id: 'ser', name: 'South Ethiopia Regional State / የደቡብ ኢትዮጵያ ህዝብ ክልል', cities: [ { id: 'arba_minch', name: 'Arba Minch / አርባ ምንጭ' } ] }, { id: 'cer', name: 'Central Ethiopia Regional State / ማዕከላዊ የኢትዮጵያ ክልላዊ ግዛት', cities: [ { id: 'butajira', name: 'Butajira / ቡታጅራ' } ] },
  ]
};

// ========= FORM VALIDATION LOGIC (from useFormValidation.js) =========
const formData = reactive({ userRole: 'tenant', accountType: 'individual', fullName: '', organizationName: '', googleMapsLink: '', businessLicense: null, email: '', phoneNumber: '', password: '', confirmPassword: '', city: '', region: '', subcity: '', area: '', agreeToTerms: false, gender: '' });
const errors = reactive({});
const touched = reactive({});
const isSubmitting = ref(false);
const validateField = (field) => {
  const value = formData[field];
  delete errors[field];

  if (field === 'organizationName' && formData.accountType === 'organization' && !value) {
    errors.organizationName = t.value('errors.organizationNameRequired');
  }
  else if (field === 'fullName' && formData.accountType === 'individual' && !value) {
    errors.fullName = t.value('errors.nameRequired');
  }
  else if (field === 'email' && !value) errors.email = t.value('errors.emailRequired');
  else if (field === 'region' && !value) errors.region = t.value('errors.regionRequired');
  else if (field === 'city' && formData.region && formData.region !== 'addis_ababa' && !value) errors.city = t.value('errors.cityRequired');
  else if (field === 'subcity' && formData.region === 'addis_ababa' && !value) errors.subcity = t.value('errors.subcityRequired');
  else if (field === 'area' && formData.region === 'addis_ababa' && !value) errors.area = t.value('errors.areaRequired');
  else if (field === 'agreeToTerms' && !value) errors.agreeToTerms = t.value('errors.agreeTermsRequired');
};
const updateField = (field, value) => { formData[field] = value; if (touched[field]) { validateField(field); } };
const touchField = (field) => { touched[field] = true; validateField(field); };
const validateForm = () => { Object.keys(formData).forEach(field => { touched[field] = true; validateField(field); }); return Object.keys(errors).length === 0; };


// ========= FORM LOGIC (from SignupForm.vue) =========
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isSuccess = ref(false);
const formElement = ref(null);
const roleOptions = computed(() => [
    { id: 'tenant', label: t.value('roles.tenant'), icon: Home, description: t.value('roles.tenantDesc'), color: 'bg-blue-500' },
    { id: 'buyer', label: t.value('roles.buyer'), icon: Search, description: t.value('roles.buyerDesc'), color: 'bg-green-500' },
    { id: 'lessor', label: t.value('roles.lessor'), icon: Building2, description: t.value('roles.lessorDesc'), color: 'bg-[var(--color-orange-primary)]' },
    { id: 'seller', label: t.value('roles.seller'), icon: TrendingUp, description: t.value('roles.sellerDesc'), color: 'bg-purple-500' }
]);
const selectedRegionData = computed(() => { if (!formData.region) return null; return ethiopianLocations.regions.find(r => r.id === formData.region); });
const availableCities = computed(() => selectedRegionData.value?.cities || []);
const availableSubcities = computed(() => selectedRegionData.value?.subcities || []);
const availableAreas = computed(() => { if (!formData.subcity) return []; const selectedSubcity = availableSubcities.value.find(s => s.id === formData.subcity); return selectedSubcity ? selectedSubcity.areas : []; });
watch(() => formData.region, () => { formData.city = ''; formData.subcity = ''; formData.area = ''; });
watch(() => formData.subcity, () => { formData.area = ''; });
const handleFileUpload = (e) => { const file = e.target.files?.[0]; if (file) { updateField('businessLicense', file); } };

// const handleSubmit = async () => {
//   if (!validateForm()) {
//     if (formElement.value) { formElement.value.classList.add('animate-shake'); setTimeout(() => { formElement.value.classList.remove('animate-shake'); }, 500); }
//     return;
//   }
//   isSubmitting.value = true;
//   await new Promise(resolve => setTimeout(resolve, 2000));
//   isSubmitting.value = false;
//   isSuccess.value = true;
  
//   // ===== MODIFIED: Emit the user's role on success =====
//   emit('signup-success', formData.userRole);
// };

const startOver = () => { isSuccess.value = false; Object.keys(formData).forEach(key => formData[key] = ''); formData.userRole = 'tenant'; formData.accountType = 'individual'; formData.agreeToTerms = false; };
const inputBaseClasses = 'w-full px-3 py-2 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:scale-105 bg-gray-100 text-gray-800 placeholder:text-gray-400';
const inputBorderClasses = (hasError) => hasError ? 'border-red-500' : 'border-gray-300';

</script>

<template>
  <div class="h-screen w-screen bg-gray-50 transition-colors duration-300 overflow-hidden">
    
    <!-- Language Toggles & Back Button -->
    <div class="absolute top-4 left-4 z-20 flex space-x-2">
       <!-- ===== NEW: BACK BUTTON ===== -->
      <button @click="emit('close')" class="p-2 rounded-full bg-gray-200/80 hover:bg-gray-300/80 flex items-center space-x-2 text-sm text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        <span>Back</span>
      </button>
    </div>
    
    <div class="absolute top-4 right-4 z-20 flex space-x-2 items-center p-1 rounded-full bg-gray-200 text-sm">
        <button @click="setLanguage('en')" :class="['px-2 py-0.5 rounded-full', language === 'en' ? 'bg-white text-gray-800' : 'text-gray-500']">EN</button>
        <button @click="setLanguage('am')" :class="['px-2 py-0.5 rounded-full', language === 'am' ? 'bg-white text-gray-800' : 'text-gray-500']">AM</button>
    </div>
    
    <div class="flex h-full w-full">
      <!-- Left Section -->
      <div class="w-1/2 h-full relative overflow-hidden hidden lg:block">
        <div class="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&h=900&fit=crop"
            alt="Beautiful Modern Apartment Interior"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="absolute inset-0 bg-black opacity-60"/>
        <div class="relative z-10 h-full flex flex-col justify-center items-center px-12 text-center">
          <div v-motion-pop-visible class="mb-8">
            <div class="flex items-center justify-center mb-4">
              <div class="w-14 h-14 bg-[var(--color-orange-primary)] rounded-2xl flex items-center justify-center mr-4 shadow-2xl">
                <Home class="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 :class="['text-4xl font-bold text-white drop-shadow-lg', { 'font-amharic': language === 'am' }]">{{ t('app.title') }}</h1>
                <p :class="['text-lg text-white text-opacity-90 drop-shadow-md', { 'font-amharic': language === 'am' }]">{{ t('app.subtitle') }}</p>
              </div>
            </div>
          </div>
          <div v-motion-fade-in-visible :delay="200" class="mb-8 max-w-2xl">
            <h2 :class="['text-4xl xl:text-5xl font-bold mb-6 leading-tight text-white drop-shadow-lg', { 'font-amharic': language === 'am' }]">{{ t('app.welcome') }}</h2>
            <p :class="['text-lg xl:text-xl leading-relaxed text-white text-opacity-95 drop-shadow-md mb-4', { 'font-amharic': language === 'am' }]">{{ t('app.description') }}</p>
            <p :class="['text-base xl:text-lg leading-relaxed text-white text-opacity-90 drop-shadow-md', { 'font-amharic': language === 'am' }]">{{ t('app.tagline') }}</p>
          </div>
        </div>
      </div>

      <!-- Right Section (The Form) -->
      <div class="w-full lg:w-1/2 h-full bg-gray-50 flex flex-col">
        <div class="flex-shrink-0 px-6 lg:px-8 pt-6">
          <div class="lg:hidden text-center mb-4">
            <div v-motion-pop-visible class="flex items-center justify-center mb-3">
              <div class="w-10 h-10 bg-[var(--color-orange-primary)] rounded-xl flex items-center justify-center mr-3"><Home class="w-6 h-6 text-white" /></div>
              <div>
                <h1 :class="['text-2xl font-bold text-[var(--color-orange-primary)]', { 'font-amharic': language === 'am' }]">{{ t('app.title') }}</h1>
                <p :class="['text-xs text-gray-600', { 'font-amharic': language === 'am' }]">{{ t('app.subtitle') }}</p>
              </div>
            </div>
          </div>
          <div class="text-center mb-4">
            <div v-motion-fade-in-visible :delay="200">
              <h2 :class="['text-xl lg:text-2xl font-bold text-gray-900 mb-1', { 'font-amharic': language === 'am' }]">
                <span class="hidden lg:inline">{{ t('form.createAccount') }}</span>
                <span class="lg:hidden">{{ t('form.createAccountMobile') }}</span>
              </h2>
              <p :class="['text-sm text-gray-600', { 'font-amharic': language === 'am' }]">
                 <span class="hidden lg:inline">{{ t('form.getStarted') }}</span>
                 <span class="lg:hidden">{{ t('form.joinToday') }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="flex-1 overflow-y-auto px-6 lg:px-8 pb-6">
          <div class="flex justify-center">
            <div class="w-full max-w-lg">
              
              <!-- Success View -->
              <div v-if="isSuccess" v-motion-fade class="flex flex-col items-center justify-center h-full text-center py-10">
                <div v-motion-pop :delay="200" class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"><Sparkles class="w-12 h-12 text-[var(--color-green-accent)]" /></div>
                <h2 :class="['text-3xl font-bold mb-4 text-gray-800', { 'font-amharic': language === 'am' }]">{{ t('success.welcome') }}</h2>
                <p :class="['text-lg text-gray-600 mb-6', { 'font-amharic': language === 'am' }]">{{ t('success.accountCreated') }}</p>
                <button @click="startOver" class="px-6 py-2 bg-[var(--color-orange-primary)] hover:bg-[var(--color-orange-gradient)] text-white font-semibold rounded-lg shadow-md">{{ t('actions.getStarted') }}</button>
              </div>

              <!-- Form View -->
              <div v-else :class="['w-full', { 'font-amharic': language === 'am' }]">
                <form ref="formElement" @submit.prevent="handleSubmit" class="space-y-6">
                  <!-- Role Selection -->
                  <div>
                    <label class="text-base font-semibold mb-4 block text-gray-800">{{ t('roles.selectRole') }}</label>
                    <div class="grid grid-cols-2 gap-3">
                      <button v-for="role in roleOptions" :key="role.id" type="button" @click="updateField('userRole', role.id)" v-motion :hovered="{ scale: 1.02 }" :tapped="{ scale: 0.98 }" :class="['relative p-4 rounded-xl border-2 transition-all duration-200 text-left', formData.userRole === role.id ? 'border-[var(--color-orange-primary)] bg-orange-50' : 'border-gray-200 hover:border-gray-400']">
                        <div class="flex flex-col items-center text-center space-y-2">
                          <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', role.color]"><component :is="role.icon" class="w-5 h-5 text-white" /></div>
                          <div><p class="font-medium text-sm text-gray-800">{{ role.label }}</p><p class="text-xs text-gray-500 mt-1">{{ role.description }}</p></div>
                        </div>
                        <div v-if="formData.userRole === role.id" v-motion-pop class="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-orange-primary)] rounded-full flex items-center justify-center"><div class="w-2 h-2 bg-white rounded-full" /></div>
                      </button>
                    </div>
                  </div>
                  <!-- General Information -->
                  <div class="space-y-4">
                    <label class="text-base font-semibold mb-3 block text-gray-800">{{ t('account.accountType') }}</label>
                    <div class="grid grid-cols-2 gap-3">
                      <button type="button" @click="updateField('accountType', 'individual')" :class="['p-3 rounded-lg border-2 transition-all duration-200 text-center', formData.accountType === 'individual' || !formData.accountType ? 'border-[var(--color-orange-primary)] bg-orange-50' : 'border-gray-200 hover:border-gray-300']"><User class="w-6 h-6 mx-auto mb-1 text-[var(--color-orange-primary)]" /><p class="text-sm font-medium text-gray-800">{{ t('account.individual') }}</p></button>
                      <button type="button" @click="updateField('accountType', 'organization')" :class="['p-3 rounded-lg border-2 transition-all duration-200 text-center', formData.accountType === 'organization' ? 'border-[var(--color-orange-primary)] bg-orange-50' : 'border-gray-200 hover:border-gray-300']"><Building2 class="w-6 h-6 mx-auto mb-1 text-[var(--color-orange-primary)]" /><p class="text-sm font-medium text-gray-800">{{ t('account.organization') }}</p></button>
                    </div>
                    
                    <template v-if="formData.accountType === 'organization'">
                      <div class="space-y-4">
                        <div>
                          <label for="organizationName" class="block text-sm font-medium mb-1.5 text-gray-700">{{ t('fields.organizationName') }}</label>
                          <input id="organizationName" type="text" v-model="formData.organizationName" @blur="touchField('organizationName')" :placeholder="t('fields.organizationNamePlaceholder')" :class="[inputBaseClasses, inputBorderClasses(errors.organizationName)]" />
                          <p v-if="errors.organizationName" class="text-red-500 text-sm mt-1">{{ errors.organizationName }}</p>
                        </div>
                        <div>
                          <label for="googleMapsLink" class="block text-sm font-medium mb-1.5 text-gray-700">{{ t('fields.googleMapsLink') }}</label>
                          <input id="googleMapsLink" type="url" v-model="formData.googleMapsLink" @blur="touchField('googleMapsLink')" :placeholder="t('fields.googleMapsPlaceholder')" :class="[inputBaseClasses, inputBorderClasses(errors.googleMapsLink)]" />
                          <p v-if="errors.googleMapsLink" class="text-red-500 text-sm mt-1">{{ errors.googleMapsLink }}</p>
                        </div>
                        <div>
                          <label for="businessLicense" class="block text-sm font-medium mb-1.5 text-gray-700">{{ t('fields.businessLicense') }}</label>
                          <label class="mt-2 flex items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer transition-colors hover:border-[var(--color-orange-primary)]" :class="[inputBorderClasses(errors.businessLicense)]">
                            <div class="text-center">
                              <Upload class="w-6 h-6 text-gray-400 mx-auto mb-1" />
                              <p class="text-sm text-gray-500">{{ t('fields.uploadLicense') }}</p>
                              <p v-if="formData.businessLicense" class="text-xs text-green-600 mt-1">{{ formData.businessLicense.name }}</p>
                            </div>
                            <input type="file" @change="handleFileUpload" class="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                          </label>
                          <p v-if="errors.businessLicense" class="text-red-500 text-sm mt-1">{{ errors.businessLicense }}</p>
                        </div>
                      </div>
                    </template>
                    
                    <template v-else>
                      <div>
                        <label for="fullName" class="block text-sm font-medium mb-1.5 text-gray-700">{{ t('fields.fullName') }}</label>
                        <input id="fullName" type="text" v-model="formData.fullName" @blur="touchField('fullName')" :placeholder="t('fields.fullNamePlaceholder')" :class="[inputBaseClasses, inputBorderClasses(errors.fullName)]" />
                        <p v-if="errors.fullName" class="text-red-500 text-sm mt-1">{{ errors.fullName }}</p>
                      </div>
                       <div>
                        <label class="block text-sm font-medium mb-1.5 text-gray-700">{{ t('fields.gender') }}</label>
                        <div class="flex flex-row space-x-6 mt-2">
                          <div class="flex items-center space-x-2">
                            <input type="radio" id="male" value="male" v-model="formData.gender" class="h-4 w-4 text-[var(--color-orange-primary)] focus:ring-[var(--color-orange-primary)] border-gray-300" />
                            <label for="male" class="text-sm text-gray-700">{{ t('fields.male') }}</label>
                          </div>
                          <div class="flex items-center space-x-2">
                            <input type="radio" id="female" value="female" v-model="formData.gender" class="h-4 w-4 text-[var(--color-orange-primary)] focus:ring-[var(--color-orange-primary)] border-gray-300" />
                            <label for="female" class="text-sm text-gray-700">{{ t('fields.female') }}</label>
                          </div>
                        </div>
                        <p v-if="errors.gender" class="text-red-500 text-sm mt-1">{{ errors.gender }}</p>
                      </div>
                    </template>
                  </div>
                  <!-- Contact & Security -->
                  <div class="space-y-4">
                     <div>
                        <label for="email" class="block text-sm font-medium mb-1.5 text-gray-700">{{ t('fields.email') }}</label>
                        <input id="email" type="email" v-model="formData.email" @blur="touchField('email')" :placeholder="t('fields.emailPlaceholder')" :class="[inputBaseClasses, inputBorderClasses(errors.email)]" />
                        <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
                     </div>
                      <div>
                        <label for="phoneNumber" class="block text-sm font-medium mb-1.5 text-gray-700">{{ t('fields.phoneNumber') }}</label>
                        <input id="phoneNumber" type="tel" v-model="formData.phoneNumber" @blur="touchField('phoneNumber')" :placeholder="t('fields.phoneNumberPlaceholder')" :class="[inputBaseClasses, inputBorderClasses(errors.phoneNumber)]" />
                        <p v-if="errors.phoneNumber" class="text-red-500 text-sm mt-1">{{ errors.phoneNumber }}</p>
                      </div>
                     <div>
                        <label for="password" class="block text-sm font-medium mb-1.5 text-gray-700">{{ t('fields.password') }}</label>
                        <div class="relative"><input id="password" :type="showPassword ? 'text' : 'password'" v-model="formData.password" @blur="touchField('password')" :placeholder="t('fields.passwordPlaceholder')" :class="['pr-10', inputBaseClasses, inputBorderClasses(errors.password)]" /><button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center"><component :is="showPassword ? EyeOff : Eye" class="h-4 w-4 text-gray-400" /></button></div>
                        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
                     </div>
                      <div>
                        <label for="confirmPassword" class="block text-sm font-medium mb-1.5 text-gray-700">{{ t('fields.confirmPassword') }}</label>
                        <div class="relative"><input id="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" v-model="formData.confirmPassword" @blur="touchField('confirmPassword')" :placeholder="t('fields.confirmPasswordPlaceholder')" :class="['pr-10', inputBaseClasses, inputBorderClasses(errors.confirmPassword)]" /><button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center"><component :is="showConfirmPassword ? EyeOff : Eye" class="h-4 w-4 text-gray-400" /></button></div>
                        <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
                      </div>
                  </div>
                  <!-- Location Section -->
                  <div class="space-y-4">
                    <h3 class="text-base font-semibold text-gray-800">{{ t('location.location') }}</h3>
                    <div>
                      <label for="region" class="block text-sm font-medium mb-1.5 text-gray-700">{{ t('location.region') }}</label>
                      <select id="region" v-model="formData.region" @blur="touchField('region')" :class="[inputBaseClasses, inputBorderClasses(errors.region)]">
                        <option disabled value="">{{ t('location.regionPlaceholder') }}</option>
                        <option v-for="region in ethiopianLocations.regions" :key="region.id" :value="region.id">{{ region.name }}</option>
                      </select>
                      <p v-if="errors.region" class="text-red-500 text-sm mt-1">{{ errors.region }}</p>
                    </div>
                    <template v-if="formData.region === 'addis_ababa'">
                      <div v-if="availableSubcities.length > 0">
                        <label for="subcity" class="block text-sm font-medium mb-1.5 text-gray-700">{{ t('location.subcity') }}</label>
                        <select id="subcity" v-model="formData.subcity" @blur="touchField('subcity')" :class="[inputBaseClasses, inputBorderClasses(errors.subcity)]">
                          <option disabled value="">{{ t('location.subcityPlaceholder') }}</option>
                          <option v-for="subcity in availableSubcities" :key="subcity.id" :value="subcity.id">{{ subcity.name }}</option>
                        </select>
                        <p v-if="errors.subcity" class="text-red-500 text-sm mt-1">{{ errors.subcity }}</p>
                      </div>
                      <div v-if="availableAreas.length > 0">
                        <label for="area" class="block text-sm font-medium mb-1.5 text-gray-700">{{ t('location.area') }}</label>
                        <select id="area" v-model="formData.area" @blur="touchField('area')" :disabled="!formData.subcity" :class="[inputBaseClasses, inputBorderClasses(errors.area)]">
                          <option disabled value="">{{ t('location.areaPlaceholder') }}</option>
                          <option v-for="area in availableAreas" :key="area.id" :value="area.id">{{ area.name }}</option>
                        </select>
                        <p v-if="errors.area" class="text-red-500 text-sm mt-1">{{ errors.area }}</p>
                      </div>
                    </template>
                     <template v-else-if="formData.region">
                        <div v-if="availableCities.length > 0">
                          <label for="city" class="block text-sm font-medium mb-1.5 text-gray-700">{{ t('location.city') }}</label>
                          <select id="city" v-model="formData.city" @blur="touchField('city')" :class="[inputBaseClasses, inputBorderClasses(errors.city)]">
                            <option disabled value="">{{ t('location.cityPlaceholder') }}</option>
                            <option v-for="city in availableCities" :key="city.id" :value="city.id">{{ city.name }}</option>
                          </select>
                          <p v-if="errors.city" class="text-red-500 text-sm mt-1">{{ errors.city }}</p>
                        </div>
                      </template>
                  </div>
                  <!-- Submit Section -->
                  <div class="pt-2">
                    <div class="flex items-start space-x-3 mb-6">
                      <input id="agreeToTerms" type="checkbox" v-model="formData.agreeToTerms" @blur="touchField('agreeToTerms')" class="mt-1 h-4 w-4 rounded border-gray-300 text-[var(--color-orange-primary)] focus:ring-2 focus:ring-[var(--color-orange-primary)] focus:ring-offset-2" />
                      <div>
                        <label for="agreeToTerms" class="text-sm leading-relaxed cursor-pointer text-gray-600">
                          {{ t('terms.agree') }} <a href="#" class="text-[var(--color-orange-primary)] hover:underline">{{ t('terms.termsConditions') }}</a> {{ t('terms.and') }} <a href="#" class="text-[var(--color-orange-primary)] hover:underline">{{ t('terms.privacyPolicy') }}</a>
                        </label>
                        <p v-if="errors.agreeToTerms" class="text-red-500 text-sm mt-1">{{ errors.agreeToTerms }}</p>
                      </div>
                    </div>
                    <button type="submit" :disabled="isSubmitting" class="w-full py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 rounded-lg text-white bg-gradient-to-r from-[var(--color-orange-primary)] to-[var(--color-orange-gradient)] disabled:opacity-60 disabled:cursor-not-allowed">
                      {{ isSubmitting ? t('actions.creatingAccount') : t('actions.createAccount') }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Ethiopic:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root{
    /* Base Colors & Fonts */
    
    --border: rgba(0, 0, 0, 0.0);
   
  }

  /* GLOBAL STYLES */
  html {
    font-size: var(--font-size);
  }

  html, body {
    height: 100%;
    
    margin: 0;
    padding: 0;
  }

  body {
    background-color: var(--background);
    color: var(--foreground);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* AMHARIC FONT STYLES */
  .font-amharic {
    font-family: 'Noto Sans Ethiopic', 'Inter', sans-serif;
    line-height: 1.6;
    letter-spacing: 0.025em;
  }
}
</style>