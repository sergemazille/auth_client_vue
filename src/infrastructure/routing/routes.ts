import { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import Auth from '@/infrastructure/ui/pages/Auth.vue';
import Dashboard from '@/infrastructure/ui/pages/Dashboard.vue';
import Home from '@/infrastructure/ui/pages/Home.vue';
import { routeNames } from '@/infrastructure/routing/routeNames';
import { AuthService } from '@/application/services/AuthService';

export const createAppRoutes = (authService: AuthService): Array<RouteRecordRaw> => {
  const routes = [
    {
      path: '/',
      name: routeNames.HOME,
      component: Home,
    },
    {
      path: '/login',
      name: routeNames.LOGIN,
      component: Auth,
      beforeEnter: (_to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void => {
        if (authService.isAuthenticated) {
          next(from);
        } else {
          next();
        }
      },
    },
    {
      path: '/register',
      name: routeNames.REGISTER,
      component: Auth,
    },
    {
      path: '/dashboard',
      name: routeNames.DASHBOARD,
      component: Dashboard,
      meta: { requiresAuth: true },
    },
  ];

  return routes;
};
