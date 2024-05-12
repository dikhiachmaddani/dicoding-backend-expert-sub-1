const DetailThread = require('../DetailThread');

describe('DetailThread entities', () => {
  it('should throw an error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'my new thread nich!',
      body: 'no Capt!',
    };

    // Action and Assert
    expect(() => new DetailThread(payload)).toThrowError(
      'DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw an error when payload does not meet data type specifications', () => {
    // Arrange
    const payload = {
      id: 203702383,
      title: 'my new thread nich!',
      body: {},
      createdAt: '2024',
      username: {},
    };

    // Action and Assert
    expect(() => new DetailThread(payload)).toThrowError(
      'DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create a validateDetailThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-203702383',
      title: 'my new thread nich!',
      body: 'no Capt!',
      createdAt: new Date('2024-05-05T20:56:24.259305'),
      username: 'dikhiachmaddani',
    };

    // Action
    const validateDetailThread = new DetailThread(payload);

    // Assert
    expect(validateDetailThread.id).toEqual(payload.id);
    expect(validateDetailThread.title).toEqual(payload.title);
    expect(validateDetailThread.body).toEqual(payload.body);
    expect(validateDetailThread.date).toEqual(payload.createdAt);
    expect(validateDetailThread.username).toEqual(payload.username);
  });
});
