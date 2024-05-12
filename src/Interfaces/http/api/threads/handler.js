const autoBind = require('auto-bind');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postThreadHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { threadsUseCase } = this._container;

    const addedThread = await threadsUseCase.addThread(request.payload, userId);

    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }

  async getThreadHandler(request, h) {
    const { threadId } = request.params;
    const { threadsUseCase } = this._container;

    const getDetailThread = await threadsUseCase.getThread(threadId);

    const response = h.response({
      status: 'success',
      data: {
        thread: getDetailThread,
      },
    });
    response.code(200);
    return response;
  }
}

module.exports = ThreadsHandler;
