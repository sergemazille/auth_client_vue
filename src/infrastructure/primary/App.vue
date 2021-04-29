<template>
  <Notifications />
  <HeaderMenu />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderMenu from '@/infrastructure/primary/components/HeaderMenu.vue';
import Notifications from '@/infrastructure/primary/components/NotificationsContainer.vue';

export default defineComponent({
  components: {
    HeaderMenu,
    Notifications,
  },
});
</script>
