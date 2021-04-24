<template>
  <div class="header-menu">
    <router-link data-selector="home" :to="{ name: routerService.routeNames.HOME }">Accueil</router-link>

    <div>
      <router-link v-if="showDashboardLink" :to="{ name: routerService.routeNames.DASHBOARD }" data-selector="dashboard-link">
        Dashboard
      </router-link>
      <router-link v-if="showRegisterLink" :to="{ name: routerService.routeNames.REGISTER }" data-selector="register-link">
        Register
      </router-link>
      <button v-if="isAuthenticated" @click="handleLogOut" data-selector="logout-action">Logout</button>
    </div>
  </div>
</template>

<script lang="ts">
import { AuthService } from '@/application/services/auth/AuthService';
import { RouterService } from '@/application/services/routing/RouterService';
import { routeNames } from '@/infrastructure/routing/routeNames';
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
      const isOnRegisterPage = this.routerService.currentRouteName === this.routerService.routeNames.REGISTER;

      return !isOnRegisterPage && !this.isAuthenticated;
    },

    showDashboardLink(): boolean {
      const isOnDashboardPage = this.routerService.currentRouteName === this.routerService.routeNames.DASHBOARD;

      return !isOnDashboardPage;
    },
  },

  methods: {
    handleLogOut(): void {
      this.authService.logOut();
      this.routerService.router.push({ name: routeNames.HOME });
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
