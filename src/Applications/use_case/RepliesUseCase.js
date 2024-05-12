const AddingReplies = require('../../Domains/replies/entities/AddingReplies');

class RepliesUseCase {
  constructor(threadRepository, commentRepository, repliesRepository) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._repliesRepository = repliesRepository;
  }

  async addReplies(useCasePayload, useCaseParams, userId) {
    const { threadId, commentId } = useCaseParams;

    await this._threadRepository.checkAvailabilityThreadId(threadId);
    await this._commentRepository.checkAvailabilityCommentId(commentId);

    const addingReplies = new AddingReplies(useCasePayload);
    return this._repliesRepository.addReplies(
      addingReplies,
      useCaseParams,
      userId,
    );
  }

  async deleteReplies(useCaseParams, userId) {
    const { threadId, commentId, replyId } = useCaseParams;

    await this._threadRepository.checkAvailabilityThreadId(threadId);
    await this._commentRepository.checkAvailabilityCommentId(commentId);
    await this._repliesRepository.checkAvailabilityRepliesId(replyId);

    await this._repliesRepository.checkRepliesOwnerByUserId(replyId, userId);

    return this._repliesRepository.deleteRepliesById(replyId);
  }
}

module.exports = RepliesUseCase;
