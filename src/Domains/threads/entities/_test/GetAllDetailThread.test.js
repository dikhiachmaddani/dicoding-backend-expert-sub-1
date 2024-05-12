const GetAllDetailThread = require('../GetAllDetailThread');

describe('GetAllDetailThread entities', () => {
  it('should throw an error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'my new thread nich!',
      body: 'no Capt!',
    };

    // Action and Assert
    expect(() => new GetAllDetailThread(payload)).toThrowError(
      'GET_DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw an error when payload does not meet data type specifications', () => {
    // Arrange
    const payload = {
      id: 203702383,
      title: 'my new thread nich!',
      body: {},
      date: '2024',
      username: {},
      comments: 'get rich nigg!',
    };

    // Action and Assert
    expect(() => new GetAllDetailThread(payload)).toThrowError(
      'GET_DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create a validateDetailThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-203702383',
      title: 'my new thread nich!',
      body: 'no Capt!',
      date: new Date('2024-05-05T20:56:24.259305'),
      username: 'dikhiachmaddani',
      comments: [],
    };

    // Action
    const validateDetailThread = new GetAllDetailThread(payload);

    // Assert
    expect(validateDetailThread.id).toEqual(payload.id);
    expect(validateDetailThread.title).toEqual(payload.title);
    expect(validateDetailThread.body).toEqual(payload.body);
    expect(validateDetailThread.date).toEqual(payload.date);
    expect(validateDetailThread.username).toEqual(payload.username);
    expect(validateDetailThread.comments).toEqual(payload.comments);
  });
});
