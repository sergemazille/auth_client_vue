import App from '@/application/ui/App.vue';
import { AppAuthService } from '@/application/services/AppAuthService';
import { AppRouterService } from '@/application/services/AppRouterService';
import { Store } from 'vuex';
import { createApp } from 'vue';
import { VueRouterFactory } from '@/infrastructure/routing/VueRouterFactory';
import store from '@/infrastructure/persistence/VuexStore';

const app = createApp(App);
const authService = new AppAuthService(store);
const { router } = new VueRouterFactory(authService);
const routerService = new AppRouterService(router);

app.provide('authService', authService);
app.provide('routerService', routerService);

app.use(router);

app.mount('#app');

/* e2e testing */

declare global {
  interface Window {
    store: Store<any>;
    Cypress: any;
  }
}

// only available during E2E tests
if (window.Cypress) {
  window.store = store;
}
