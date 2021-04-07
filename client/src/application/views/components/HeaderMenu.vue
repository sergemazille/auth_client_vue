<template>
  <div class="header-menu">
    <router-link data-selector="home" :to="{ name: 'home' }">Accueil</router-link>

    <div>
      <router-link :to="{ name: 'login' }">Login</router-link>
      <router-link :to="{ name: 'register' }">Register</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
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
