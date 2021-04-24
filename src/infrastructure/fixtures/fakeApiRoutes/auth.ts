import { MirageServer } from '@/infrastructure/fixtures/fakeApiServer';
import { Response } from 'miragejs';

export const createAuthRoutes = (server: MirageServer): void => {
  server.post('/login', (_schema, req) => {
    const requestData = JSON.parse(req.requestBody);

    const inputEmail = requestData.email;
    const inputPassword = requestData.password;

    const correctEmail = process.env.VUE_APP_API_FIXTURE_AUTH_EMAIL;
    const correctPassword = process.env.VUE_APP_API_FIXTURE_AUTH_PASSWORD;

    const areCredentialsValid = inputEmail === correctEmail && inputPassword === correctPassword;

    if (!areCredentialsValid) {
      return new Response(400);
    }

    return new Response(200);
  });
};
