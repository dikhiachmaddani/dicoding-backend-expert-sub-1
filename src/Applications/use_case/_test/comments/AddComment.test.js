const CommentsRepository = require('../../../../Domains/comments/CommentsRepository');
const AddingComment = require('../../../../Domains/comments/entities/AddingComment');
const AddedComment = require('../../../../Domains/comments/entities/AddedComment');
const ThreadsRepository = require('../../../../Domains/threads/ThreadsRepository');
const CommentsUseCase = require('../../CommentsUseCase');

describe('Add New Comment Test on CommentsUseCase', () => {
  it('should correctly handle adding a new comment', async () => {
    // Arrange
    const payload = {
      content: 'hellow guys!',
    };
    const params = {
      threadId: 'thread-666212',
    };
    const userId = 'user-666212';
    const validatePayloadComment = new AddingComment(payload);

    const expectedAddedComment = new AddedComment({
      id: 'comment-666212',
      content: payload.content,
      userId,
    });

    // Mocking
    const mockCommentRepository = new CommentsRepository();
    const mockThreadRepository = new ThreadsRepository();

    mockThreadRepository.checkAvailabilityThreadId = jest.fn(() => Promise.resolve());

    mockCommentRepository.addComment = jest.fn(() => Promise.resolve(
      new AddedComment({
        id: 'comment-666212',
        content: payload.content,
        userId,
      }),
    ));

    // Create Use Case
    const addCommentUseCase = new CommentsUseCase(
      mockThreadRepository,
      mockCommentRepository,
    );

    // Action
    const addedComment = await addCommentUseCase.addComment(
      payload,
      params,
      userId,
    );

    // Assert
    expect(addedComment).toStrictEqual(expectedAddedComment);
    expect(mockThreadRepository.checkAvailabilityThreadId).toBeCalledWith(
      params.threadId,
    );
    expect(mockCommentRepository.addComment).toBeCalledWith(
      validatePayloadComment,
      params.threadId,
      userId,
    );
  });
});
