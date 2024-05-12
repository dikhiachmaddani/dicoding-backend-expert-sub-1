const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper');
const RepliesTablerTestHelper = require('../../../../tests/RepliesTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const JwtTestHelper = require('../../../../tests/JwtTestHelper');
const pool = require('../../database/postgres/pool');
const { container } = require('../../container');
const createServer = require('../createServer');

describe('Replies Endpoint Tests', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await RepliesTablerTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await JwtTestHelper.cleanTable();
  });

  describe('POST Replies', () => {
    it('should respond with 201 and persisted reply when adding a new reply', async () => {
      // Arrange
      const requestPayload = {
        content: 'sebuah balasan',
      };

      const accessToken = await JwtTestHelper.getAccessToken({
        id: 'user-23h3333333',
        username: '23h3333333',
      });

      await ThreadsTableTestHelper.addThread({
        id: 'thread-32oubfbfubu3333',
        owner: 'user-23h3333333',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-23h33333',
        threadId: 'thread-32oubfbfubu3333',
        owner: 'user-23h3333333',
      });
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-32oubfbfubu3333/comments/comment-23h33333/replies',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedReply).toBeDefined();
      expect(responseJson.data.addedReply.owner).toEqual('user-23h3333333');
    });

    it('should respond with 400 when request payload lacks necessary properties for adding a reply', async () => {
      // Arrange
      const requestPayload = {};

      const accessToken = await JwtTestHelper.getAccessToken({
        id: 'user-oi32hrcc',
        username: 'oi32hrcc',
      });

      await ThreadsTableTestHelper.addThread({
        id: 'thread-323h3333',
        owner: 'user-oi32hrcc',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-3233333',
        threadId: 'thread-323h3333',
        owner: 'user-oi32hrcc',
      });
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-323h3333/comments/comment-3233333/replies',
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

    it('should respond with 400 when request payload has incorrect data types for adding a reply', async () => {
      // Arrange
      const requestPayload = {
        content: {},
      };
      const accessToken = await JwtTestHelper.getAccessToken({
        id: 'user-ou3h33333',
        username: 'ou3h33333',
      });

      await ThreadsTableTestHelper.addThread({
        id: 'thread-w3fbooooo',
        owner: 'user-ou3h33333',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-23i3h333',
        threadId: 'thread-w3fbooooo',
        owner: 'user-ou3h33333',
      });

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-w3fbooooo/comments/comment-23i3h333/replies',
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

    it('should respond with 401 when request is not authenticated for adding a reply', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-vnjrvuuuuu',
        username: 'vnjrvuuuuu',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-32u3h3333',
        owner: 'user-vnjrvuuuuu',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-i3h2f083tfwnio0',
        threadId: 'thread-32u3h3333',
        owner: 'user-vnjrvuuuuu',
      });
      const requestPayload = {
        content: 'sebuah balasan',
      };

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-32u3h3333/comments/comment-i3h2f083tfwnio0/replies',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(401);
      expect(responseJson).toBeDefined();
    });
  });

  describe('DELETE Replies', () => {
    it('should respond with 200 and deleted reply when deleting a reply', async () => {
      // Arrange
      const accessToken = await JwtTestHelper.getAccessToken({
        id: 'user-o32hu4444',
        username: 'o32hu4444',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-ough4444',
        owner: 'user-o32hu4444',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-23u44444',
        threadId: 'thread-ough4444',
        owner: 'user-o32hu4444',
      });
      await RepliesTableTestHelper.addReplies({
        id: 'reply-32ougggg',
        threadId: 'thread-ough4444',
        commentId: 'comment-23u44444',
        owner: 'user-o32hu4444',
      });

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-ough4444/comments/comment-23u44444/replies/reply-32ougggg',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
    });

    it('should respond with 404 when reply to delete is not found', async () => {
      // Arrange
      const accessToken = await JwtTestHelper.getAccessToken({
        id: 'user-ogeihggggg3322',
        username: 'ogeihggggg3322',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-32ioh333334',
        owner: 'user-ogeihggggg3322',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-32gihg333',
        threadId: 'thread-32ioh333334',
        owner: 'user-ogeihggggg3322',
      });
      await RepliesTableTestHelper.addReplies({
        id: 'reply-32233fffff',
        threadId: 'thread-32ioh333334',
        commentId: 'comment-32gihg333',
        owner: 'user-ogeihggggg3322',
      });

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-32ioh333334/comments/comment-32gihg333/replies/reply-xxx',
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

    it('should respond with 401 when request is not authenticated for deleting a reply', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-birehbrih333',
        username: 'birehbrih333',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-ogoh0000',
        owner: 'user-birehbrih333',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-weibhhhh222',
        threadId: 'thread-ogoh0000',
        owner: 'user-birehbrih333',
      });
      await RepliesTableTestHelper.addReplies({
        id: 'reply-i23ho3333',
        threadId: 'thread-ogoh0000',
        commentId: 'comment-weibhhhh222',
        owner: 'user-birehbrih333',
      });
      const server = await createServer(container);

      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-ogoh0000/comments/comment-weibhhhh222/replies/reply-i23ho3333',
      });

      // Assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(401);
      expect(responseJson).toBeDefined();
    });
  });
});
