const autoBind = require('auto-bind');

class UsersHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postUserHandler(request, h) {
    const { usersUseCase } = this._container;
    const addedUser = await usersUseCase.addUser(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedUser,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UsersHandler;
