const GetAllDetailThread = require('../../../../Domains/threads/entities/GetAllDetailThread');
const CommentsRepository = require('../../../../Domains/comments/CommentsRepository');
const ThreadsRepository = require('../../../../Domains/threads/ThreadsRepository');
const RepliesRepository = require('../../../../Domains/replies/RepliesRepository');
const ThreadsUseCase = require('../../ThreadsUseCase');
const DetailThread = require('../../../../Domains/threads/entities/DetailThread');
const DetailComment = require('../../../../Domains/comments/entities/DetailComment');
const DetailReplies = require('../../../../Domains/replies/entities/DetailReplies');

describe('Get Thread Detail Test on ThreadsUseCase', () => {
  it('should correctly orchestrate getting thread detail', async () => {
    // Arrange
    const threadId = 'thread-666212';
    const date = new Date('2024-05-05T20:56:24.259305');
    const threadResult = new DetailThread({
      id: 'thread-666212',
      title: 'ini judul thread pertama',
      body: 'ini body thread pertama',
      createdAt: date,
      username: 'dikhiachmaddani',
    });
    const commentsResult = [
      new DetailComment({
        id: 'comment-666212',
        username: 'user A',
        createdAt: date,
        content: 'ini komentar A',
        isDelete: date,
      }),
      new DetailComment({
        id: 'comment-2333',
        username: 'user A',
        createdAt: date,
        content: 'ini komentar A',
        isDelete: null,
      }),
    ];
    const repliesResult = [
      new DetailReplies({
        id: 'reply-4124',
        username: 'user C',
        createdAt: date,
        content: 'ini balasan komentar A',
        isDelete: null,
        commentId: 'comment-666212',
      }),
      new DetailReplies({
        id: 'reply-42155',
        username: 'user C',
        createdAt: date,
        content: 'ini balasan komentar A',
        isDelete: date,
        commentId: 'comment-666212',
      }),
      new DetailReplies({
        id: 'reply-666212',
        username: 'user C',
        createdAt: date,
        content: 'ini balasan komentar A',
        isDelete: date,
        commentId: 'comment-2333',
      }),
    ];
    const detailedCommentResult = commentsResult.map((comment) => ({
      id: comment.id,
      username: comment.username,
      date: comment.date,
      replies: repliesResult
        .filter((replies) => replies.commentId === comment.id)
        .map((replies) => ({
          id: replies.id,
          content:
            replies.isDelete != null
              ? '**balasan telah dihapus**'
              : replies.content,
          date: replies.date,
          username: replies.username,
        })),
      content:
        comment.isDelete != null
          ? '**komentar telah dihapus**'
          : comment.content,
    }));
    const expectationsDetailThread = new GetAllDetailThread({
      ...threadResult,
      comments: detailedCommentResult,
    });

    // Mocking
    const mockThreadsRepository = new ThreadsRepository();
    const mockCommentsRepository = new CommentsRepository();
    const mockRepliesRepository = new RepliesRepository();

    mockThreadsRepository.checkAvailabilityThreadId = jest.fn(() => Promise.resolve());
    mockThreadsRepository.getThreadById = jest.fn(() => Promise.resolve(threadResult));
    mockCommentsRepository.getCommentsByThreadId = jest.fn(() => Promise.resolve(commentsResult));
    mockRepliesRepository.getRepliesByThreadId = jest.fn(() => Promise.resolve(repliesResult));

    // Create Use Case
    const threadUseCase = new ThreadsUseCase(
      mockThreadsRepository,
      mockCommentsRepository,
      mockRepliesRepository,
    );

    // Action
    const useCaseResult = await threadUseCase.getThread(threadId);

    // Assert
    expect(useCaseResult).toStrictEqual(expectationsDetailThread);
    expect(useCaseResult.comments).toHaveLength(2);
    expect(useCaseResult.comments[0].replies).toHaveLength(2);
    expect(useCaseResult.comments[1].replies).toHaveLength(1);
    expect(mockThreadsRepository.checkAvailabilityThreadId).toBeCalledWith(
      threadId,
    );
    expect(mockThreadsRepository.getThreadById).toBeCalledWith(threadId);
    expect(mockCommentsRepository.getCommentsByThreadId).toBeCalledWith(
      threadId,
    );
    expect(mockRepliesRepository.getRepliesByThreadId).toBeCalledWith(threadId);
  });
});
