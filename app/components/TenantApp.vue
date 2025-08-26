<script setup>
import { ref } from "vue";
import { User, MessageCircle, Bell, Settings } from "lucide-vue-next";

// State
const activeView = ref("messages");
const tenantData = ref({
  name: "Alex",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  verified: true,
});
const unreadMessages = ref(3);

// Helpers
const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");
</script>

<template>
  <div class="min-h-screen bg-[#FDF8F0]">
    <!-- Top Navigation -->
    <div
      class="sticky top-0 z-50 bg-[#FDF8F0]/80 backdrop-blur-lg border-b border-black/5"
    >
      <div class="max-w-2xl mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Avatar class="w-10 h-10 ring-2 ring-green-600/20">
              <AvatarImage
                :src="tenantData.avatar"
                :alt="tenantData.name"
              />
              <AvatarFallback class="bg-green-600/10 text-green-700">
                {{ getInitials(tenantData.name) }}
              </AvatarFallback>
            </Avatar>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-gray-800 font-medium">
                  Hi, {{ tenantData.name }}!
                </span>
                <Badge
                  class="bg-green-100 text-green-700 border-green-200/50 text-xs font-semibold"
                >
                  Verified
                </Badge>
              </div>
              <p class="text-sm text-gray-500">Manage your rental journey</p>
            </div>
          </div>
          <div class="flex items-center gap-1 text-gray-600">
            <!-- STRONGER HOVER EFFECT -->
            <Button
              variant="ghost"
              size="icon"
              class="w-9 h-9 relative hover:bg-amber-600 rounded-full"
            >
              <Bell class="w-5 h-5" />
              <div
                class="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full"
              ></div>
            </Button>
            <!-- STRONGER HOVER EFFECT -->
            <Button
              variant="ghost"
              size="icon"
              class="w-9 h-9 hover:bg-amber-600 rounded-full"
            >
              <Settings class="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-2xl mx-auto">
      <TenantProfile
        v-if="activeView === 'profile'"
        :tenantData="tenantData"
        @navigate="activeView = $event"
      />
      <TenantMessaging
        v-if="activeView === 'messages'"
        :tenantData="tenantData"
        @navigate="activeView = $event"
      />
    </div>

    <!-- Bottom Navigation -->
    <div
      class="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-black/5"
    >
      <div class="max-w-2xl mx-auto px-4 py-2">
        <div class="flex items-center justify-around">
          <Button
            variant="ghost"
            @click="activeView = 'messages'"
            :class="[
              'flex flex-col items-center justify-center gap-1 h-auto py-2 px-8 rounded-xl transition-all',
              activeView === 'messages'
                ? 'bg-green-600 text-white shadow-lg'
                : 'text-gray-500 hover:bg-amber-600',
            ]"
          >
            <div class="relative">
              <MessageCircle class="w-6 h-6" />
              <Badge
                v-if="unreadMessages > 0"
                class="absolute -top-2 -right-3 bg-amber-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full"
              >
                {{ unreadMessages }}
              </Badge>
            </div>
            <span class="text-sm font-medium">Messages</span>
          </Button>
          <Button
            variant="ghost"
            @click="activeView = 'profile'"
            :class="[
              'flex flex-col items-center justify-center gap-1 h-auto py-2 px-8 rounded-xl transition-all',
              activeView === 'profile'
                ? 'bg-green-600 text-white shadow-lg'
                : 'text-gray-500 hover:bg-amber-600',
            ]"
          >
            <User class="w-6 h-6" />
            <span class="text-sm font-medium">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
