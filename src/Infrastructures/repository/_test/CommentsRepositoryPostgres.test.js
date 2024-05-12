const pool = require('../../database/postgres/pool');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const CommentsRepositoryPostgres = require('../CommentsRepositoryPostgres');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AddingComment = require('../../../Domains/comments/entities/AddingComment');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const DetailComment = require('../../../Domains/comments/entities/DetailComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');

describe('CommentsRepositoryPostgres', () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('getCommentsByThreadId function', () => {
    it('should return thread details correctly', async () => {
      // Arrange
      const date = new Date('2024-05-05T20:56:24.259305');

      const expectedDetailThread = [
        new DetailComment({
          id: 'comment-32nfkoin',
          username: 'o23infokfn',
          createdAt: date,
          content: 'ini content komentar pertama',
          isDelete: date,
        }),
      ];

      await UsersTableTestHelper.addUser({
        id: 'user-o23infokfn',
        username: 'o23infokfn',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-o23nfo2i',
        owner: 'user-o23infokfn',
      });
      await CommentsTableTestHelper.addWithDeletingComment({
        id: 'comment-32nfkoin',
        threadId: 'thread-o23nfo2i',
        owner: 'user-o23infokfn',
        date,
        isDelete: date,
      });

      const commentRepositoryPostgres = new CommentsRepositoryPostgres(
        pool,
        {},
      );

      // Action
      const detailThread = await commentRepositoryPostgres.getCommentsByThreadId(
        'thread-o23nfo2i',
      );

      // Assert
      const thread = await CommentsTableTestHelper.findCommentByThreadId(
        'thread-o23nfo2i',
      );

      expect(detailThread).toStrictEqual(expectedDetailThread);
      expect(detailThread).toStrictEqual(thread);
    });
  });

  describe('addComment function', () => {
    it('should add a new comment and return it correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-cm223',
        username: 'cm223',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-cm245',
        owner: 'user-cm223',
      });

      const newComment = new AddingComment({
        content: 'xx',
        threadId: 'thread-cm245',
        owner: 'user-cm223',
      });

      const fakeIdGenerator = () => 'onvroin';
      const commentRepositoryPostgres = new CommentsRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );
      // Action and Assert
      const addedComment = await commentRepositoryPostgres.addComment(
        newComment,
        'thread-cm245',
        'user-cm223',
      );
      const comments = await CommentsTableTestHelper.findAddedCommentById(
        'comment-onvroin',
      );
      expect(addedComment).toStrictEqual(new AddedComment({
        id: 'comment-onvroin',
        content: 'xx',
        userId: 'user-cm223',
      }));
      expect(addedComment).toStrictEqual(comments);
      expect(comments).toBeDefined();
    });
  });

  describe('checkAvailabilityCommentId function', () => {
    it('should throw NotFoundError when the comment does not exist', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-i3ndo3wub',
        username: 'i3ndo3wub',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-3o2fnb',
        owner: 'user-i3ndo3wub',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-vwevv',
        threadId: 'thread-3o2fnb',
        owner: 'user-i3ndo3wub',
      });

      const commentRepositoryPostgres = new CommentsRepositoryPostgres(
        pool,
        {},
      );

      // Action and Assert
      const checkAvailabilityCommentId = commentRepositoryPostgres.checkAvailabilityCommentId('comment-xxx');
      await expect(checkAvailabilityCommentId).rejects.toThrowError(
        NotFoundError,
      );
    });

    it('should resolve if the comment exists', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-wevjvewvo',
        username: 'wevjvewvo',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-fwouhowq',
        owner: 'user-wevjvewvo',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-vewbjo02',
        threadId: 'thread-fwouhowq',
        owner: 'user-wevjvewvo',
      });

      const commentRepositoryPostgres = new CommentsRepositoryPostgres(
        pool,
        {},
      );

      // Action and Assert
      await expect(
        commentRepositoryPostgres.checkAvailabilityCommentId('comment-vewbjo02'),
      ).resolves.not.toThrowError(NotFoundError);
    });
  });

  describe('verifyCommentOwnerByUserId function', () => {
    it('should throw AuthorizationError when user is not the owner of the comment', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-oiefhoicn22',
        username: 'oiefhoicn22',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-oweuvbow8829',
        owner: 'user-oiefhoicn22',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-gh08243m8',
        threadId: 'thread-oweuvbow8829',
        owner: 'user-oiefhoicn22',
      });

      const commentRepositoryPostgres = new CommentsRepositoryPostgres(
        pool,
        {},
      );

      // Action and Assert
      await expect(
        commentRepositoryPostgres.verifyCommentOwnerByUserId(
          'comment-gh08243m8',
          'user-xxx',
        ),
      ).rejects.toThrowError(AuthorizationError);
    });

    it('should resolve when user is the owner of the comment', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-wpvojpwoe90398pik',
        username: 'wpvojpwoe90398pik',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-weovih2898ug',
        owner: 'user-wpvojpwoe90398pik',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-i3hfwo08',
        threadId: 'thread-weovih2898ug',
        owner: 'user-wpvojpwoe90398pik',
      });

      const commentRepositoryPostgres = new CommentsRepositoryPostgres(
        pool,
        {},
      );

      // Action and Assert
      await expect(
        commentRepositoryPostgres.verifyCommentOwnerByUserId(
          'comment-i3hfwo08',
          'user-wpvojpwoe90398pik',
        ),
      ).resolves.not.toThrowError(AuthorizationError);
    });
  });

  describe('deleteCommentById function', () => {
    it('should delete a comment correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-vfbfmtvv',
        username: 'vfbfmtvv',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-vklr',
        owner: 'user-vfbfmtvv',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-poiqwhiof',
        threadId: 'thread-vklr',
        owner: 'user-vfbfmtvv',
      });

      const commentRepositoryPostgres = new CommentsRepositoryPostgres(
        pool,
        {},
      );

      // Action and Assert
      await expect(
        commentRepositoryPostgres.deleteCommentById('comment-poiqwhiof'),
      ).resolves.not.toThrowError();
      const deletedComment = await CommentsTableTestHelper.findCommentById(
        'comment-poiqwhiof',
      );
      expect(deletedComment.isDelete).not.toBeNull();
    });
  });
});
