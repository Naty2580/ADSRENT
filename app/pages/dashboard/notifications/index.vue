<script setup>
import '~/types/api.js';
import { useNotificationStore } from '~/stores/notifications';

definePageMeta({ layout: 'dashboard', middleware: 'authed' });
 
const notificationStore = useNotificationStore();

const { data: notifications, pending } = await useAsyncData('notifications-list', () => {
    return useNuxtApp().$api.get('/notifications');
});
 
// When the user visits this page, mark the notifications as read
onMounted(() => {
    if (notificationStore.unreadCount > 0) { 
        notificationStore.markAsRead(); 
    }
}); 
</script>

<template>
  <div> 
    <h1 class="font-display text-3xl font-bold">Notifications</h1>
    <p class="mt-2 text-muted-foreground">All your received messages and system updates.</p>

    <div class="mt-8 bg-card rounded-lg border">
        <div v-if="pending">Loading...</div>
        <div v-else-if="!notifications?.data?.length" class="p-12 text-center text-muted-foreground">
            You have no notifications.
        </div>
        <ul v-else>
          <li v-for="notif in notifications.data" :key="notif.id" class="p-4 border-b last:border-b-0" :class="{'bg-primary/5': !notif.read_at}">
              <p class="font-medium text-foreground">{{ notif.sender.name }} sent you a message</p>
              <p class="mt-1 text-sm bg-secondary p-3 rounded-md italic">"{{ notif.body }}"</p>
              <p class="mt-2 text-xs text-muted-foreground">{{ new Date(notif.created_at).toLocaleString() }}</p>
          </li>
        </ul>
    </div>
  </div>
</template>