import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import Auth from '@/application/views/pages/Auth.vue';
import Dashboard from '@/application/views/pages/Dashboard.vue';
import Home from '@/application/views/pages/Home.vue';

export enum RouteName {
  HOME = 'HOME',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  DASHBOARD = 'DASHBOARD',
}

const routes: Array<RouteRecordRaw> = [
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
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
