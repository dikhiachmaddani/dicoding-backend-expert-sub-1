const AddingReplies = require('../AddingReplies');

describe('AddingReplies entities', () => {
  it('should throw an error when payload does not contain necessary properties', () => {
    // Arrange
    const payload = {
      content: null,
    };

    // Action and Assert
    expect(() => new AddingReplies(payload)).toThrowError(
      'ADDING_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw an error when payload does not meet data type specification', () => {
    // Arrange
    const payload = {
      content: 23734,
    };

    // Action and Assert
    expect(() => new AddingReplies(payload)).toThrowError(
      'ADDING_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create the addedReplies object correctly', () => {
    // Arrange
    const payload = {
      content: 'no comment replies capt!',
    };

    // Action
    const addedReplies = new AddingReplies(payload);

    // Assert
    expect(addedReplies.content).toEqual(payload.content);
  });
});
