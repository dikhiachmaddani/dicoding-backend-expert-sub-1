const ThreadsRepository = require('../ThreadsRepository');

describe('ThreadsRepository interface', () => {
  it('should throw an error when invoking abstract methods', async () => {
    // Arrange
    const threadRepository = new ThreadsRepository();

    // Action
    const getThreadById = threadRepository.getThreadById({});
    const addThread = threadRepository.addThread({});
    const checkAvailabilityThreadId = threadRepository.checkAvailabilityThreadId({});

    // Assert
    await expect(getThreadById).rejects.toThrowError(
      'THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(addThread).rejects.toThrowError(
      'THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(checkAvailabilityThreadId).rejects.toThrowError(
      'THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
