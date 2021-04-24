import App from '@/infrastructure/ui/App.vue';
import { AppAuthService } from '@/application/services/auth/AppAuthService';
import { AppRouterService } from '@/application/services/routing/AppRouterService';
import { AxiosCaller } from './infrastructure/http/AxiosCaller';
import { Store } from 'vuex';
import { VueRouterFactory } from '@/infrastructure/routing/VueRouterFactory';
import axios from 'axios';
import { createApp } from 'vue';
import { endpoints } from '@/infrastructure/http/endpoints';
import { createAppRoutes } from '@/infrastructure/routing/routes';
import { startFakeApiServer } from './infrastructure/fixtures/fakeApiServer';
import store from '@/infrastructure/persistence/VuexStore';

const app = createApp(App);
const baseURL = process.env.VUE_APP_API_BASE_URL;
const callerInstance = axios.create({ baseURL, withCredentials: true });
const apiCaller = new AxiosCaller(callerInstance, endpoints);
const authService = new AppAuthService(store, apiCaller);
const routes = createAppRoutes(authService);
const { router } = new VueRouterFactory(routes, authService);
const routerService = new AppRouterService(router);

// log user in memory if already authenticated in local storage
if (authService.isAuthenticated) {
  store.dispatch('auth/logIn');
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

// only available during E2E tests
if (window.Cypress) {
  window.store = store;
}

// only available on development mode
const isDevMode = process.env.NODE_ENV === 'development';

if (isDevMode) {
  startFakeApiServer();
}
