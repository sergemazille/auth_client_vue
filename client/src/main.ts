import App from '@/application/views/App.vue';
import { AppAuthService } from './application/services/AppAuthService';
import { AppRouterService } from './application/services/AppRouterService';
import { createApp } from 'vue';
import router from '@/infrastructure/VueRouter';
import store from '@/infrastructure/VuexStore';

const app = createApp(App);
const authService = new AppAuthService(store);
const routerService = new AppRouterService(router);

app.provide('authService', authService);
app.provide('routerService', routerService);

app.use(router);

app.mount('#app');
