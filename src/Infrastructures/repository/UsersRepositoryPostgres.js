const InvariantError = require('../../Commons/exceptions/InvariantError');
const AddedUser = require('../../Domains/users/entities/AddedUser');
const UsersRepository = require('../../Domains/users/UsersRepository');

class UsersRepositoryPostgres extends UsersRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async getPasswordByUsername(username) {
    const query = {
      text: 'SELECT password FROM users WHERE username = $1',
      values: [username],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) throw new InvariantError('username tidak ditemukan');
    return result.rows[0].password;
  }

  async getIdByUsername(username) {
    const query = {
      text: 'SELECT id FROM users WHERE username = $1',
      values: [username],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) throw new InvariantError('user tidak ditemukan');
    const { id } = result.rows[0];
    return id;
  }

  async addUser(payload) {
    const { username, password, fullname } = payload;
    const id = `user-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id, username, fullname',
      values: [id, fullname, username, password],
    };
    const result = await this._pool.query(query);
    return new AddedUser(result.rows[0]);
  }

  async verifyAvailableUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };
    const result = await this._pool.query(query);
    if (result.rowCount) throw new InvariantError('username tidak tersedia');
  }
}

module.exports = UsersRepositoryPostgres;
