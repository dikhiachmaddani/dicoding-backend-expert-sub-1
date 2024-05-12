const DetailComment = require('../DetailComment');

describe('DetailComment entities', () => {
  it('should throw an error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'comment-23412',
      createdAt: new Date('2024-05-05T20:56:24.259305'),
      content: 'no comment capt',
      isDelete: new Date('2024-05-05T20:56:24.259305'),
    };

    // Action and Assert
    expect(() => new DetailComment(payload)).toThrowError(
      'DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY',
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
    };

    // Action and Assert
    expect(() => new DetailComment(payload)).toThrowError(
      'DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create a validateDetailComment object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-23412',
      username: 'dandana',
      createdAt: new Date('2024-05-05T20:56:24.259305'),
      content: 'no comment capt',
      isDelete: new Date('2024-05-05T20:56:24.259305'),
    };

    // Action
    const validateDetailComment = new DetailComment(payload);

    // Assert
    expect(validateDetailComment.id).toEqual(payload.id);
    expect(validateDetailComment.username).toEqual(payload.username);
    expect(validateDetailComment.date).toEqual(payload.createdAt);
    expect(validateDetailComment.content).toEqual(payload.content);
    expect(validateDetailComment.isDelete).toEqual(payload.isDelete);
  });
});
