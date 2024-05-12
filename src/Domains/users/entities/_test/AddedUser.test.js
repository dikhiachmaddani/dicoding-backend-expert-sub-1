const AddedUser = require('../AddedUser');

describe('AddedUser entities', () => {
  it('should throw an error when payload does not contain the required property', () => {
    // Arrange
    const payload = {
      username: 'dikhiachmaddani',
      fullname: 'Dikhi Achmad Dani',
    };

    // Action and Assert
    expect(() => new AddedUser(payload)).toThrowError(
      'ADDED_USER.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw an error when payload does not meet the data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      username: 'dikhiachmaddani',
      fullname: 'Dikhi Achmad Dani',
    };

    // Action and Assert
    expect(() => new AddedUser(payload)).toThrowError(
      'ADDED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create addedUser object correctly', () => {
    // Arrange
    const payload = {
      id: 'user-237403',
      username: 'dikhiachmaddani',
      fullname: 'Dikhi Achmad Dani',
    };

    // Action
    const addedUser = new AddedUser(payload);

    // Assert
    expect(addedUser.id).toEqual(payload.id);
    expect(addedUser.username).toEqual(payload.username);
    expect(addedUser.fullname).toEqual(payload.fullname);
  });
});
