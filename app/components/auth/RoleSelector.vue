<script setup>
import { Home, Search, Building2, TrendingUp } from 'lucide-vue-next';

defineProps({
    modelValue: String,
});
const emit = defineEmits(['update:modelValue']);

const roleOptions = [
{ id: 'tenant', label: "I'm a Tenant", icon: Home, description: 'Looking for a place to rent' },
    { id: 'buyer', label: "I'm a Buyer", icon: Search, description: 'Looking to purchase a property' },
    { id: 'lessor', label: "I'm a Lessor", icon: Building2, description: 'I have properties to rent' },
    { id: 'seller', label: "I'm a Seller", icon: TrendingUp, description: 'I have properties to sell' },
];
</script>

<template>
  <div class="space-y-4">
     <h3 class="text-center font-semibold text-foreground">Select Your Role</h3>
     <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button 
            v-for="role in roleOptions" 
            :key="role.id" 
            type="button"
            @click="emit('update:modelValue', role.id)"
            :class="[
                'relative p-4 rounded-lg border-2 text-left transition-all',
                 modelValue === role.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
            ]">
            <div class="flex items-center space-x-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <component :is="role.icon" class="h-6 w-6 text-primary" />
                </div>
                <div>
                    <p class="font-semibold text-foreground">{{ role.label }}</p>
                    <p class="text-sm text-muted-foreground">{{ role.description }}</p>
                </div>
            </div>
            <div v-if="modelValue === role.id" class="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
        </button>
     </div>
  </div>
</template>