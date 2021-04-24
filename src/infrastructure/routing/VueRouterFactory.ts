import { RouteRecordRaw, Router, createRouter, createWebHistory } from 'vue-router';
import { AuthService } from '@/application/services/auth/AuthService';
import { routeNames } from '@/infrastructure/routing/routeNames';

export class VueRouterFactory {
  constructor(private readonly routes: Array<RouteRecordRaw>, private readonly authService: AuthService) {}

  get router(): Router {
    const { routes } = this;

    const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes,
    });

    router.beforeEach((to, _from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if user is authenticated
        // if not, redirect to login page.
        if (!this.authService.isAuthenticated) {
          next({
            name: routeNames.LOGIN,
            query: { redirect: to.fullPath },
          });
        } else {
          next();
        }
      } else {
        next();
      }
    });

    return router;
  }
}
