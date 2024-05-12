const ValidateFieldNewAuthToken = require('../ValidateFieldNewAuthToken');

describe('ValidateFieldNewAuthToken Entities', () => {
  it('should throw an error when the payload does not contain the required property', () => {
    // Arrange
    const payload = {
      accessToken: 'asasdfgrehueghaurgpuhraghuoihfisudfiu',
    };

    // Action and Assert
    expect(() => new ValidateFieldNewAuthToken(payload)).toThrowError(
      'NEW_AUTHENTICATION.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw an error when the payload does not meet the data type specification', () => {
    // Arrange
    const payload = {
      accessToken: 'ijgsduuewigaewiugweougiewfgowei',
      refreshToken: 1,
    };

    // Action and Assert
    expect(() => new ValidateFieldNewAuthToken(payload)).toThrowError(
      'NEW_AUTHENTICATION.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create a generateToken object correctly', () => {
    // Arrange
    const payload = {
      accessToken: 'ijgsduuewigaewiugweougiewfgowei',
      refreshToken: 'ijgsduuewigaewiugweougiewfgowei',
    };

    // Action
    const generateToken = new ValidateFieldNewAuthToken(payload);

    // Assert
    expect(generateToken.accessToken).toEqual(payload.accessToken);
    expect(generateToken.refreshToken).toEqual(payload.refreshToken);
  });
});
