import { createApp } from 'vue';
import App from '@/application/views/App.vue';
import router from '@/infrastructure/VueRouter';
import { AppAuthService } from './application/services/AppAuthService';
import store from '@/infrastructure/VuexStore';

const app = createApp(App);
const authService = new AppAuthService(store);

app.provide('authService', authService);

app.use(router);

app.mount('#app');
