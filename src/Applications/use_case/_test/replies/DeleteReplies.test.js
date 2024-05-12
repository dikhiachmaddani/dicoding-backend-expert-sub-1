const CommentsRepository = require('../../../../Domains/comments/CommentsRepository');
const ThreadsRepository = require('../../../../Domains/threads/ThreadsRepository');
const RepliesRepository = require('../../../../Domains/replies/RepliesRepository');
const AddedReplies = require('../../../../Domains/replies/entities/AddedReplies');
const RepliesUseCase = require('../../RepliesUseCase');

describe('Delete Reply Test on RepliesUseCase', () => {
  it('should correctly handle deleting a reply', async () => {
    // Arrange
    const payload = {
      content: 'No Capt :)',
    };
    const params = {
      threadId: 'thread-666212',
      commentId: 'comment-666212',
      replyId: 'reply-666212',
    };
    const userId = 'user-666212';

    // Mocking
    const mockThreadRepository = new ThreadsRepository();
    const mockCommentRepository = new CommentsRepository();
    const mockRepliesRepository = new RepliesRepository();

    mockThreadRepository.checkAvailabilityThreadId = jest.fn(() => Promise.resolve());
    mockCommentRepository.checkAvailabilityCommentId = jest.fn(() => Promise.resolve());
    mockRepliesRepository.checkAvailabilityRepliesId = jest.fn(() => Promise.resolve());
    mockRepliesRepository.checkRepliesOwnerByUserId = jest.fn(() => Promise.resolve());
    mockRepliesRepository.deleteRepliesById = jest.fn(() => Promise.resolve());

    mockRepliesRepository.addReplies = jest.fn(() => Promise.resolve(
      new AddedReplies({
        id: 'reply-666212',
        content: payload.content,
        owner: userId,
      }),
    ));

    // Create Use Case
    const repliesUseCase = new RepliesUseCase(
      mockThreadRepository,
      mockCommentRepository,
      mockRepliesRepository,
    );

    // Action & Assert
    await expect(repliesUseCase.deleteReplies(
      params,
      userId,
    )).resolves.not.toThrowError();
    expect(mockThreadRepository.checkAvailabilityThreadId).toBeCalledWith(
      params.threadId,
    );
    expect(mockCommentRepository.checkAvailabilityCommentId).toBeCalledWith(
      params.commentId,
    );
    expect(mockRepliesRepository.checkAvailabilityRepliesId).toBeCalledWith(
      params.replyId,
    );
    expect(mockRepliesRepository.checkRepliesOwnerByUserId).toBeCalledWith(
      params.replyId,
      userId,
    );
    expect(mockRepliesRepository.deleteRepliesById).toBeCalledWith(
      params.replyId,
    );
  });
});
