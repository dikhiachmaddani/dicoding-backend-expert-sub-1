const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments/{commentId}/replies',
    handler: handler.postRepliesHandler,
    options: {
      auth: 'jwt_strategy',
    },
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
    handler: handler.deleteRepliesHandler,
    options: {
      auth: 'jwt_strategy',
    },
  },
]);

module.exports = routes;
