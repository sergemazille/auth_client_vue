<template>
  <div class="header-menu">
    <router-link data-selector="home" :to="{ name: routerService.routeName.HOME }">Accueil</router-link>

    <div v-if="!isAuthenticated">
      <router-link :to="{ name: routerService.routeName.LOGIN }" data-selector="login-link">Login</router-link>
      <router-link :to="{ name: routerService.routeName.REGISTER }" data-selector="register-link">Register</router-link>
    </div>
    <button v-else @click="handleLogOut" data-selector="logout-action">Logout</button>
  </div>
</template>

<script lang="ts">
import { AuthService } from '@/application/services/AuthService';
import { RouterService } from '@/application/services/RouterService';
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
  },

  methods: {
    handleLogOut(): void {
      this.authService.logOut();
    },
  },
});
</script>

<style lang="scss" scoped>
.header-menu {
  display: flex;
  justify-content: space-between;

  a:last-of-type {
    margin-left: 12px;
  }
}
</style>
