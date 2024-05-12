/* istanbul ignore file */
const Bottle = require('bottlejs');

const bottle = new Bottle();

// external agency
const Jwt = require('@hapi/jwt');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const pool = require('./database/postgres/pool');

bottle.factory('jwt', () => Jwt.token);
bottle.factory('pool', () => pool);
bottle.factory('idGenerator', () => nanoid);
bottle.factory('bcrypt', () => bcrypt);

// services
const JwtTokenManager = require('./security/JwtTokenManager');
const BcryptPasswordHash = require('./security/BcryptPasswordHash');

bottle.service('passwordHash', BcryptPasswordHash, 'bcrypt');
bottle.service('jwtTokenManager', JwtTokenManager, 'jwt');

// repository
const AuthRepositoryPostgres = require('./repository/AuthRepositoryPostgres');
const UsersRepositoryPostgres = require('./repository/UsersRepositoryPostgres');
const ThreadsRepositoryPostgres = require('./repository/ThreadsRepositoryPostgres');
const CommentsRepositoryPostgres = require('./repository/CommentsRepositoryPostgres');
const RepliesRepositoryPostgres = require('./repository/RepliesRepositoryPostgres');

bottle.service('authRepository', AuthRepositoryPostgres, 'pool');
bottle.service('usersRepository', UsersRepositoryPostgres, 'pool', 'idGenerator');
bottle.service('threadsRepository', ThreadsRepositoryPostgres, 'pool', 'idGenerator');
bottle.service('commentsRepository', CommentsRepositoryPostgres, 'pool', 'idGenerator');
bottle.service('repliesRepository', RepliesRepositoryPostgres, 'pool', 'idGenerator');

// usecase
const AuthUseCase = require('../Applications/use_case/AuthUseCase');
const UsersUseCase = require('../Applications/use_case/UsersUseCase');
const ThreadsUseCase = require('../Applications/use_case/ThreadsUseCase');
const RepliesUseCase = require('../Applications/use_case/RepliesUseCase');
const CommentsUseCase = require('../Applications/use_case/CommentsUseCase');

bottle.service('usersUseCase', UsersUseCase, 'usersRepository', 'passwordHash');
bottle.service('authUseCase', AuthUseCase, 'usersRepository', 'authRepository', 'jwtTokenManager', 'passwordHash');
bottle.service('threadsUseCase', ThreadsUseCase, 'threadsRepository', 'commentsRepository', 'repliesRepository');
bottle.service('commentsUseCase', CommentsUseCase, 'threadsRepository', 'commentsRepository');
bottle.service('repliesUseCase', RepliesUseCase, 'threadsRepository', 'commentsRepository', 'repliesRepository');

module.exports = bottle;
