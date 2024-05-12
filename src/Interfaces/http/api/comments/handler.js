const autoBind = require('auto-bind');

class CommentsHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postCommentsHandler(request, h) {
    const { id } = request.auth.credentials;
    const { commentsUseCase } = this._container;

    const addedComment = await commentsUseCase.addComment(request.payload, request.params, id);

    const response = h.response({
      status: 'success',
      data: {
        addedComment,
      },
    });

    response.code(201);
    return response;
  }

  async deleteCommentsHandler(request, h) {
    const { id } = request.auth.credentials;
    const { commentsUseCase } = this._container;

    await commentsUseCase.deleteComment(request.params, id);

    const response = h.response({
      status: 'success',
    });

    response.code(200);

    return response;
  }
}

module.exports = CommentsHandler;
