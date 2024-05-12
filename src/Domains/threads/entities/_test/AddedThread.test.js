const AddedThread = require('../AddedThread');

describe('AddedThread entities', () => {
  it('should throw an error when payload does not contain needed properties', () => {
    // Arrange
    const payload = {
      id: 'thread-32ohr23ou',
      title: 'thread guah nih!',
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError(
      'ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw an error when payload does not meet data type specifications', () => {
    // Arrange
    const payload = {
      id: 823469215,
      title: 'thread guah nih!',
      userId: 'user-uwefbiuwefg',
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError(
      'ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create an validateAddedThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-823469215',
      title: 'thread guah nih!',
      userId: 'user-uwefbiuwefg',
    };

    // Action
    const validateAddedThread = new AddedThread(payload);

    // Assert
    expect(validateAddedThread.id).toEqual(payload.id);
    expect(validateAddedThread.title).toEqual(payload.title);
    expect(validateAddedThread.owner).toEqual(payload.userId);
  });
});
