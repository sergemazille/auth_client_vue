import { Router } from 'vue-router';
import { RouterService } from '@/application/services/RouterService';
import { routeNames } from '@/infrastructure/secondary/routing/routeNames';

export class RouterUsingVueRouter implements RouterService {
  constructor(public vueRouter: Router) {}

  get routeNames(): any {
    return routeNames;
  }

  get currentRouteName(): string {
    return this.vueRouter.currentRoute.value.name as string;
  }

  get router(): Router {
    return this.vueRouter;
  }
}
