import { createServer } from 'miragejs';
import { createAuthRoutes } from './fakeApiRoutes/auth';
import { AnyFactories, AnyModels, Registry } from 'miragejs/-types';
import { Server } from 'miragejs/server';

export type MirageServer = Server<Registry<AnyModels, AnyFactories>>;

export const startFakeApiServer = (): void => {
  createServer({
    routes() {
      this.urlPrefix = process.env.VUE_APP_API_BASE_URL;

      createAuthRoutes(this);
    },
  });
};
