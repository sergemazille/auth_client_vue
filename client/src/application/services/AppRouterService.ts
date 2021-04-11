import { Router } from 'vue-router';
import { RouterService } from '@/application/services/RouterService';

export class AppRouterService implements RouterService {
  constructor(private readonly router: Router) {}

  get routeName(): string {
    return (this.router.currentRoute.value.name as string) || '';
  }
}
