const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments',
    handler: handler.postCommentsHandler,
    options: {
      auth: 'jwt_strategy',
    },
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}',
    handler: handler.deleteCommentsHandler,
    options: {
      auth: 'jwt_strategy',
    },
  },
]);

module.exports = routes;
