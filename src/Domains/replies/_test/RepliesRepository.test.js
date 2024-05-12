const RepliesRepository = require('../RepliesRepository');

describe('RepliesRepository Interface', () => {
  it('should throw an error when invoking abstract methods', async () => {
    // Arrange
    const replyRepository = new RepliesRepository();

    // Action
    const addReplies = replyRepository.addReplies({}, {}, '');
    const getRepliesByThreadId = replyRepository.getRepliesByThreadId('');
    const deleteRepliesById = replyRepository.deleteRepliesById('');
    const checkAvailabilityRepliesId = replyRepository.checkAvailabilityRepliesId('', '');
    const checkRepliesOwnerByUserId = replyRepository.checkRepliesOwnerByUserId('', '');

    // Assert
    await expect(addReplies).rejects.toThrowError(
      'REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(getRepliesByThreadId).rejects.toThrowError(
      'REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(deleteRepliesById).rejects.toThrowError(
      'REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(checkAvailabilityRepliesId)
      .rejects.toThrowError('REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(checkRepliesOwnerByUserId)
      .rejects.toThrowError('REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
