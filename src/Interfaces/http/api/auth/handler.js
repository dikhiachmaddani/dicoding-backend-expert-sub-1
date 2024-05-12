const autoBind = require('auto-bind');

class AuthHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postLoginHandler(request, h) {
    const { authUseCase } = this._container;
    const { accessToken, refreshToken } = await authUseCase.login(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async putRefreshTokenHandler(request) {
    const { authUseCase } = this._container;

    const accessToken = await authUseCase.refreshToken(request.payload);

    return {
      status: 'success',
      data: {
        accessToken,
      },
    };
  }

  async deleteLogoutHandler(request) {
    const { authUseCase } = this._container;

    await authUseCase.logout(request.payload);
    return {
      status: 'success',
    };
  }
}

module.exports = AuthHandler;
