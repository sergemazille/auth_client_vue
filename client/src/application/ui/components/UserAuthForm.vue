<template>
  <form @submit.prevent="handleFormSubmission">
    <input type="email" placeholder="email" v-model="email" />
    <input type="password" placeholder="password" v-model="password" />
    <button :disabled="!canSubmitForm">Valider</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Email } from '@/application/models/Email';
import { Password } from '@/application/models/Password';

export default defineComponent({
  data() {
    return {
      email: '',
      password: '',
    };
  },

  computed: {
    canSubmitForm(): boolean {
      const { isValidEmail, isValidPassword, email, password } = this;

      return isValidEmail(email) && isValidPassword(password);
    },
  },

  methods: {
    isValidEmail(email: string): boolean {
      return Email.isValid(email);
    },

    isValidPassword(password: string): boolean {
      return password.length >= Password.MIN_LENGTH;
    },

    handleFormSubmission() {
      if (!this.canSubmitForm) return;

      const { email, password } = this;
      const credentials = { email, password };

      this.$emit('form-submitted', credentials);
    },
  },
});
</script>
