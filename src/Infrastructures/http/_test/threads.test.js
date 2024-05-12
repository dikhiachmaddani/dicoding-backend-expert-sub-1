const pool = require('../../database/postgres/pool');
const { container } = require('../../container');
const createServer = require('../createServer');
const JwtTestHelper = require('../../../../tests/JwtTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');

describe('Threads Endpoint Tests', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await RepliesTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await JwtTestHelper.cleanTable();
  });

  describe('POST threads', () => {
    it('should respond with 201 and the added thread when creating a new thread', async () => {
      // Arrange
      const requestPayload = {
        title: 'Bikin Thread Pertama kali nih',
        body: 'no capt!',
      };

      const accessToken = await JwtTestHelper.getAccessToken({});
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedThread).toBeDefined();
      expect(responseJson.data.addedThread.owner).toEqual('user-666212');
    });

    it('should respond with 400 when request payload lacks necessary properties for creating a thread', async () => {
      // Arrange
      const requestPayload = {
        title: 'Bikin Thread Pertama kali nih',
      };

      const accessToken = await JwtTestHelper.getAccessToken({
        id: 'user-32infwi23',
        username: '32infwi23',
      });
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
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

    it('should respond with 400 when request payload has incorrect data types for creating a thread', async () => {
      // Arrange
      const requestPayload = {
        title: {},
        body: 'no capt!',
      };

      const accessToken = await JwtTestHelper.getAccessToken({
        id: 'user-903ijeggjik',
        username: '903ijeggjik',
      });
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
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

    it('should respond with 401 when request is not authenticated for creating a thread', async () => {
      // Arrange
      const requestPayload = {
        title: 'Bikin Thread Pertama kali nih',
        body: 'no capt!',
      };

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(401);
      expect(responseJson).toBeDefined();
    });
  });

  describe('GET threads', () => {
    it('should respond with 200 and the thread details when fetching an existing thread', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-o32ub2fouu',
        username: 'o32ub2fouu',
      });
      await UsersTableTestHelper.addUser({
        id: 'user-32hf3uhf',
        username: '32hf3uhf',
      });
      await UsersTableTestHelper.addUser({
        id: 'user-238fh80',
        username: '238fh80',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-32qwufh3ro23woi',
        owner: 'user-o32ub2fouu',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-238gfb298gaudb',
        threadId: 'thread-32qwufh3ro23woi',
        owner: 'user-o32ub2fouu',
      });
      await RepliesTableTestHelper.addReplies({
        id: 'reply-i23ihfewoi',
        threadId: 'thread-32qwufh3ro23woi',
        commentId: 'comment-238gfb298gaudb',
        owner: 'user-o32ub2fouu',
      });

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'GET',
        url: '/threads/thread-32qwufh3ro23woi',
      });

      // Assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.thread).toBeDefined();
    });

    it('should respond with 404 when the requested thread is not found', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-32fo32h',
        username: '32fo32h',
      });
      await UsersTableTestHelper.addUser({
        id: 'user-fiohgv',
        username: 'fiohgv',
      });
      await UsersTableTestHelper.addUser({
        id: 'user-vrjeb',
        username: 'vrjeb',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-vowenoru',
        owner: 'user-32fo32h',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-vreiohbeno',
        threadId: 'thread-vowenoru',
        owner: 'user-32fo32h',
      });
      await RepliesTableTestHelper.addReplies({
        id: 'reply-i23ihfewoi',
        threadId: 'thread-vowenoru',
        commentId: 'comment-vreiohbeno',
        owner: 'user-32fo32h',
      });

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'GET',
        url: '/threads/thread-xxx',
      });

      // Assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
  });
});
