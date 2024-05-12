const bcrypt = require('bcrypt');
const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError');
const BcryptEncryptionHelper = require('../BcryptPasswordHash');

describe('BcryptEncryptionHelper', () => {
  describe('hash function', () => {
    it('should encrypt password correctly', async () => {
      // Arrange
      const spyHash = jest.spyOn(bcrypt, 'hash');
      const bcryptEncryptionHelper = new BcryptEncryptionHelper(bcrypt);

      // Action
      const encryptedPassword = await bcryptEncryptionHelper.hash('hash_pass');

      // Assert
      expect(typeof encryptedPassword).toEqual('string');
      expect(encryptedPassword).not.toEqual('hash_pass');
      expect(spyHash).toBeCalledWith('hash_pass', 10);
    });
  });

  describe('comparePassword function', () => {
    it('should throw AuthenticationError if password does not match', async () => {
      // Arrange
      const bcryptEncryptionHelper = new BcryptEncryptionHelper(bcrypt);

      // Action
      const comparePassword = bcryptEncryptionHelper.comparePassword('hash_pass', 'encrypted_password');

      // Assert
      await expect(comparePassword).rejects.toThrow(AuthenticationError);
    });

    it('should not return AuthenticationError if password matches', async () => {
      // Arrange
      const bcryptEncryptionHelper = new BcryptEncryptionHelper(bcrypt);
      const plainPassword = 'secret';
      const encryptedPassword = await bcryptEncryptionHelper.hash(plainPassword);

      // Action
      const comparePassword = bcryptEncryptionHelper.comparePassword(
        plainPassword,
        encryptedPassword,
      );

      // Assert
      await expect(comparePassword).resolves.not.toThrow(AuthenticationError);
    });
  });
});
