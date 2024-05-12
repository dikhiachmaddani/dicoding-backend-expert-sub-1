const AddedComment = require('../AddedComment');

describe('AddedComment Entities', () => {
  it('should throw an error when the payload does not contain the required property', () => {
    // Arrange
    const payload = {
      content: 'no comment capt',
      userId: 'user-937764',
    };

    // Action and Assert
    expect(() => new AddedComment(payload)).toThrowError(
      'ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw an error when the payload does not meet the data type specification', () => {
    // Arrange
    const payload = {
      id: 23344,
      content: 'no comment capt',
      userId: {},
    };

    // Action and Assert
    expect(() => new AddedComment(payload)).toThrowError(
      'ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create the addedComment object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-23344',
      content: 'no comment capt',
      userId: 'user-937764',
    };

    // Action
    const addedComment = new AddedComment(payload);

    // Assert
    expect(addedComment.id).toEqual(payload.id);
    expect(addedComment.content).toEqual(payload.content);
    expect(addedComment.owner).toEqual(payload.userId);
  });
});
