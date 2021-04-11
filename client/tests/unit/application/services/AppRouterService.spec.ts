import router, { RouteName } from '@/infrastructure/VueRouter';
import { AppRouterService } from '@/application/services/AppRouterService';

describe('AppRouterService', () => {
  it('should return actual route name', async () => {
    const routerService = new AppRouterService(router);

    await router.push({ name: RouteName.LOGIN });

    expect(routerService.currentRouteName).toBe(RouteName.LOGIN);
  });
});
