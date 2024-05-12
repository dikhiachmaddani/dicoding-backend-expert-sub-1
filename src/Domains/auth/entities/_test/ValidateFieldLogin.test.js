const ValidateFieldLogin = require('../ValidateFieldLogin');

describe('ValidateFieldLogin Entities', () => {
  it('should throw an error when the payload does not contain the required property', () => {
    // Arrange
    const payload = {
      username: 'dikhiachmaddani',
    };

    // Action and Assert
    expect(() => new ValidateFieldLogin(payload)).toThrowError(
      'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw an error when the payload does not meet the data type specification', () => {
    // Arrange
    const payload = {
      username: 'dikhiachmaddani',
      password: 20,
    };

    // Action and Assert
    expect(() => new ValidateFieldLogin(payload)).toThrowError(
      'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create a login object correctly', () => {
    // Arrange
    const payload = {
      username: 'dikhiachmaddani',
      password: 'password',
    };

    // Action
    const login = new ValidateFieldLogin(payload);

    // Assert
    expect(login.username).toEqual(payload.username);
    expect(login.password).toEqual(payload.password);
  });
});
