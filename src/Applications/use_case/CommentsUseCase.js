const AddingComment = require('../../Domains/comments/entities/AddingComment');

class CommentsUseCase {
  constructor(threadsRepository, commentsRepository) {
    this._threadsRepository = threadsRepository;
    this._commentsRepository = commentsRepository;
  }

  async addComment(useCasePayload, usecaseParams, userId) {
    const { threadId } = usecaseParams;
    const validateComment = new AddingComment(useCasePayload);

    await this._threadsRepository.checkAvailabilityThreadId(threadId);

    return this._commentsRepository.addComment(
      validateComment,
      threadId,
      userId,
    );
  }

  async deleteComment(usecaseParams, userId) {
    const { threadId, commentId } = usecaseParams;

    await this._threadsRepository.checkAvailabilityThreadId(threadId);
    await this._commentsRepository.checkAvailabilityCommentId(commentId);
    await this._commentsRepository.verifyCommentOwnerByUserId(
      commentId,
      userId,
    );

    return this._commentsRepository.deleteCommentById(commentId);
  }
}

module.exports = CommentsUseCase;
