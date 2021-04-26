<template>
  <Notification v-bind="defaultProps" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Notification from '@/infrastructure/ui/components/Notification.vue';

export default defineComponent({
  components: {
    Notification,
  },

  data() {
    return {
      defaultProps: {
        type: 'error',
        message: 'Une erreur est survenue.',
      },
    };
  },
});
</script>
