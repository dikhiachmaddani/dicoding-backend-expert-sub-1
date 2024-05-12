const autoBind = require('auto-bind');

class RepliesHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postRepliesHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { repliesUseCase } = this._container;

    const addedReply = await repliesUseCase.addReplies(
      request.payload,
      request.params,
      userId,
    );

    const response = h.response({
      status: 'success',
      data: {
        addedReply,
      },
    });

    response.code(201);
    return response;
  }

  async deleteRepliesHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { repliesUseCase } = this._container;

    await repliesUseCase.deleteReplies(request.params, userId);

    const response = h.response({
      status: 'success',
    });

    response.code(200);
    return response;
  }
}

module.exports = RepliesHandler;
