const PasswordHash = require('../PasswordHash');

describe('PasswordHash interface', () => {
  it('should throw an error when attempting to use abstract methods', async () => {
    // Arrange
    const passwordHash = new PasswordHash();

    // Action
    const hash = passwordHash.hash('password');
    // Assert
    await expect(hash).rejects.toThrowError(
      'PASSWORD_HASH.METHOD_NOT_IMPLEMENTED',
    );
  });
});
