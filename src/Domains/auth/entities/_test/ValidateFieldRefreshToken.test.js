const ValidateFieldRefreshToken = require('../ValidateFieldRefreshToken');

describe('ValidateFieldRefreshToken Entities', () => {
  it('should throw an error when the payload does not contain the required property', () => {
    // Arrange
    // Arrange
    const payload = {
      refreshToken: null,
    };

    // Action and Assert
    expect(() => new ValidateFieldRefreshToken(payload)).toThrowError(
      'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN',
    );
  });

  it('should throw an error when the payload does not meet the data type specification', () => {
    // Arrange
    const payload = {
      refreshToken: 1,
    };

    // Action and Assert
    expect(() => new ValidateFieldRefreshToken(payload)).toThrowError(
      'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create a generateToken object correctly', () => {
    // Arrange
    const payload = {
      refreshToken: 'ijgsduuewigaewiugweougiewfgowei',
    };

    // Action
    const generateToken = new ValidateFieldRefreshToken(payload);

    // Assert
    expect(generateToken.refreshToken).toEqual(payload.refreshToken);
  });
});
