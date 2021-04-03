<template>
  <form @submit.prevent="handleFormSubmission">
    <div class="title" v-text="title" />
    <input type="email" placeholder="email" v-model="email" />
    <input type="password" placeholder="password" v-model="password" />
    <button :disabled="!canSubmitForm">Valider</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      email: '',
      password: '',
    };
  },

  computed: {
    canSubmitForm(): boolean {
      return !!this.email && !!this.password;
    },
  },

  methods: {
    handleFormSubmission() {
      if (!this.canSubmitForm) return;

      const { email, password } = this;
      const credentials = { email, password };

      this.$emit('form-submitted', credentials);
    },
  },
});
</script>

<style lang="scss" scoped></style>
