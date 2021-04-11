<template>
  <h1 v-text="pageTitle" />
  <UserAuthForm />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import UserAuthForm from '@/application/views/components/UserAuthForm.vue';
import { RouterService } from '@/application/services/RouterService';

export default defineComponent({
  setup() {
    const routerService = inject('routerService') as RouterService;

    return { routerService };
  },

  components: {
    UserAuthForm,
  },

  computed: {
    routeName(): string {
      return this.routerService.currentRouteName;
    },

    pageTitle(): string {
      return this.routeName.toUpperCase();
    },
  },
});
</script>

<style lang="scss" scoped></style>
