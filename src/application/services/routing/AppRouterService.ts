import { Router } from 'vue-router';
import { RouterService } from '@/application/services/routing/RouterService';
import { routeNames } from '@/infrastructure/routing/routeNames';

export class AppRouterService implements RouterService {
  constructor(public router: Router) {}

  get routeNames(): any {
    return routeNames;
  }

  get currentRouteName(): string {
    return this.router.currentRoute.value.name as string;
  }
}
