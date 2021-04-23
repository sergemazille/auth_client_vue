import { Router, createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { AuthService } from '@/application/services/auth/AuthService';

export enum RouteName {
  HOME = 'HOME',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  DASHBOARD = 'DASHBOARD',
}

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
            name: RouteName.LOGIN,
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
