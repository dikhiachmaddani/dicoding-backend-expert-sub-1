const AddedReplies = require('../AddedReplies');

describe('AddedReplies entities', () => {
  it('should throw an error when payload does not contain necessary properties', () => {
    // Arrange
    const payload = {
      id: 'replies-83h8f8',
      content: 'no comment replies capt!',
    };

    // Action and Assert
    expect(() => new AddedReplies(payload)).toThrowError(
      'ADDED_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw an error when payload does not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 9283479,
      content: 'no comment replies capt!',
      userId: 'user-3829hf398',
    };

    // Action and Assert
    expect(() => new AddedReplies(payload)).toThrowError(
      'ADDED_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create the addedThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'replies-9283479',
      content: 'no comment replies capt!',
      userId: 'user-3829hf398',
    };

    // Action
    const addedThread = new AddedReplies(payload);

    // Assert
    expect(addedThread.id).toEqual(payload.id);
    expect(addedThread.content).toEqual(payload.content);
    expect(addedThread.owner).toEqual(payload.userId);
  });
});
