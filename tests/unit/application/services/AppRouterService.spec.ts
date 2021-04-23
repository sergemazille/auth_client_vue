import { RouteName, VueRouterFactory } from '@/infrastructure/routing/VueRouterFactory';
import { AppRouterService } from '@/application/services/routing/AppRouterService';
import { routes } from '@/infrastructure/routing/routes';

describe('AppRouterService', () => {
  it('should return actual route name', async () => {
    const authService: any = jest.fn();
    const { router } = new VueRouterFactory(routes, authService);
    const routerService = new AppRouterService(router);

    await router.push({ name: RouteName.LOGIN });

    expect(routerService.currentRouteName).toBe(RouteName.LOGIN);
  });

  it('should redirect to login page if user is not authenticated before visiting a guarded page', async () => {
    routes.push({
      path: '',
      component: {} as any,
      name: 'GUARDED_ROUTE' as RouteName,
      meta: { requiresAuth: true },
    });
    const authService: any = { isAuthenticated: false };
    const { router } = new VueRouterFactory(routes, authService);
    const routerService = new AppRouterService(router);

    await router.push({ name: 'GUARDED_ROUTE' });

    expect(routerService.currentRouteName).toBe(RouteName.LOGIN);
  });

  it('should visit requested page if user is authenticated before visiting a guarded page', async () => {
    routes.push({
      path: '',
      component: {} as any,
      name: 'GUARDED_ROUTE' as RouteName,
      meta: { requiresAuth: true },
    });
    const authService: any = { isAuthenticated: true };
    const { router } = new VueRouterFactory(routes, authService);
    const routerService = new AppRouterService(router);

    await router.push({ name: 'GUARDED_ROUTE' });

    expect(routerService.currentRouteName).toBe('GUARDED_ROUTE');
  });
});
