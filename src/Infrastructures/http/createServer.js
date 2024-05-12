const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const config = require('../../Commons/config');
const auth = require('../../Interfaces/http/api/auth');
const users = require('../../Interfaces/http/api/users');
const threads = require('../../Interfaces/http/api/threads');
const replies = require('../../Interfaces/http/api/replies');
const comments = require('../../Interfaces/http/api/comments');
const PreResponseMiddleware = require('../../Commons/middleware/PreResponseMiddleware');

const createServer = async (container) => {
  const server = Hapi.server({
    host: config.app.host,
    port: config.app.port,
    // debug: config.app.debug,
  });

  await server.register([
    { plugin: Jwt },
  ]);

  server.auth.strategy('jwt_strategy', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      Credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: users,
      options: { container },
    },
    {
      plugin: auth,
      options: { container },
    },
    {
      plugin: threads,
      options: { container },
    },
    {
      plugin: comments,
      options: { container },
    },
    {
      plugin: replies,
      options: { container },
    },
  ]);

  server.ext('onPreResponse', PreResponseMiddleware);

  return server;
};

module.exports = createServer;
