import { Router } from 'vue-router';

export interface RouterService {
  routeName: Record<string, string>;
  currentRouteName: string;
  router: Router;
}
