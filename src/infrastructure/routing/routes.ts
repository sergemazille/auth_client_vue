import Auth from '@/infrastructure/ui/pages/Auth.vue';
import Dashboard from '@/infrastructure/ui/pages/Dashboard.vue';
import Home from '@/infrastructure/ui/pages/Home.vue';
import { routeNames } from '@/infrastructure/routing/routeNames';

export const routes = [
  {
    path: '/',
    name: routeNames.HOME,
    component: Home,
  },
  {
    path: '/login',
    name: routeNames.LOGIN,
    component: Auth,
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
