<script setup>
import { DropdownMenuRoot, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from 'radix-vue';
import { LayoutDashboard, User, StarIcon, LogOut, Building2 } from 'lucide-vue-next';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const isLessor = computed(() => authStore.isLessor);

</script>

<template>
  <div v-if="user" class="flex items-center space-x-3 w-12  shadow-lg   p-4 rounded-lg" >
    <DropdownMenuRoot class="shadow-lg bg-transparent">
      <DropdownMenuTrigger as-child>
        <button class="relative bg-transparent h-9 w-9 flex-shrink-0 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <img :src="`https://ui-avatars.com/api/?name=${user.name}&background=random`" 
                 alt="User avatar" 
                 class="h-full w-full  rounded-full object-cover" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-72 bg-white/90 backdrop-blur-xl dark:bg-gray-800 p-2  space-y-3" align="end"> 
        <DropdownMenuLabel>
            <div class="flex flex-col space-y-1">
              <p class="text-sm font-medium leading-none">{{ user.name }}</p>
              <p class="text-xs leading-none text-muted-foreground">{{ user.email }}</p>
            </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <NuxtLink to="/dashboard">
              <DropdownMenuItem class="cursor-pointer border-b-2 hover:border-orange-300 border-r-8 border-transparent hover:bg-orange-50 ">
                <LayoutDashboard class="mr-2 h-4 w-4 text-orange-500 " />
                <span>Dashboard</span>
              </DropdownMenuItem>
          </NuxtLink>
           <NuxtLink to="/dashboard/profile">
              <DropdownMenuItem class="cursor-pointer border-b-2 hover:border-orange-300 border-r-8  border-transparent hover:bg-orange-50">
                <User class="mr-2 h-4 w-4 text-orange-500 " />
                <span>Account Management</span>
              </DropdownMenuItem>
          </NuxtLink>
           <NuxtLink to="/dashboard/favorites"> 
              <DropdownMenuItem class="cursor-pointer border-b-2 hover:border-orange-300 border-r-8  border-transparent hover:bg-orange-50">
                <StarIcon class="mr-2 h-4 w-4 text-orange-500 " />
                <span>Favorite Properties</span>
              </DropdownMenuItem>
          </NuxtLink>
          
           <!-- Lessor-specific link -->
           <NuxtLink v-if="isLessor" to="/dashboard/lessor/listings">
              <DropdownMenuItem class="cursor-pointer border-b-2 hover:border-orange-300 border-r-8  border-transparent hover:bg-orange-50">
                <Building2 class="mr-2 h-4 w-4 text-orange-500 " />
                <span>Lessor Dashboard</span>
              </DropdownMenuItem>
          </NuxtLink>

        </DropdownMenuGroup>
        <DropdownMenuSeparator />
         <DropdownMenuItem @click="authStore.logout" class="text-center border-r-8 cursor-pointer hover:bg-orange-300 border-2 border-transparent hover:border-black ">
            <LogOut class="mr-2 h-4 w-4 text-orange-300 hover:text-black " />
            <span class=" w-full mx-auto item-center">Log out</span>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  </div>
</template>