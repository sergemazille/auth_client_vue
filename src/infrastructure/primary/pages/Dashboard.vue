<template>
  <h1>Dashboard</h1>
  <p>Accès autorisé uniquement à un utilisateur authentifié</p>
  <p><em v-text="apiMessage" /></p>
</template>

<script lang="ts">
import { CallerService } from '@/application/services/CallerService';
import { NotificationsService } from '@/application/services/NotificationsService';
import { defineComponent, inject } from 'vue';
import { Notification } from '@/application/models/notification/Notification';
import { NotificationType } from '@/application/models/notification/NotificationType';

export default defineComponent({
  setup() {
    const apiCaller = inject('apiCaller') as CallerService;
    const notificationsService = inject('notificationsService') as NotificationsService;

    return {
      apiCaller,
      notificationsService,
    };
  },

  data() {
    return {
      apiMessage: '',
    };
  },

  methods: {
    getContent(): void {
      const { caller, endpoints } = this.apiCaller;

      caller
        .get(endpoints.AUTH_CONTENT)
        .then(({ data: { message } }) => {
          this.apiMessage = message;
        })
        .catch(error => {
          const type = NotificationType.error;
          const notification = Notification.fromScalar(type, error.message);

          this.notificationsService.publish(notification);
        });
    },
  },

  created() {
    this.getContent();
  },
});
</script>
