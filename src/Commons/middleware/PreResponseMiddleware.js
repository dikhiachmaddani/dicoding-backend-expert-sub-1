/* istanbul ignore file */
const DomainErrorTranslator = require('../exceptions/DomainErrorTranslator');
const ClientError = require('../exceptions/ClientError');

const PreResponseMiddleware = (request, h) => {
  const { response } = request;

  if (response instanceof Error) {
    const translatedError = DomainErrorTranslator.translate(response);

    if (translatedError instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: translatedError.message,
      });
      newResponse.code(translatedError.statusCode);
      return newResponse;
    }

    if (!translatedError.isServer) return h.continue;

    const newResponse = h.response({
      status: 'error',
      message: 'terjadi kegagalan pada server kami',
    });
    newResponse.code(500);
    return newResponse;
  }

  return h.continue;
};

module.exports = PreResponseMiddleware;
