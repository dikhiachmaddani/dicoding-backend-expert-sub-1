const AddingUser = require('../AddingUser');

describe('AddingUser entities', () => {
  it('should throw an error when payload does not contain the required property', () => {
    // Arrange
    const payload = {
      username: 'baigon',
      password: 'baigon',
    };

    // Action and Assert
    expect(() => new AddingUser(payload)).toThrowError(
      'ADDING_USER.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw an error when payload does not meet the data type specification', () => {
    // Arrange
    const payload = {
      username: 1928642,
      fullname: 1251,
      password: 'baigon',
    };
    // Action and Assert
    expect(() => new AddingUser(payload)).toThrowError(
      'ADDING_USER.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should throw an error when the username contains more than 50 characters', () => {
    // Arrange
    const payload = {
      username: 'dicodingindonesiadicodingindonesiadicodingindonesiadicoding',
      fullname: 'Dikhi Achmad Dani',
      password: 'baigon',
    };
    // Action and Assert
    expect(() => new AddingUser(payload)).toThrowError(
      'ADDING_USER.USERNAME_LIMIT_CHAR',
    );
  });

  it('should throw an error when the username contains restricted characters', () => {
    // Arrange
    const payload = {
      username: 'diki acmed',
      fullname: 'dikhiachmaddani',
      password: 'baigon',
    };
    // Action and Assert
    expect(() => new AddingUser(payload)).toThrowError(
      'ADDING_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER',
    );
  });

  it('should create a addingUser object correctly', () => {
    // Arrange
    const payload = {
      username: 'dikhiachmaddani',
      fullname: 'Dikhi Achmad Dani',
      password: 'baigon',
    };
    // Action
    const { username, fullname, password } = new AddingUser(payload);
    // Assert
    expect(username).toEqual(payload.username);
    expect(fullname).toEqual(payload.fullname);
    expect(password).toEqual(payload.password);
  });
});
