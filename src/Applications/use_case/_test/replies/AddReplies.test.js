const CommentsRepository = require('../../../../Domains/comments/CommentsRepository');
const AddingReplies = require('../../../../Domains/replies/entities/AddingReplies');
const ThreadsRepository = require('../../../../Domains/threads/ThreadsRepository');
const RepliesRepository = require('../../../../Domains/replies/RepliesRepository');
const AddedReplies = require('../../../../Domains/replies/entities/AddedReplies');
const RepliesUseCase = require('../../RepliesUseCase');

describe('Add Reply Test on RepliesUseCase', () => {
  it('should correctly handle adding a reply', async () => {
    // Arrange
    const payload = {
      content: 'ini content balasan pertama',
    };
    const params = {
      threadId: 'thread-666212',
      commentId: 'comment-666212',
      content: 'ini content balasan pertama',
    };
    const validateRepliesPayload = new AddingReplies(payload);
    const userId = 'user-666212';

    const expectedAddedReplies = new AddedReplies({
      id: 'reply-666212',
      content: payload.content,
      userId,
    });

    // Mocking
    const mockThreadRepository = new ThreadsRepository();
    const mockCommentRepository = new CommentsRepository();
    const mockRepliesRepository = new RepliesRepository();

    mockThreadRepository.checkAvailabilityThreadId = jest.fn(() => Promise.resolve());
    mockCommentRepository.checkAvailabilityCommentId = jest.fn(() => Promise.resolve());

    mockRepliesRepository.addReplies = jest.fn(() => Promise.resolve(
      new AddedReplies({
        id: 'reply-666212',
        content: payload.content,
        userId,
      }),
    ));

    // Create Use Case
    const repliesUseCase = new RepliesUseCase(
      mockThreadRepository,
      mockCommentRepository,
      mockRepliesRepository,
    );

    // Action
    const addedReplies = await repliesUseCase.addReplies(
      payload,
      params,
      userId,
    );

    // Assert
    expect(addedReplies).toStrictEqual(expectedAddedReplies);
    expect(mockThreadRepository.checkAvailabilityThreadId).toBeCalledWith(
      params.threadId,
    );
    expect(mockCommentRepository.checkAvailabilityCommentId).toBeCalledWith(
      params.commentId,
    );
    expect(mockRepliesRepository.addReplies).toBeCalledWith(
      validateRepliesPayload,
      params,
      userId,
    );
  });
});
