const CommentsRepository = require('../CommentsRepository');

describe('CommentsRepository Interface', () => {
  it('should throw an error when invoking abstract methods', async () => {
    // Arrange
    const commentRepository = new CommentsRepository();

    // Action
    const getCommentsByThreadId = commentRepository.getCommentsByThreadId('');
    const checkAvailabilityCommentId = commentRepository.checkAvailabilityCommentId('', '');
    const deleteCommentById = commentRepository.deleteCommentById({}, '');
    const verifyCommentOwnerByUserId = commentRepository.verifyCommentOwnerByUserId('', '');
    // Assert
    await expect(commentRepository.addComment('', '', '')).rejects.toThrowError(
      'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(getCommentsByThreadId).rejects.toThrowError(
      'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(checkAvailabilityCommentId).rejects.toThrowError(
      'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(deleteCommentById).rejects.toThrowError(
      'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(verifyCommentOwnerByUserId).rejects.toThrowError(
      'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
