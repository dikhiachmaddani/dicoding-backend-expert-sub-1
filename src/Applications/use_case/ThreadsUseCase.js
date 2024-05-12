const AddingThread = require('../../Domains/threads/entities/AddingThread');
const GetAllDetailThread = require('../../Domains/threads/entities/GetAllDetailThread');

class ThreadsUseCase {
  constructor(threadRepository, commentsRepository, repliesRepository) {
    this._threadRepository = threadRepository;
    this._commentsRepository = commentsRepository;
    this._repliesRepository = repliesRepository;
  }

  async getThread(threadId) {
    await this._threadRepository.checkAvailabilityThreadId(threadId);

    const detailedThreadResult = await this._threadRepository.getThreadById(threadId);
    const commentsResult = await this._commentsRepository.getCommentsByThreadId(threadId);
    const repliesResult = await this._repliesRepository.getRepliesByThreadId(threadId);

    const detailedCommentResult = commentsResult.map((comment) => ({
      id: comment.id,
      username: comment.username,
      date: comment.date,
      replies: repliesResult
        .filter((replies) => replies.commentId === comment.id)
        .map((replies) => ({
          id: replies.id,
          content: replies.isDelete != null ? '**balasan telah dihapus**' : replies.content,
          date: replies.date,
          username: replies.username,
        })),
      content: comment.isDelete != null ? '**komentar telah dihapus**' : comment.content,
    }));
    return new GetAllDetailThread({
      ...detailedThreadResult,
      comments: detailedCommentResult,
    });
  }

  async addThread(useCasePayload, userId) {
    const validateThread = new AddingThread(useCasePayload);

    return this._threadRepository.addThread(validateThread, userId);
  }
}

module.exports = ThreadsUseCase;
