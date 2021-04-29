<template>
  <div class="notification" :class="type" v-text="message" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.notification {
  color: whitesmoke;
  font-size: 1rem;
  padding: 12px;

  &.error {
    background-color: crimson;
  }

  &.success {
    background-color: green;
  }

  &.warning {
    background-color: rgb(230, 134, 9);
  }
}
</style>
