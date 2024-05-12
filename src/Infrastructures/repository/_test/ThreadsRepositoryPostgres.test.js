const pool = require('../../database/postgres/pool');
const ThreadsRepositoryPostgres = require('../ThreadsRepositoryPostgres');
const ThreadsRepository = require('../../../Domains/threads/ThreadsRepository');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AddingThread = require('../../../Domains/threads/entities/AddingThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const DetailThread = require('../../../Domains/threads/entities/DetailThread');

describe('ThreadsRepositoryPostgres', () => {
  it('should be an instance of ThreadsRepository domain', () => {
    const threadRepositoryPostgres = new ThreadsRepositoryPostgres({}, {});

    expect(threadRepositoryPostgres).toBeInstanceOf(ThreadsRepository);
  });

  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('getThreadById function', () => {
    it('should return the detail thread correctly', async () => {
      // Arrange
      const date = new Date('2024-05-05T20:56:24.259305');

      await UsersTableTestHelper.addUser({
        id: 'user-3o2hf',
        username: '3o2hf',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-32ufbuog',
        owner: 'user-3o2hf',
        date,
      });

      const threadRepositoryPostgres = new ThreadsRepositoryPostgres(
        pool,
        {},
      );

      // Action
      const detailThread = await threadRepositoryPostgres.getThreadById(
        'thread-32ufbuog',
      );

      // Assert
      const thread = await ThreadsTableTestHelper.findThreadById(
        'thread-32ufbuog',
      );

      expect(detailThread).toStrictEqual(new DetailThread({
        id: 'thread-32ufbuog',
        title: 'ini threadku',
        body: 'no caption capt!',
        createdAt: date,
        username: '3o2hf',
      }));
      expect(detailThread).toStrictEqual(thread);
    });
  });

  describe('addThread function', () => {
    it('should create a new thread and return the added thread correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-ou32bfou2g',
        username: 'ou32bfou2g',
      });

      const addingNewThread = new AddingThread({
        title: 'thread pertama gua ni bang!',
        body: 'no capt capt!',
      });

      const fakeIdGenerator = () => '32ihpfn';
      const threadRepositoryPostgres = new ThreadsRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(
        addingNewThread,
        'user-ou32bfou2g',
      );

      // Assert
      const thread = await ThreadsTableTestHelper.findAddedCommentById(
        'thread-32ihpfn',
      );

      expect(addedThread).toStrictEqual(
        new AddedThread({
          id: `thread-${fakeIdGenerator()}`,
          title: 'thread pertama gua ni bang!',
          userId: 'user-ou32bfou2g',
        }),
      );
      expect(addedThread).toStrictEqual(thread);
      expect(thread).toBeDefined();
    });
  });

  describe('checkAvailabilityThreadId function', () => {
    it('should throw NotFoundError when the thread is not found', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-3082hfiwn',
        username: '3082hfiwn',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-3082hfiwn',
        owner: 'user-3082hfiwn',
      });

      const threadRepositoryPostgres = new ThreadsRepositoryPostgres(
        pool,
        {},
      );

      // Action and Assert
      await expect(
        threadRepositoryPostgres.checkAvailabilityThreadId('thread-xxx'),
      ).rejects.toThrowError(NotFoundError);
    });

    it('should resolve when the thread is found', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-damdama',
        username: 'damdama',
      });

      await ThreadsTableTestHelper.addThread({
        id: 'thread-damdama',
        owner: 'user-damdama',
      });

      const threadRepositoryPostgres = new ThreadsRepositoryPostgres(
        pool,
        {},
      );
      // Action & Assert
      const checkAvailabilityThreadId = threadRepositoryPostgres.checkAvailabilityThreadId('thread-damdama');
      await expect(checkAvailabilityThreadId).resolves.not.toThrowError(NotFoundError);
      expect(checkAvailabilityThreadId).toBeDefined();
    });
  });
});
