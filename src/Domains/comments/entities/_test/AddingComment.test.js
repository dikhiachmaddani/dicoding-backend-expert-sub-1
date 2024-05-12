const AddingComment = require('../AddingComment');

describe('AddingComment Entities', () => {
  it('should throw an error when the payload does not contain the required property', () => {
    // Arrange
    const payload = {};

    // Action and Assert
    expect(() => new AddingComment(payload)).toThrowError(
      'ADDING_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw an error when the payload does not meet the data type specification', () => {
    // Arrange
    const payload = {
      content: {},
    };

    // Action and Assert
    expect(() => new AddingComment(payload)).toThrowError(
      'ADDING_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create the AddingComment object correctly', () => {
    // Arrange
    const payload = {
      content: 'sebuah comment',
    };

    // Action
    const newComment = new AddingComment(payload);

    // Assert
    expect(newComment.content).toEqual(payload.content);
  });
});
