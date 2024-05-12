const DetailReplies = require('../DetailReplies');

describe('DetailReplies entities', () => {
  it('should throw an error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'comment-23412',
      createdAt: new Date('2024-05-05T20:56:24.259305'),
      content: 'no comment capt',
      isDelete: new Date('2024-05-05T20:56:24.259305'),
    };

    // Action and Assert
    expect(() => new DetailReplies(payload)).toThrowError(
      'DETAIL_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw an error when payload does not meet data type specifications', () => {
    // Arrange
    const payload = {
      id: 21414,
      username: 'dandana',
      createdAt: new Date('2024-05-05T20:56:24.259305'),
      content: 'no comment capt',
      isDelete: new Date('2024-05-05T20:56:24.259305'),
      commentId: 1,
    };

    // Action and Assert
    expect(() => new DetailReplies(payload)).toThrowError(
      'DETAIL_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create a validateDetailComment object correctly', () => {
    // Arrange
    const payload = {
      id: 'reply-23412',
      username: 'dandana',
      createdAt: new Date('2024-05-05T20:56:24.259305'),
      content: 'no comment capt',
      isDelete: new Date('2024-05-05T20:56:24.259305'),
      commentId: 'comment-39340',
    };

    // Action
    const validateDetailComment = new DetailReplies(payload);

    // Assert
    expect(validateDetailComment.id).toEqual(payload.id);
    expect(validateDetailComment.username).toEqual(payload.username);
    expect(validateDetailComment.date).toEqual(payload.createdAt);
    expect(validateDetailComment.content).toEqual(payload.content);
    expect(validateDetailComment.isDelete).toEqual(payload.isDelete);
    expect(validateDetailComment.commentId).toEqual(payload.commentId);
  });
});
