import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import Auth from '@/application/views/pages/Auth.vue';
import Home from '@/application/views/pages/Home.vue';

export enum RouteName {
  HOME = 'HOME',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
