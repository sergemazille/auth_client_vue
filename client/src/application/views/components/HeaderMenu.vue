<template>
  <div class="header-menu">
    <router-link data-selector="home" :to="{ name: 'home' }">Accueil</router-link>

    <div v-if="!isAuthenticated">
      <router-link :to="{ name: 'login' }" data-selector="login-link">Login</router-link>
      <router-link :to="{ name: 'register' }" data-selector="register-link">Register</router-link>
    </div>
    <button v-else data-selector="logout-action">Logout</button>
  </div>
</template>

<script lang="ts">
import { AuthService } from '@/application/services/AuthService';
import { defineComponent, inject } from 'vue';

export default defineComponent({
  setup() {
    const authService = inject('authService') as AuthService;

    return { authService };
  },

  computed: {
    isAuthenticated(): boolean {
      return this.authService.isAuthenticated;
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
