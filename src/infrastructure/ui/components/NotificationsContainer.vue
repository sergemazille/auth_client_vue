<template>
  <div>
    <NotificationComponent v-for="notification in notifications" :key="notification.message" v-bind="notification" />
  </div>
</template>

<script lang="ts">
import { NotificationsService } from '@/application/services/notifications/NotificationsService';
import { defineComponent, inject } from 'vue';
import NotificationComponent from '@/infrastructure/ui/components/Notification.vue';
import { Notification } from '@/application/models/notification/Notification';

export default defineComponent({
  setup() {
    const notificationsService = inject('notificationsService') as NotificationsService;

    return { notificationsService };
  },

  components: {
    NotificationComponent,
  },

  computed: {
    notifications(): Array<Notification> {
      return this.notificationsService.notifications;
    },
  },
});
</script>
