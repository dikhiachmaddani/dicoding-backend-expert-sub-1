/* istanbul ignore file */

const Jwt = require('@hapi/jwt');
const UsersTableTestHelper = require('./UsersTableTestHelper');
const AuthTableTestHelper = require('./AuthTableTestHelper');

const JwtTestHelper = {
  async getAccessToken({
    id = 'user-666212',
    username = 'dikhiachmaddani',
    password = 'password',
    fullname = 'Dikhi Achmad Dani',
  }) {
    const payloadUser = {
      id, username, password, fullname,
    };

    await UsersTableTestHelper.addUser(payloadUser);

    const accessToken = Jwt.token.generate(
      payloadUser,
      process.env.ACCESS_TOKEN_KEY,
    );
    const refreshToken = Jwt.token.generate(
      payloadUser,
      process.env.REFRESH_TOKEN_KEY,
    );

    await AuthTableTestHelper.addToken(refreshToken);

    return accessToken;
  },

  async cleanTable() {
    UsersTableTestHelper.cleanTable();
    AuthTableTestHelper.cleanTable();
  },
};

module.exports = JwtTestHelper;
