const AuthenticationTokenManager = require('../../../security/AuthTokenManager');
const UsersRepository = require('../../../../Domains/users/UsersRepository');
const AuthRepository = require('../../../../Domains/auth/AuthRepository');
const PasswordHash = require('../../../security/PasswordHash');
const AuthUseCase = require('../../AuthUseCase');

describe('Refresh Token Test on AuthUseCase', () => {
  it('should throw an error if refresh token is missing in payload', async () => {
    // Arrange
    const payload = {};
    const authUseCase = new AuthUseCase({});

    // Action & Assert
    await expect(authUseCase.refreshToken(payload)).rejects.toThrowError(
      'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN',
    );
  });

  it('should throw an error if refresh token is not a string', async () => {
    // Arrange
    const payload = {
      refreshToken: 1,
    };
    const authUseCase = new AuthUseCase({});

    // Action & Assert
    await expect(authUseCase.refreshToken(payload)).rejects.toThrowError(
      'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should correctly refresh authentication', async () => {
    // Arrange
    const payload = {
      refreshToken: 'new_refresh_token',
    };
    const mockUserRepository = new UsersRepository();
    const mockAuthenticationRepository = new AuthRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    const mockPasswordHash = new PasswordHash();

    // Mocking
    mockAuthenticationRepository.checkAvailabilityToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.verifyRefreshToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.decodePayload = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ username: 'yoloferdan', id: 'user-9388847f' }));
    mockAuthenticationTokenManager.createAccessToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve('new_token'));

    // Create the use case instace
    const authUseCase = new AuthUseCase(
      mockUserRepository,
      mockAuthenticationRepository,
      mockAuthenticationTokenManager,
      mockPasswordHash,
    );

    // Action
    const accessToken = await authUseCase.refreshToken(payload);

    // Assert
    expect(mockAuthenticationTokenManager.verifyRefreshToken).toBeCalledWith(
      payload.refreshToken,
    );
    expect(mockAuthenticationRepository.checkAvailabilityToken).toBeCalledWith(
      payload.refreshToken,
    );
    expect(mockAuthenticationTokenManager.decodePayload).toBeCalledWith(
      payload.refreshToken,
    );
    expect(mockAuthenticationTokenManager.createAccessToken).toBeCalledWith({
      username: 'yoloferdan',
      id: 'user-9388847f',
    });
    expect(accessToken).toEqual('new_token');
  });
});
