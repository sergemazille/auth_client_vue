import { RouteRecordRaw, Router, createRouter, createWebHistory } from 'vue-router';

import Auth from '@/application/ui/pages/Auth.vue';
import { AuthService } from '@/application/services/AuthService';
import Dashboard from '@/application/ui/pages/Dashboard.vue';
import Home from '@/application/ui/pages/Home.vue';

export enum RouteName {
  HOME = 'HOME',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  DASHBOARD = 'DASHBOARD',
}

export class VueRouterFactory {
  private readonly routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: RouteName.HOME,
      component: Home,
    },
    {
      path: '/login',
      name: RouteName.LOGIN,
      component: Auth,
    },
    {
      path: '/register',
      name: RouteName.REGISTER,
      component: Auth,
    },
    {
      path: '/dashboard',
      name: RouteName.DASHBOARD,
      component: Dashboard,
      meta: { requiresAuth: true },
    },
  ];

  constructor(private readonly authService: AuthService) {}

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
