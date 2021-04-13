<template>
  <h1 v-text="pageTitle" />
  <UserAuthForm @form-submitted="handleFormSubmission" />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import UserAuthForm from '@/application/ui/components/UserAuthForm.vue';
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
    UserAuthForm,
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
    handleFormSubmission(credentials: Credentials): void {
      if (this.currentRouteName === this.routerService.routeName.LOGIN) {
        this.logUserIn(credentials);
      } else {
        this.registerUser(credentials);
      }

      this.redirect();
    },

    logUserIn(credentials: Credentials): void {
      this.authService.logIn(credentials);
    },

    registerUser(credentials: Credentials): void {
      this.authService.register(credentials);
    },

    redirect() {
      const { router } = this.routerService;
      const currentRoute = router.currentRoute.value;
      const redirectPath = currentRoute.query.redirect as string;
      const route = redirectPath || '/';

      router.push(route);
    },
  },
});
</script>
