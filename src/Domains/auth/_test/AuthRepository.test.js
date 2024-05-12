const AuthRepository = require('../AuthRepository');

describe('AuthRepository Interface', () => {
  it('should throw an error when invoking abstract methods', async () => {
    // Arrange
    const authRepository = new AuthRepository();

    // Action and Assert
    const addToken = authRepository.addToken({});
    const checkAvailabilityToken = authRepository.checkAvailabilityToken({});
    const deleteToken = authRepository.deleteToken({});
    await expect(addToken).rejects.toThrowError(
      'AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(checkAvailabilityToken).rejects.toThrowError(
      'AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(deleteToken).rejects.toThrowError(
      'AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
