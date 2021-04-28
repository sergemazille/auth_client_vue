import App from '@/infrastructure/ui/App.vue';
import { AuthUsingApi } from '@/infrastructure/AuthUsingApi';
import { AxiosCaller } from './infrastructure/http/AxiosCaller';
import { NotificationsUsingStore } from '@/infrastructure/NotificationsUsingStore';
import { RouterUsingVueRouter } from '@/infrastructure/routing/RouterUsingVueRouter';
import { Store } from 'vuex';
import { StoreAuth } from './infrastructure/persistence/vuex/modules/Auth';
import { StoreNotifications } from '@/infrastructure/persistence/vuex/modules/Notifications';
import { StoreUsingVuex } from '@/infrastructure/persistence/StoreUsingVuex';
import { VueRouterFactory } from '@/infrastructure/routing/VueRouterFactory';
import axios from 'axios';
import { createApp } from 'vue';
import { createAppRoutes } from '@/infrastructure/routing/routes';
import { endpoints } from '@/infrastructure/http/endpoints';
import { startFakeApiServer } from '@fixtures/fakeApiServer';
import vuexStore from '@/infrastructure/persistence/vuex/VuexStore';

const app = createApp(App);
const baseURL = process.env.VUE_APP_API_BASE_URL;
const notificationTimeToLiveInMs = process.env.VUE_APP_NOTIFICATION_TTL_IN_MS;
const axiosInstance = axios.create({ baseURL, withCredentials: true });
const apiCaller = new AxiosCaller(axiosInstance, endpoints);
const notificationsStore = new StoreUsingVuex<StoreNotifications>(vuexStore, 'notifications');
const notificationsService = new NotificationsUsingStore(notificationsStore, notificationTimeToLiveInMs);
const authStore = new StoreUsingVuex<StoreAuth>(vuexStore, 'auth');
const authService = new AuthUsingApi(authStore, apiCaller, notificationsService);
const routes = createAppRoutes(authService);
const { router } = new VueRouterFactory(routes, authService);
const routerService = new RouterUsingVueRouter(router);

// log user in memory if already authenticated in local storage
if (authService.isAuthenticated) {
  authStore.dispatch('logIn');
}

app.provide('authService', authService);
app.provide('routerService', routerService);
app.provide('notificationsService', notificationsService);

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
