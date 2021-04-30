import { MirageServer } from '@fixtures/fakeApiServer';

export const createAuthContentRoute = (server: MirageServer): void => {
  server.get('/auth-content', (_schema, _req) => {
    return {
      message: "Ceci est un message en provenance de la partie de l'API qui nécessite d'être authentifié",
    };
  });
};
