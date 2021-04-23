import App from '@/application/ui/App.vue';
import { AppAuthService } from '@/application/services/auth/AppAuthService';
import { AppRouterService } from '@/application/services/routing/AppRouterService';
import { Store } from 'vuex';
import { createApp } from 'vue';
import { VueRouterFactory } from '@/infrastructure/routing/VueRouterFactory';
import store from '@/infrastructure/persistence/VuexStore';
import { routes } from '@/infrastructure/routing/routes';

const app = createApp(App);
const authService = new AppAuthService(store);
const { router } = new VueRouterFactory(routes, authService);
const routerService = new AppRouterService(router);

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
