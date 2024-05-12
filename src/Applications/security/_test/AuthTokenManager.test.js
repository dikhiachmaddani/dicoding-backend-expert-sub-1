const AuthTokenManager = require('../AuthTokenManager');

describe('AuthTokenManager interface', () => {
  it('should throw an error when attempting to use abstract methods', async () => {
    // Arrange
    const authTokenManager = new AuthTokenManager();

    // Action
    const createAccessToken = authTokenManager.createAccessToken('');
    const createRefreshToken = authTokenManager.createRefreshToken('');
    const verifyRefreshToken = authTokenManager.verifyRefreshToken('');
    const decodePayload = authTokenManager.decodePayload('');

    // Assert
    await expect(createAccessToken).rejects.toThrowError(
      'AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED',
    );
    await expect(createRefreshToken).rejects.toThrowError(
      'AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED',
    );
    await expect(verifyRefreshToken).rejects.toThrowError(
      'AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED',
    );
    await expect(decodePayload).rejects.toThrowError(
      'AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED',
    );
  });
});
