const AddingThread = require('../AddingThread');

describe('AddingThread entities', () => {
  it('should throw an error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'thread saya capt!',
    };

    // Action and Assert
    expect(() => new AddingThread(payload)).toThrowError(
      'ADDING_THREAD.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw an error when payload does not meet data type specifications', () => {
    // Arrange
    const payload = {
      title: 124124,
      body: 12412,
    };

    // Action and Assert
    expect(() => new AddingThread(payload)).toThrowError(
      'ADDING_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create an AddingThread object correctly', () => {
    // Arrange
    const payload = {
      title: 'thread saya capt!',
      body: 'pengen beli truck',
    };

    // Action
    const validateAddThread = new AddingThread(payload);

    // Assert
    expect(validateAddThread.title).toEqual(payload.title);
    expect(validateAddThread.body).toEqual(payload.body);
  });
});
