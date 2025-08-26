<script setup>
import { DropdownMenuRoot, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from 'radix-vue';
import { LayoutDashboard, User, StarIcon, LogOut, Building2 } from 'lucide-vue-next';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const isLessor = computed(() => authStore.isLessor);

</script>

<template>
  <div v-if="user">
    <DropdownMenuRoot>
      <DropdownMenuTrigger as-child>
        <button class="relative h-9 w-9 flex-shrink-0 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <img :src="`https://ui-avatars.com/api/?name=${user.name}&background=random`" 
                 alt="User avatar" 
                 class="h-full w-full rounded-full object-cover" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56" align="end">
        <DropdownMenuLabel>
            <div class="flex flex-col space-y-1">
              <p class="text-sm font-medium leading-none">{{ user.name }}</p>
              <p class="text-xs leading-none text-muted-foreground">{{ user.email }}</p>
            </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <NuxtLink to="/dashboard">
              <DropdownMenuItem class="cursor-pointer">
                <LayoutDashboard class="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
          </NuxtLink>
           <NuxtLink to="/dashboard/profile">
              <DropdownMenuItem class="cursor-pointer">
                <User class="mr-2 h-4 w-4" />
                <span>Account Management</span>
              </DropdownMenuItem>
          </NuxtLink>
           <NuxtLink to="/dashboard/favorites">
              <DropdownMenuItem class="cursor-pointer">
                <StarIcon class="mr-2 h-4 w-4" />
                <span>Favorite Properties</span>
              </DropdownMenuItem>
          </NuxtLink>
          
           <!-- Lessor-specific link -->
           <NuxtLink v-if="isLessor" to="/dashboard/lessor/listings">
              <DropdownMenuItem class="cursor-pointer">
                <Building2 class="mr-2 h-4 w-4" />
                <span>Lessor Dashboard</span>
              </DropdownMenuItem>
          </NuxtLink>

        </DropdownMenuGroup>
        <DropdownMenuSeparator />
         <DropdownMenuItem @click="authStore.logout" class="cursor-pointer">
            <LogOut class="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  </div>
</template>