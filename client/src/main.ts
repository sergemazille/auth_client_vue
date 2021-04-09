import { createApp } from 'vue';
import App from '@/application/views/App.vue';
import router from '@/infrastructure/VueRouter';

const app = createApp(App);

app.provide('isAuthenticated', true);

app.use(router);

app.mount('#app');
