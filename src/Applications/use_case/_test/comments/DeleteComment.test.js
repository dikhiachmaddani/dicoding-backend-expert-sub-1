const CommentsRepository = require('../../../../Domains/comments/CommentsRepository');
const ThreadsRepository = require('../../../../Domains/threads/ThreadsRepository');
const CommentsUseCase = require('../../CommentsUseCase');

describe('Delete Comment Test on CommentsUseCase', () => {
  it('should correctly handle deleting a comment', async () => {
    // Arrange
    const userId = 'user-666212';

    const params = {
      threadId: 'thread-666212',
      commentId: 'comment-666212',
    };

    // Mocking
    const mockCommentRepository = new CommentsRepository();
    const mockThreadRepository = new ThreadsRepository();

    mockThreadRepository.checkAvailabilityThreadId = jest.fn(() => Promise.resolve());
    mockCommentRepository.checkAvailabilityCommentId = jest.fn(() => Promise.resolve());
    mockCommentRepository.verifyCommentOwnerByUserId = jest.fn(() => Promise.resolve());
    mockCommentRepository.deleteCommentById = jest.fn(() => Promise.resolve());

    // Create Use Case
    const deleteCommentUseCase = new CommentsUseCase(
      mockThreadRepository,
      mockCommentRepository,
    );

    // Action & Assert
    await expect(deleteCommentUseCase.deleteComment(
      params,
      userId,
    )).resolves.not.toThrowError();

    expect(mockThreadRepository.checkAvailabilityThreadId).toBeCalledWith(
      params.threadId,
    );
    expect(mockCommentRepository.checkAvailabilityCommentId).toBeCalledWith(
      params.commentId,
    );
    expect(mockCommentRepository.verifyCommentOwnerByUserId).toBeCalledWith(
      params.commentId,
      userId,
    );
    expect(mockCommentRepository.deleteCommentById).toBeCalledWith(
      params.commentId,
    );
  });
});
