import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Auth from '@/application/views/pages/Auth.vue';
import Home from '@/application/views/pages/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Auth,
  },
  {
    path: '/register',
    name: 'register',
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
