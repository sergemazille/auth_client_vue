import { Router } from 'vue-router';

export interface RouterService {
  routeNames: Record<string, string>;
  currentRouteName: string;
  router: Router;
}
