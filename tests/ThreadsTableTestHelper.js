/* istanbul ignore file */
const AddedThread = require('../src/Domains/threads/entities/AddedThread');
const DetailThread = require('../src/Domains/threads/entities/DetailThread');
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {
  async addThread({
    id = 'thread-666212',
    title = 'ini threadku',
    body = 'no caption capt!',
    owner = 'user-666212',
    date = new Date('2024-05-05T20:56:24.259305'),
  }) {
    const query = {
      text: 'INSERT INTO threads(id, title, body, "userId", "createdAt") VALUES($1, $2, $3, $4, $5)',
      values: [id, title, body, owner, date],
    };

    await pool.query(query);
  },

  async findThreadById(threadId) {
    const query = {
      text: `
        SELECT threads.id, threads.title, threads.body, threads."createdAt", users.username
        FROM threads
        LEFT JOIN users ON threads."userId" = users.id
        WHERE threads.id = $1`,
      values: [threadId],
    };

    const result = await pool.query(query);

    const {
      id, title, body, createdAt, username,
    } = result.rows[0];

    return new DetailThread({
      id,
      title,
      body,
      createdAt,
      username,
    });
  },

  async findAddedCommentById(threadId) {
    const query = {
      text: `
        SELECT threads.id, threads.title, threads.body, threads."createdAt", threads."userId"
        FROM threads
        LEFT JOIN users ON threads."userId" = users.id
        WHERE threads.id = $1`,
      values: [threadId],
    };

    const result = await pool.query(query);

    const {
      id, title, userId,
    } = result.rows[0];

    return new AddedThread({
      id,
      title,
      userId,
    });
  },

  async cleanTable() {
    await pool.query('DELETE FROM threads WHERE 1=1');
  },
};

module.exports = ThreadsTableTestHelper;
