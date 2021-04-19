import { RouteName } from './VueRouterFactory';
import Dashboard from '@/application/ui/pages/Dashboard.vue';
import Home from '@/application/ui/pages/Home.vue';
import Auth from '@/application/ui/pages/Auth.vue';

export const routes = [
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
