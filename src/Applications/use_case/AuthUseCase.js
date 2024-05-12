const ValidateFieldNewAuthToken = require('../../Domains/auth/entities/ValidateFieldNewAuthToken');
const ValidateRefreshToken = require('../../Domains/auth/entities/ValidateFieldRefreshToken');
const ValidateFieldLogin = require('../../Domains/auth/entities/ValidateFieldLogin');

class AuthUseCase {
  constructor(usersRepository, authRepository, jwtTokenManager, passwordHash) {
    this._usersRepository = usersRepository;
    this._authRepository = authRepository;
    this._jwtTokenManager = jwtTokenManager;
    this._passwordHash = passwordHash;
  }

  async login(useCasePayload) {
    const { username, password } = new ValidateFieldLogin(useCasePayload);

    const encryptedPassword = await this._usersRepository.getPasswordByUsername(
      username,
    );
    await this._passwordHash.comparePassword(password, encryptedPassword);

    const id = await this._usersRepository.getIdByUsername(username);
    const accessToken = await this._jwtTokenManager.createAccessToken({
      username,
      id,
    });
    const refreshToken = await this._jwtTokenManager.createRefreshToken({
      username,
      id,
    });

    const newAuthToken = new ValidateFieldNewAuthToken({
      accessToken,
      refreshToken,
    });
    await this._authRepository.addToken(newAuthToken.refreshToken);

    return newAuthToken;
  }

  async refreshToken(useCasePayload) {
    const { refreshToken } = new ValidateRefreshToken(useCasePayload);

    await this._jwtTokenManager.verifyRefreshToken(refreshToken);
    await this._authRepository.checkAvailabilityToken(refreshToken);
    const { username, id } = await this._jwtTokenManager.decodePayload(
      refreshToken,
    );
    return this._jwtTokenManager.createAccessToken({ username, id });
  }

  async logout(useCasePayload) {
    const { refreshToken } = new ValidateRefreshToken(useCasePayload);

    await this._authRepository.checkAvailabilityToken(refreshToken);
    await this._authRepository.deleteToken(refreshToken);
  }
}

module.exports = AuthUseCase;
