import { AppRouterService } from '@/application/services/AppRouterService';
import router from '@/infrastructure/VueRouter';

describe('AppRouterService', () => {
  it('should return actual route name', async () => {
    const routerService = new AppRouterService(router);

    await router.push({ name: 'login' });

    expect(routerService.routeName).toBe('login');
  });
});
