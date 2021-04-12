import { Router } from 'vue-router';
import { RouterService } from '@/application/services/RouterService';
import { RouteName } from '@/infrastructure/VueRouterFactory';

export class AppRouterService implements RouterService {
  constructor(private readonly router: Router) {}

  get routeName(): any {
    return RouteName;
  }

  get currentRouteName(): string {
    return this.router.currentRoute.value.name as string;
  }
}
