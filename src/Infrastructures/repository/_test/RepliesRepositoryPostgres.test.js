const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AddingReplies = require('../../../Domains/replies/entities/AddingReplies');
const pool = require('../../database/postgres/pool');
const RepliesRepositoryPostgres = require('../RepliesRepositoryPostgres');
const RepliesRepository = require('../../../Domains/replies/RepliesRepository');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const AddedReplies = require('../../../Domains/replies/entities/AddedReplies');
const DetailReplies = require('../../../Domains/replies/entities/DetailReplies');

describe('RepliesRepositoryPostgres', () => {
  it('should be instance of RepliesRepository domain', () => {
    const replyRepositoryPostgres = new RepliesRepositoryPostgres({}, {});

    expect(replyRepositoryPostgres).toBeInstanceOf(RepliesRepository);
  });

  afterEach(async () => {
    await RepliesTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('getRepliesByThreadId function', () => {
    it('should return an empty array when the replies is does not exist in comments', async () => {
      await UsersTableTestHelper.addUser({
        id: 'user-oirenvir',
        username: 'oirenvir',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-oi3nfoi3',
        owner: 'user-oirenvir',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-093jfd023ifj',
        threadId: 'thread-oi3nfoi3',
        owner: 'user-oirenvir',
      });

      const replyRepositoryPostgres = new RepliesRepositoryPostgres(pool, {});

      const result = await replyRepositoryPostgres.getRepliesByThreadId(
        'thread-oi3nfoi3',
      );

      expect(result).toEqual([]);
    });
    it('should return replies correctly', async () => {
      // Arrange
      const date = new Date('2024-05-05T20:56:24.259305');

      await UsersTableTestHelper.addUser({
        id: 'user-32nofi',
        username: 'iowenoweign',
      });
      await UsersTableTestHelper.addUser({
        id: 'user-32oh3rh',
        username: '32oh3rh',
      });
      await UsersTableTestHelper.addUser({
        id: 'user-32ohffjow2',
        username: '32ohffjow2',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-32h80fqwip',
        owner: 'user-32nofi',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-i3h2f083tfwnio0',
        threadId: 'thread-32h80fqwip',
        owner: 'user-32nofi',
      });
      await RepliesTableTestHelper.addWithDeletedReplies({
        id: 'reply-oi329hg32nf',
        threadId: 'thread-32h80fqwip',
        commentId: 'comment-i3h2f083tfwnio0',
        owner: 'user-32ohffjow2',
      });

      const repliesResult = [
        new DetailReplies({
          id: 'reply-oi329hg32nf',
          username: '32ohffjow2',
          createdAt: date,
          content: 'ini content balasan pertama',
          isDelete: date,
          commentId: 'comment-i3h2f083tfwnio0',
        }),
      ];

      const findRepliesByThreadId = await RepliesTableTestHelper.findRepliesByThreadId('thread-32h80fqwip');

      const replyRepositoryPostgres = new RepliesRepositoryPostgres(pool, {});

      // Action
      const replies = await replyRepositoryPostgres.getRepliesByThreadId(
        'thread-32h80fqwip',
      );

      // Assert
      expect(replies).toStrictEqual(findRepliesByThreadId);
      expect(replies).toStrictEqual(repliesResult);
    });
  });

  describe('addReplies function', () => {
    it('should create a new replies and return added replies correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-32hfiow208',
        username: 'wefhoi',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-932rhf',
        owner: 'user-32hfiow208',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-923rhf',
        threadId: 'thread-932rhf',
        owner: 'user-32hfiow208',
      });

      const params = {
        threadId: 'thread-932rhf',
        commentId: 'comment-923rhf',
      };

      const newReply = new AddingReplies({
        content: 'ini content balasan pertama',
      });

      const fakeIdGenerator = () => 'oi32nf';
      const replyRepositoryPostgres = new RepliesRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action
      const addedReply = await replyRepositoryPostgres.addReplies(
        newReply,
        params,
        'user-32hfiow208',
      );

      // Assert
      const reply = await RepliesTableTestHelper.findAddedRepliesById(
        'reply-oi32nf',
      );
      expect(addedReply).toStrictEqual(new AddedReplies({
        id: 'reply-oi32nf',
        content: 'ini content balasan pertama',
        userId: 'user-32hfiow208',
      }));
      expect(addedReply).toStrictEqual(reply);
      expect(reply).toBeDefined();
    });
  });

  describe('checkAvailabilityRepliesId function', () => {
    it('should throw NotFoundError when the replies is does not exist', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-i3hwfihf',
        username: 'i3hwfihf',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-ewvihwhi',
        owner: 'user-i3hwfihf',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-vewjubuow',
        threadId: 'thread-ewvihwhi',
        owner: 'user-i3hwfihf',
      });
      await RepliesTableTestHelper.addReplies({
        id: 'reply-bjfw3iub',
        threadId: 'thread-ewvihwhi',
        commentId: 'comment-vewjubuow',
        owner: 'user-i3hwfihf',
      });

      const replyRepositoryPostgres = new RepliesRepositoryPostgres(pool, {});

      // Action and Assert
      await expect(
        replyRepositoryPostgres.checkAvailabilityRepliesId('reply-xxx'),
      ).rejects.toThrowError(NotFoundError);
    });

    it('should resolve when the replies is found', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-08ehf8wyf',
        username: '08ehf8wyf',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-vwebjjbkvwe',
        owner: 'user-08ehf8wyf',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-iohq38fw38fv',
        threadId: 'thread-vwebjjbkvwe',
        owner: 'user-08ehf8wyf',
      });
      await RepliesTableTestHelper.addReplies({
        id: 'reply-38hwfiqof',
        threadId: 'thread-vwebjjbkvwe',
        commentId: 'comment-iohq38fw38fv',
        owner: 'user-08ehf8wyf',
      });

      const replyRepositoryPostgres = new RepliesRepositoryPostgres(pool, {});

      // Action and Assert
      const checkAvailabilityThreadId = replyRepositoryPostgres.checkAvailabilityRepliesId('reply-38hwfiqof');
      await expect(checkAvailabilityThreadId).resolves.not.toThrowError(NotFoundError);
      expect(checkAvailabilityThreadId).toBeDefined();
    });
  });

  describe('checkRepliesOwnerByUserId function', () => {
    it('should throw NotFoundError when the replies is does not exist', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-291jwd910',
        username: '291jwd910',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-932jef93',
        owner: 'user-291jwd910',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-w3gih3viow',
        threadId: 'thread-932jef93',
        owner: 'user-291jwd910',
      });
      await RepliesTableTestHelper.addReplies({
        id: 'reply-wihvew',
        threadId: 'thread-932jef93',
        commentId: 'comment-w3gih3viow',
        owner: 'user-291jwd910',
      });

      const replyRepositoryPostgres = new RepliesRepositoryPostgres(pool, {});

      // Action and Assert
      await expect(
        replyRepositoryPostgres.checkRepliesOwnerByUserId(
          'reply-xxx',
          'user-w3gih3viow',
        ),
      ).rejects.toThrowError(NotFoundError);
    });

    it('should throw AuthorizationError when the user is not the owner of the replies', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-32hfi3w20h',
        username: '32hfi3w20h',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-392jfo392',
        owner: 'user-32hfi3w20h',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-32h9frfwiw9',
        threadId: 'thread-392jfo392',
        owner: 'user-32hfi3w20h',
      });
      await RepliesTableTestHelper.addReplies({
        id: 'reply-32uoqhfo',
        threadId: 'thread-392jfo392',
        commentId: 'comment-32h9frfwiw9',
        owner: 'user-32hfi3w20h',
      });

      const replyRepositoryPostgres = new RepliesRepositoryPostgres(pool, {});

      // Action and Assert
      await expect(
        replyRepositoryPostgres.checkRepliesOwnerByUserId(
          'reply-32uoqhfo',
          'user-xxx',
        ),
      ).rejects.toThrowError(AuthorizationError);
    });

    it('should resolve when the user is the owner of the replies', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-23ihfw2oi',
        username: '23ihfw2oi',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-32hif20ff3g',
        owner: 'user-23ihfw2oi',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-3i2hf28hf',
        threadId: 'thread-32hif20ff3g',
        owner: 'user-23ihfw2oi',
      });
      await RepliesTableTestHelper.addReplies({
        id: 'reply-32uoqhfo',
        threadId: 'thread-32hif20ff3g',
        commentId: 'comment-3i2hf28hf',
        owner: 'user-23ihfw2oi',
      });

      const replyRepositoryPostgres = new RepliesRepositoryPostgres(pool, {});

      // Action and Assert
      await expect(
        replyRepositoryPostgres.checkRepliesOwnerByUserId(
          'reply-32uoqhfo',
          'user-23ihfw2oi',
        ),
      ).resolves.not.toThrowError(AuthorizationError);
    });
  });

  describe('deleteRepliesById function', () => {
    it('should delete the replies correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-ionfoinvvvv',
        username: 'ionfoinvvvv',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-aksnflqwnf',
        owner: 'user-ionfoinvvvv',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-oiwenvevnin',
        threadId: 'thread-aksnflqwnf',
        owner: 'user-ionfoinvvvv',
      });
      await RepliesTableTestHelper.addReplies({
        id: 'reply-oinvewovnnnncm',
        threadId: 'thread-aksnflqwnf',
        commentId: 'comment-oiwenvevnin',
        owner: 'user-ionfoinvvvv',
      });

      const replyRepositoryPostgres = new RepliesRepositoryPostgres(pool, {});

      // Action and Assert
      await expect(
        replyRepositoryPostgres.deleteRepliesById('reply-oinvewovnnnncm'),
      ).resolves.not.toThrowError();

      const deletedReply = await RepliesTableTestHelper.findRepliesById('reply-oinvewovnnnncm');
      expect(deletedReply.isDelete).not.toBeNull();
    });
  });
});
