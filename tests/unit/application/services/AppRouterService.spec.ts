import { RouteName, VueRouterFactory } from '@/infrastructure/routing/VueRouterFactory';
import { AppRouterService } from '@/application/services/AppRouterService';
import { routes } from '@/infrastructure/routing/routes';

const authService: any = jest.fn();
const { router } = new VueRouterFactory(routes, authService);

describe('AppRouterService', () => {
  it('should return actual route name', async () => {
    const routerService = new AppRouterService(router);

    await router.push({ name: RouteName.LOGIN });

    expect(routerService.currentRouteName).toBe(RouteName.LOGIN);
  });
});
