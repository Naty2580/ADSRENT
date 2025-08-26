<script setup lang="ts">
import { ref, computed } from "vue";
import { Search, UserCheck, ArrowLeft, Paperclip, Send } from "lucide-vue-next";

// --- TypeScript Interfaces ---
interface TenantData {
  name: string;
}
interface Conversation {
  id: string;
  leasorName: string;
  leasorAvatar: string;
  propertyTitle: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  verified: boolean;
}
interface Message {
  id: string;
  isMine: boolean;
  content: string;
  timestamp: string;
}

// --- Props and Emits ---
defineProps<{ tenantData: TenantData }>();
defineEmits<{ (e: "navigate", view: "profile" | "messages"): void }>();

// --- State and Data (This part is restored) ---
const currentView = ref<"list" | "chat">("list");
const activeConversation = ref<Conversation | null>(null);
const messageInput = ref("");
const sampleConversations: Conversation[] = [
  {
    id: "1",
    leasorName: "Sarah Wilson",
    leasorAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    propertyTitle: "Modern 2BR Apartment in Bole",
    lastMessage: "Great! I'll prepare the lease agreement for you to review.",
    timestamp: "2m ago",
    unreadCount: 2,
    isOnline: true,
    verified: true,
  },
  {
    id: "2",
    leasorName: "Michael Chen",
    leasorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    propertyTitle: "Luxury Studio in Kazanchis",
    lastMessage: "The documents look good. When would you like a viewing?",
    timestamp: "1h ago",
    unreadCount: 0,
    isOnline: false,
    verified: true,
  },
  {
    id: "3",
    leasorName: "Emma Davis",
    leasorAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    propertyTitle: "Pet-Friendly 3BR House",
    lastMessage: "Thank you for sharing your ID. I'll get back to you soon.",
    timestamp: "3h ago",
    unreadCount: 1,
    isOnline: true,
    verified: true,
  },
  {
    id: "4",
    leasorName: "David Kim",
    leasorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    propertyTitle: "Spacious 1BR Near CMC",
    lastMessage: "I have some similar properties you might like. Let me know!",
    timestamp: "1d ago",
    unreadCount: 0,
    isOnline: false,
    verified: true,
  },
];
const sampleMessages: Message[] = [
  {
    id: "1",
    isMine: false,
    content:
      "Hi Alex! I saw your interest in my 2BR apartment in Bole. Would you like to schedule a viewing?",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    isMine: true,
    content:
      "Hi Sarah! Yes, I'm very interested. The apartment looks perfect for my needs. Could we arrange a viewing this week?",
    timestamp: "10:45 AM",
  },
  {
    id: "3",
    isMine: false,
    content:
      "Absolutely! I'm available Thursday or Friday afternoon. Also, could you please share your ID and proof of income for the application?",
    timestamp: "10:47 AM",
  },
];
const searchQuery = ref("");
const filteredConversations = computed(() =>
  sampleConversations.filter((conv) =>
    conv.leasorName.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);
const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");
const handleConversationSelect = (conversation: Conversation) => {
  activeConversation.value = conversation;
  currentView.value = "chat";
};
const handleSendMessage = () => {
  if (!messageInput.value.trim()) return;
  sampleMessages.push({
    id: Date.now().toString(),
    isMine: true,
    content: messageInput.value,
    timestamp: "Now",
  });
  messageInput.value = "";
};
</script>

<template>
  <!-- CONVERSATION LIST VIEW (RESTORED) -->
  <div v-if="currentView === 'list'" class="p-4 pb-24">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-green-800 mb-1">Messages</h1>
      <p class="text-gray-500">
        Chat with property leasors and manage your rental communications
      </p>
    </div>
    <div class="mb-8 relative">
      <Search
        class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
      /><Input
        placeholder="Search conversations..."
        v-model="searchQuery"
        class="pl-11 h-12 text-base bg-white shadow-sm border-transparent rounded-xl focus:border-green-500 focus:ring-green-500"
      />
    </div>
    <div class="space-y-4">
      <div
        v-for="conversation in filteredConversations"
        :key="conversation.id"
        class="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-4 cursor-pointer"
        @click="handleConversationSelect(conversation)"
      >
        <div class="flex items-start gap-4">
          <div class="relative flex-shrink-0">
            <Avatar class="w-14 h-14"
              ><AvatarImage :src="conversation.leasorAvatar" /><AvatarFallback
                class="bg-green-600/10 text-green-700 font-semibold"
                >{{ getInitials(conversation.leasorName) }}</AvatarFallback
              ></Avatar
            >
            <div
              v-if="conversation.isOnline"
              class="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
            ></div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center gap-2">
                <span class="font-semibold text-gray-800 truncate">{{
                  conversation.leasorName
                }}</span
                ><Badge
                  v-if="conversation.verified"
                  variant="outline"
                  class="border-green-200/80 bg-green-50 text-green-700 p-1"
                  ><UserCheck class="w-3 h-3"
                /></Badge>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-400 whitespace-nowrap">{{
                  conversation.timestamp
                }}</span>
                <Badge
                  v-if="conversation.unreadCount > 0"
                  class="bg-amber-500 text-white text-xs font-bold min-w-[20px] h-5 flex items-center justify-center rounded-full shadow"
                  >{{ conversation.unreadCount }}</Badge
                >
              </div>
            </div>
            <p class="text-sm text-gray-500 mb-1.5 truncate">
              {{ conversation.propertyTitle }}
            </p>
            <p class="text-sm text-gray-700 truncate leading-snug">
              {{ conversation.lastMessage }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- DETAILED CHAT VIEW (RESTORED) -->
  <div v-else-if="currentView === 'chat' && activeConversation" class="pb-24">
    <div class="p-4 space-y-6 pt-6">
      <div
        v-for="message in sampleMessages"
        :key="message.id"
        :class="[
          'flex items-end gap-2',
          message.isMine ? 'justify-end' : 'justify-start',
        ]"
      >
        <Avatar v-if="!message.isMine" class="w-8 h-8 flex-shrink-0"
          ><AvatarImage :src="activeConversation.leasorAvatar" /><AvatarFallback
            class="bg-gray-200 text-xs"
            >{{ getInitials(activeConversation.leasorName) }}</AvatarFallback
          ></Avatar
        >
        <div
          :class="[
            'max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm',
            message.isMine
              ? 'bg-green-700 text-white rounded-br-none'
              : 'bg-white text-gray-800 rounded-bl-none',
          ]"
        >
          <p class="text-sm">{{ message.content }}</p>
        </div>
      </div>
    </div>

    <!-- Message Input Area (WITH HOVER EFFECTS ADDED) -->
    <div
      class="fixed bottom-[85px] left-0 right-0 z-10 bg-gradient-to-t from-[#FDF8F0] via-[#FDF8F0] to-transparent pt-8"
    >
      <div class="max-w-2xl mx-auto px-4">
        <div class="flex items-center gap-2 p-2 bg-white rounded-2xl shadow-lg">
          <!-- ADDED HOVER EFFECT -->
          <Button
            variant="ghost"
            size="icon"
            class="text-gray-500 rounded-full hover:bg-amber-200 hover:text-amber-800"
          >
            <Paperclip class="w-5 h-5" />
          </Button>
          <Input
            v-model="messageInput"
            @keypress.enter.prevent="handleSendMessage"
            placeholder="Type a message..."
            class="flex-1 bg-transparent border-none focus:ring-0 h-auto py-2 text-base"
          />
          <Button
            @click="handleSendMessage"
            size="icon"
            class="w-10 h-10 bg-green-600 text-white rounded-full flex-shrink-0 shadow-md hover:bg-green-700"
            ><Send class="w-5 h-5"
          /></Button>
        </div>
        <div class="flex gap-2 justify-center mt-3">
          <!-- ADDED HOVER EFFECT -->
          <Button
            variant="outline"
            class="rounded-full text-xs h-8 bg-white/70 backdrop-blur-sm border-gray-300 hover:bg-amber-500 hover:border-amber-600"
            >Share Documents</Button
          >
          <!-- ADDED HOVER EFFECT -->
          <Button
            variant="outline"
            class="rounded-full text-xs h-8 bg-white/70 backdrop-blur-sm border-gray-300 hover:bg-amber-500 hover:border-amber-600"
            >Schedule Viewing</Button
          >
          <!-- ADDED HOVER EFFECT -->
          <Button
            variant="outline"
            class="rounded-full text-xs h-8 bg-white/70 backdrop-blur-sm border-gray-300 hover:bg-amber-500 hover:border-amber-600"
            >Request Info</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>
