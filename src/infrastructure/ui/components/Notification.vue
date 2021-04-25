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
    background-color: brown;
  }
}
</style>
