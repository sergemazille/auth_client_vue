<template>
  <div>
    <Notification />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Notification from './components/Notification.vue';

export default defineComponent({
  components: {
    Notification,
  },
});
</script>
