<template>
  <div class="header-menu">
    <router-link data-selector="home" :to="{ name: routerService.routeName.HOME }">Accueil</router-link>

    <div>
      <router-link :to="{ name: routerService.routeName.DASHBOARD }" data-selector="dashboard-link">Dashboard</router-link>
      <router-link v-if="showRegisterLink" :to="{ name: routerService.routeName.REGISTER }" data-selector="register-link">
        Register
      </router-link>
      <button v-if="isAuthenticated" @click="handleLogOut" data-selector="logout-action">Logout</button>
    </div>
  </div>
</template>

<script lang="ts">
import { AuthService } from '@/application/services/AuthService';
import { RouterService } from '@/application/services/RouterService';
import { RouteName } from '@/infrastructure/routing/VueRouterFactory';
import { defineComponent, inject } from 'vue';

export default defineComponent({
  setup() {
    const authService = inject('authService') as AuthService;
    const routerService = inject('routerService') as RouterService;

    return { authService, routerService };
  },

  computed: {
    isAuthenticated(): boolean {
      return this.authService.isAuthenticated;
    },

    showRegisterLink(): boolean {
      const isOnRegisterPage = this.routerService.currentRouteName === this.routerService.routeName.REGISTER;

      return !isOnRegisterPage && !this.isAuthenticated;
    },
  },

  methods: {
    handleLogOut(): void {
      this.authService.logOut();
      this.routerService.router.push({ name: RouteName.HOME });
    },
  },
});
</script>

<style lang="scss" scoped>
.header-menu {
  display: flex;
  justify-content: space-between;
  height: 24px;

  a:last-of-type,
  button {
    margin-left: 12px;
  }
}
</style>
