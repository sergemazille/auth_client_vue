import { RouterUsingVueRouter } from '@/infrastructure/secondary/routing/RouterUsingVueRouter';
import { VueRouterFactory } from '@/infrastructure/secondary/routing/VueRouterFactory';
import { routeNames } from '@/infrastructure/secondary/routing/routeNames';
import { createAppRoutes } from '@/infrastructure/secondary/routing/routes';

let routes: any = [];
let authService: any;
let router: any;

describe('AppRouterService', () => {
  beforeEach(() => {
    authService = jest.fn();
    routes = createAppRoutes(authService);
    router = new VueRouterFactory(routes, authService).router;
  });

  it('should return actual route name', async () => {
    const routerService = new RouterUsingVueRouter(router);

    await router.push({ name: routeNames.LOGIN });

    expect(routerService.currentRouteName).toBe(routeNames.LOGIN);
  });

  it('should redirect to login page if user is not authenticated before visiting a guarded page', async () => {
    routes.push({
      path: '',
      component: {} as any,
      name: 'GUARDED_ROUTE',
      meta: { requiresAuth: true },
    });

    const { router } = new VueRouterFactory(routes, authService);
    const routerService = new RouterUsingVueRouter(router);

    await router.push({ name: 'GUARDED_ROUTE' });

    expect(routerService.currentRouteName).toBe(routeNames.LOGIN);
  });

  it('should visit requested page if user is authenticated before visiting a guarded page', async () => {
    authService = { isAuthenticated: true };
    routes.push({
      path: '',
      component: {} as any,
      name: 'GUARDED_ROUTE',
      meta: { requiresAuth: true },
    });

    const { router } = new VueRouterFactory(routes, authService);
    const routerService = new RouterUsingVueRouter(router);

    await router.push({ name: 'GUARDED_ROUTE' });

    expect(routerService.currentRouteName).toBe('GUARDED_ROUTE');
  });

  it('should be redirected to home page when trying to visit login page while already beeing authenticated', async () => {
    authService = { isAuthenticated: true };
    routes = createAppRoutes(authService);

    const { router } = new VueRouterFactory(routes, authService);
    const routerService = new RouterUsingVueRouter(router);

    await router.push({ name: 'login' });
    await new Promise(resolve => setTimeout(resolve));

    expect(routerService.currentRouteName).toBe('home');
  });
});
