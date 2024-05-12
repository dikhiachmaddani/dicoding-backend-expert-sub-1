const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AddedThread = require('../../Domains/threads/entities/AddedThread');
const DetailThread = require('../../Domains/threads/entities/DetailThread');
const ThreadsRepository = require('../../Domains/threads/ThreadsRepository');

class ThreadsRepositoryPostgres extends ThreadsRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async getThreadById(id) {
    const query = {
      text: `SELECT threads.id, threads.title, threads.body, threads."createdAt", users.username
        FROM threads
        INNER JOIN users ON threads."userId" = users.id
        WHERE threads.id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);
    return new DetailThread(result.rows[0]);
  }

  async addThread(payload, userId) {
    const { title, body } = payload;
    const id = `thread-${this._idGenerator()}`;
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4) RETURNING id, title, "userId", "createdAt"',
      values: [id, title, body, userId],
    };

    const result = await this._pool.query(query);
    return new AddedThread(result.rows[0]);
  }

  async checkAvailabilityThreadId(id) {
    const query = {
      text: 'SELECT id FROM threads WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) throw new NotFoundError('id thread tidak tersedia');
  }
}

module.exports = ThreadsRepositoryPostgres;
