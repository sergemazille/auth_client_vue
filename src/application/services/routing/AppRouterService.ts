import { Router } from 'vue-router';
import { RouterService } from '@/application/services/routing/RouterService';
import { RouteName } from '@/infrastructure/routing/VueRouterFactory';

export class AppRouterService implements RouterService {
  constructor(public router: Router) {}

  get routeName(): any {
    return RouteName;
  }

  get currentRouteName(): string {
    return this.router.currentRoute.value.name as string;
  }
}
