const ValidateFieldNewAuthToken = require('../../../../Domains/auth/entities/ValidateFieldNewAuthToken');
const AuthenticationTokenManager = require('../../../security/AuthTokenManager');
const UsersRepository = require('../../../../Domains/users/UsersRepository');
const AuthRepository = require('../../../../Domains/auth/AuthRepository');
const PasswordHash = require('../../../security/PasswordHash');
const AuthUseCase = require('../../AuthUseCase');

describe('Login Test on AuthUseCase', () => {
  it('should correctly orchestrate the authentication process', async () => {
    // Arrange
    const payload = {
      username: 'rendy',
      password: 'talagamo',
    };

    // Mocking
    const mockValidateToken = new ValidateFieldNewAuthToken({
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    });
    const mockUserRepository = new UsersRepository();
    const mockAuthenticationRepository = new AuthRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    const mockPasswordHash = new PasswordHash();

    mockUserRepository.getPasswordByUsername = jest
      .fn()
      .mockImplementation(() => Promise.resolve('encrypt_password'));
    mockPasswordHash.comparePassword = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.createAccessToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockValidateToken.accessToken));
    mockAuthenticationTokenManager.createRefreshToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockValidateToken.refreshToken));
    mockUserRepository.getIdByUsername = jest
      .fn()
      .mockImplementation(() => Promise.resolve('user-887362'));
    mockAuthenticationRepository.addToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    // Create Use Case
    const authUseCase = new AuthUseCase(
      mockUserRepository,
      mockAuthenticationRepository,
      mockAuthenticationTokenManager,
      mockPasswordHash,
    );

    // Action
    const actualAuthentication = await authUseCase.login(payload);

    // Assert
    expect(actualAuthentication).toEqual(
      new ValidateFieldNewAuthToken({
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
      }),
    );
    expect(mockUserRepository.getPasswordByUsername).toBeCalledWith('rendy');
    expect(mockPasswordHash.comparePassword).toBeCalledWith(
      'talagamo',
      'encrypt_password',
    );
    expect(mockUserRepository.getIdByUsername).toBeCalledWith('rendy');
    expect(mockAuthenticationTokenManager.createAccessToken).toBeCalledWith({
      username: 'rendy',
      id: 'user-887362',
    });
    expect(mockAuthenticationTokenManager.createRefreshToken).toBeCalledWith({
      username: 'rendy',
      id: 'user-887362',
    });
    expect(mockAuthenticationRepository.addToken).toBeCalledWith(
      mockValidateToken.refreshToken,
    );
  });
});
