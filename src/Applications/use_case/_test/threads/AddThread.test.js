const CommentsRepository = require('../../../../Domains/comments/CommentsRepository');
const ThreadsRepository = require('../../../../Domains/threads/ThreadsRepository');
const RepliesRepository = require('../../../../Domains/replies/RepliesRepository');
const AddingThread = require('../../../../Domains/threads/entities/AddingThread');
const AddedThread = require('../../../../Domains/threads/entities/AddedThread');
const ThreadsUseCase = require('../../ThreadsUseCase');

describe('Add Thread Test on ThreadsUseCase', () => {
  it('should correctly handle adding a thread', async () => {
    // Arrange
    const payload = {
      title: 'ini title thread pertama',
      body: 'ini body thread pertama',
    };

    const validatePayloadThread = new AddingThread(payload);
    const userId = 'user-666212';

    const expectedAddedThread = new AddedThread({
      id: 'thread-666212',
      title: payload.title,
      userId,
    });

    /** creating dependency of use case */
    const mockThreadsRepository = new ThreadsRepository();
    const mockCommentsRepository = new CommentsRepository();
    const mockRepliesRepository = new RepliesRepository();

    /** mocking needed function */
    mockThreadsRepository.addThread = jest.fn(() => Promise.resolve(
      new AddedThread({
        id: 'thread-666212',
        title: payload.title,
        userId,
      }),
    ));

    /** creating use case instance */
    const addThreadUseCase = new ThreadsUseCase(
      mockThreadsRepository,
      mockCommentsRepository,
      mockRepliesRepository,
    );

    // Action
    const addedThread = await addThreadUseCase.addThread(
      payload,
      userId,
    );

    // Assert
    expect(addedThread).toStrictEqual(expectedAddedThread);
    expect(mockThreadsRepository.addThread).toBeCalledWith(
      validatePayloadThread,
      userId,
    );
  });
});
