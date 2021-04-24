<template>
  <HeaderMenu />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderMenu from '@/infrastructure/ui/components/HeaderMenu.vue';

export default defineComponent({
  components: {
    HeaderMenu,
  },
});
</script>
