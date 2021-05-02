<template>
  <Notification v-bind="defaultProps" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Notification from '@/infrastructure/primary/components/Notification.vue';
import { NotificationType } from '@/application/models/notification/NotificationType';

export default defineComponent({
  components: {
    Notification,
  },

  data() {
    return {
      defaultProps: {
        type: NotificationType.error,
        message: 'Une erreur est survenue.',
      },
    };
  },
});
</script>
