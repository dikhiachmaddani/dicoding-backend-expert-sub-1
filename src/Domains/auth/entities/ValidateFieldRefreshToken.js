class ValidateFieldRefreshToken {
  constructor(payload) {
    this._verifyPayload(payload);

    const { refreshToken } = payload;

    this.refreshToken = refreshToken;
  }

  _verifyPayload({ refreshToken }) {
    if (!refreshToken) {
      throw new Error(
        'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN',
      );
    }

    if (typeof refreshToken !== 'string') {
      throw new Error(
        'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION',
      );
    }
  }
}

module.exports = ValidateFieldRefreshToken;
