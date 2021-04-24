import { AppRouterService } from '@/application/services/routing/AppRouterService';
import { VueRouterFactory } from '@/infrastructure/routing/VueRouterFactory';
import { routeNames } from '@/infrastructure/routing/routeNames';
import { routes } from '@/infrastructure/routing/routes';

describe('AppRouterService', () => {
  it('should return actual route name', async () => {
    const authService: any = jest.fn();
    const { router } = new VueRouterFactory(routes, authService);
    const routerService = new AppRouterService(router);

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
    const authService: any = { isAuthenticated: false };
    const { router } = new VueRouterFactory(routes, authService);
    const routerService = new AppRouterService(router);

    await router.push({ name: 'GUARDED_ROUTE' });

    expect(routerService.currentRouteName).toBe(routeNames.LOGIN);
  });

  it('should visit requested page if user is authenticated before visiting a guarded page', async () => {
    routes.push({
      path: '',
      component: {} as any,
      name: 'GUARDED_ROUTE',
      meta: { requiresAuth: true },
    });
    const authService: any = { isAuthenticated: true };
    const { router } = new VueRouterFactory(routes, authService);
    const routerService = new AppRouterService(router);

    await router.push({ name: 'GUARDED_ROUTE' });

    expect(routerService.currentRouteName).toBe('GUARDED_ROUTE');
  });
});
