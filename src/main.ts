import App from '@/infrastructure/ui/App.vue';
import { AppAuthService } from '@/application/services/auth/AppAuthService';
import { AppRouterService } from '@/application/services/routing/AppRouterService';
import { AuthStore } from '@/infrastructure/persistence/AuthStore';
import { AxiosCaller } from './infrastructure/http/AxiosCaller';
import { Store } from 'vuex';
import { VueRouterFactory } from '@/infrastructure/routing/VueRouterFactory';
import axios from 'axios';
import { createApp } from 'vue';
import { createAppRoutes } from '@/infrastructure/routing/routes';
import { endpoints } from '@/infrastructure/http/endpoints';
import { startFakeApiServer } from '@fixtures/fakeApiServer';
import vuexStore from '@/infrastructure/persistence/vuex/VuexStore';

const app = createApp(App);
const baseURL = process.env.VUE_APP_API_BASE_URL;
const callerInstance = axios.create({ baseURL, withCredentials: true });
const apiCaller = new AxiosCaller(callerInstance, endpoints);
const authStore = new AuthStore(vuexStore);
const authService = new AppAuthService(authStore, apiCaller);
const routes = createAppRoutes(authService);
const { router } = new VueRouterFactory(routes, authService);
const routerService = new AppRouterService(router);

// log user in memory if already authenticated in local storage
if (authService.isAuthenticated) {
  authStore.dispatch('logIn');
}

app.provide('authService', authService);
app.provide('routerService', routerService);

app.use(router);

app.mount('#app');

/* tests config */

declare global {
  interface Window {
    store: Store<any>;
    localStorage: any;
    Cypress: any;
  }
}

// only available during integration tests
if (window.Cypress) {
  window.store = vuexStore;
}

// only available on development mode
const isDevMode = process.env.NODE_ENV === 'development';

if (isDevMode) {
  startFakeApiServer();
}
