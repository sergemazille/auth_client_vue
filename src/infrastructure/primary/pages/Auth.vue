<template>
  <h1 v-text="pageTitle" />
  <AuthForm @form-submitted="handleFormSubmission" />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import AuthForm from '@/infrastructure/primary/components/AuthForm.vue';
import { RouterService } from '@/application/services/RouterService';
import { AuthService } from '@/application/services/AuthService';
import { Credentials } from '@/application/models/Credentials';

export default defineComponent({
  setup() {
    const authService = inject('authService') as AuthService;
    const routerService = inject('routerService') as RouterService;

    return { authService, routerService };
  },

  components: {
    AuthForm,
  },

  computed: {
    currentRouteName(): string {
      return this.routerService.currentRouteName;
    },

    pageTitle(): string {
      return this.currentRouteName.toUpperCase();
    },
  },

  methods: {
    async handleFormSubmission(credentials: Credentials): Promise<void> {
      if (this.currentRouteName === this.routerService.routeNames.LOGIN) {
        await this.logUserIn(credentials);
      } else {
        await this.registerUser(credentials);
      }

      this.redirect();
    },

    async logUserIn(credentials: Credentials): Promise<void> {
      await this.authService.logIn(credentials);
    },

    async registerUser(credentials: Credentials): Promise<void> {
      await this.authService.register(credentials);
    },

    redirect() {
      if (!this.authService.isAuthenticated) {
        return;
      }

      const { router } = this.routerService;
      const currentRoute = router.currentRoute.value;
      const redirectPath = currentRoute.query.redirect as string;
      const route = redirectPath || '/';

      router.push(route);
    },
  },
});
</script>
