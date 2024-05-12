const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postLoginHandler,
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putRefreshTokenHandler,
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteLogoutHandler,
  },
];

module.exports = routes;
