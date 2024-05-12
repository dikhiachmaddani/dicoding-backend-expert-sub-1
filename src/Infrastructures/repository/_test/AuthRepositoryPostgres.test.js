const pool = require('../../database/postgres/pool');
const AuthRepositoryPostgres = require('../AuthRepositoryPostgres');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const AuthTableTestHelper = require('../../../../tests/AuthTableTestHelper');

describe('AuthRepositoryPostgres', () => {
  afterEach(async () => {
    await AuthTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addToken function', () => {
    it('should add token to the database', async () => {
      // Arrange
      const authenticationRepository = new AuthRepositoryPostgres(pool);
      const token = 'token';

      // Action
      await authenticationRepository.addToken(token);

      // Assert
      const tokens = await AuthTableTestHelper.findToken(token);
      expect(tokens).toHaveLength(1);
      expect(tokens[0].token).toBe(token);
    });
  });

  describe('deleteToken function', () => {
    it('should delete token from the database', async () => {
      // Arrange
      const authenticationRepository = new AuthRepositoryPostgres(pool);
      const token = 'token';
      await AuthTableTestHelper.addToken(token);

      // Action
      await authenticationRepository.deleteToken(token);

      // Assert
      const tokens = await AuthTableTestHelper.findToken(token);
      expect(tokens).toHaveLength(0);
    });
  });

  describe('checkAvailabilityToken function', () => {
    it('should throw InvariantError if token is not available', async () => {
      // Arrange
      const authenticationRepository = new AuthRepositoryPostgres(pool);
      const token = 'token';

      // Action & Assert
      await expect(authenticationRepository.checkAvailabilityToken(token))
        .rejects.toThrow(InvariantError);
    });

    it('should not throw InvariantError if token is available', async () => {
      // Arrange
      const authenticationRepository = new AuthRepositoryPostgres(pool);
      const token = 'token';
      await AuthTableTestHelper.addToken(token);

      // Action & Assert
      await expect(authenticationRepository.checkAvailabilityToken(token))
        .resolves.not.toThrow(InvariantError);
    });
  });
});
