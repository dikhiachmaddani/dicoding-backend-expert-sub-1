const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const JwtTestHelper = require('../../../../tests/JwtTestHelper');
const pool = require('../../database/postgres/pool');
const { container } = require('../../container');
const createServer = require('../createServer');

describe('Comments  Endpoint Tests', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await JwtTestHelper.cleanTable();
  });

  describe('POST Comments', () => {
    it('should response status code with 201 and persisted comment', async () => {
      // Arrange
      const requestPayload = {
        content: 'Uhuy',
      };

      const accessToken = await JwtTestHelper.getAccessToken({
        id: 'user-oerfknro',
        username: 'oerfknro',
      });

      await ThreadsTableTestHelper.addThread({
        id: 'thread-238hfwoeifhbcc',
        owner: 'user-oerfknro',
      });

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-238hfwoeifhbcc/comments',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedComment).toBeDefined();
      expect(responseJson.data.addedComment.owner).toEqual('user-oerfknro');
    });

    it('should response status code with 400 when request payload lacks necessary properties', async () => {
      // Arrange
      const requestPayload = {};

      const accessToken = await JwtTestHelper.getAccessToken({
        id: 'user-32obfo',
        username: '32obfo',
      });

      await ThreadsTableTestHelper.addThread({
        id: 'thread-32ihr3hr',
        owner: 'user-32obfo',
      });

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-32ihr3hr/comments',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });

    it('should response status code with 400 when request payload has incorrect data types', async () => {
      // Arrange
      const requestPayload = {
        content: {},
      };

      const accessToken = await JwtTestHelper.getAccessToken({
        id: 'user-viubvkkkk',
        username: 'viubvkkkk',
      });

      await ThreadsTableTestHelper.addThread({
        id: 'thread-3iefh',
        owner: 'user-viubvkkkk',
      });

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-3iefh/comments',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });

    it('should response status code with 401 when request is not authenticated', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-239hfwi',
        username: '239hfwi',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-329hfwnqi',
        owner: 'user-239hfwi',
      });
      const requestPayload = {
        content: 'Uhuy',
      };

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-329hfwnqi/comments',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(401);
      expect(responseJson).toBeDefined();
    });
  });

  describe('DELETE Comments', () => {
    it('should response status code with 200 and deleted comment', async () => {
      // Arrange
      const accessToken = await JwtTestHelper.getAccessToken({
        id: 'user-o23ubo3u233',
        username: 'o23ubo3u233',
      });

      await ThreadsTableTestHelper.addThread({
        id: 'thread-2o3bo32u333',
        owner: 'user-o23ubo3u233',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-o23buotu23333',
        threadId: 'thread-2o3bo32u333',
        owner: 'user-o23ubo3u233',
      });

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-2o3bo32u333/comments/comment-o23buotu23333',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
    });

    it('should response status code with 404 when comment is not found', async () => {
      // Arrange
      const accessToken = await JwtTestHelper.getAccessToken({
        id: 'user-238hg9t283t',
        username: '238hg9t283t',
      });

      await ThreadsTableTestHelper.addThread({
        id: 'thread-ueobuwebfwoe',
        owner: 'user-238hg9t283t',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-832gfujc',
        threadId: 'thread-ueobuwebfwoe',
        owner: 'user-238hg9t283t',
      });
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-ueobuwebfwoe/comments/comment-xxx',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });

    it('should response status code with 401 when request is not authenticated', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-32hifwoihfcv',
        username: '32hifwoihfcv',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-32hifwoihfcv',
        owner: 'user-32hifwoihfcv',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-328fh8ikws',
        threadId: 'thread-32hifwoihfcv',
        owner: 'user-32hifwoihfcv',
      });

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-32hifwoihfcv/comments/comment-328fh8ikws',
      });

      // Assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(401);
      expect(responseJson).toBeDefined();
    });
  });
});
