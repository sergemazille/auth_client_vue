import { AnyFactories, AnyModels, Registry } from 'miragejs/-types';
import { Server } from 'miragejs/server';
import { createAuthContentRoute } from '@fixtures/fakeApiRoutes/secretContent';
import { createAuthRoutes } from '@fixtures/fakeApiRoutes/auth';
import { createServer } from 'miragejs';

export type MirageServer = Server<Registry<AnyModels, AnyFactories>>;

export const startFakeApiServer = (): void => {
  createServer({
    routes() {
      this.urlPrefix = process.env.VUE_APP_API_BASE_URL;

      createAuthRoutes(this);
      createAuthContentRoute(this);
    },
  });
};
