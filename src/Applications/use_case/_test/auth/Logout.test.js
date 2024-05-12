const AuthenticationTokenManager = require('../../../security/AuthTokenManager');
const UsersRepository = require('../../../../Domains/users/UsersRepository');
const AuthRepository = require('../../../../Domains/auth/AuthRepository');
const PasswordHash = require('../../../security/PasswordHash');
const AuthUseCase = require('../../AuthUseCase');

describe('Logout Test on AuthUseCase', () => {
  it('should throw an error if the refresh token is missing', async () => {
    // Arrange
    const payload = {};
    const authUseCase = new AuthUseCase({});

    // Action & Assert
    await expect(authUseCase.logout(payload)).rejects.toThrowError(
      'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN',
    );
  });

  it('should throw an error if the refresh token is not a string', async () => {
    // Arrange
    const payload = {
      refreshToken: 123,
    };
    const authUseCase = new AuthUseCase({});

    // Action & Assert
    await expect(authUseCase.logout(payload)).rejects.toThrowError(
      'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should correctly orchestrate the deletion of authentication', async () => {
    // Arrange
    const payload = {
      refreshToken: 'refreshToken',
    };
    const mockUserRepository = new UsersRepository();
    const mockAuthenticationRepository = new AuthRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    const mockPasswordHash = new PasswordHash();

    mockAuthenticationRepository.checkAvailabilityToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationRepository.deleteToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    const authUseCase = new AuthUseCase(
      mockUserRepository,
      mockAuthenticationRepository,
      mockAuthenticationTokenManager,
      mockPasswordHash,
    );

    // Action
    await authUseCase.logout(payload);

    // Assert
    expect(
      mockAuthenticationRepository.checkAvailabilityToken,
    ).toHaveBeenCalledWith(payload.refreshToken);
    expect(mockAuthenticationRepository.deleteToken).toHaveBeenCalledWith(
      payload.refreshToken,
    );
  });
});
