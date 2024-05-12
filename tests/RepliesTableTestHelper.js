/* istanbul ignore file */
const AddedReplies = require('../src/Domains/replies/entities/AddedReplies');
const DetailReplies = require('../src/Domains/replies/entities/DetailReplies');
const pool = require('../src/Infrastructures/database/postgres/pool');

const RepliesTableTestHelper = {
  async addReplies({
    id = 'reply-666212',
    threadId = 'thread-666212',
    commentId = 'comment-666212',
    owner = 'user-666212',
    content = 'ini content balasan pertama',
  }) {
    const query = {
      text: `
      INSERT INTO replies VALUES ($1, $2, $3, $4, $5)`,
      values: [id, threadId, commentId, owner, content],
    };

    await pool.query(query);
  },

  async addWithDeletedReplies({
    id = 'reply-666212',
    threadId = 'thread-666212',
    commentId = 'comment-666212',
    owner = 'user-666212',
    content = 'ini content balasan pertama',
    date = new Date('2024-05-05T20:56:24.259305'),
    isDelete = new Date('2024-05-05T20:56:24.259305'),
  }) {
    const query = {
      text: `
      INSERT INTO replies VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      values: [id, threadId, commentId, owner, content, isDelete, date],
    };

    await pool.query(query);
  },

  async findRepliesById(repliesId) {
    const query = {
      text: `SELECT replies.id, replies."commentId", replies.content, replies."createdAt", replies."isDelete", users.username
      FROM replies
      INNER JOIN users ON replies."userId" = users.id
      WHERE replies.id = $1`,
      values: [repliesId],
    };

    const result = await pool.query(query);
    const {
      id, username, createdAt, content, commentId, isDelete,
    } = result.rows[0];

    return new DetailReplies({
      id,
      username,
      createdAt,
      content: isDelete != null ? '**balasan telah dihapus**' : content,
      commentId,
      isDelete,
    });
  },

  async findAddedRepliesById(repliesId) {
    const query = {
      text: `SELECT replies.id, replies."commentId", replies.content, replies."createdAt", replies."isDelete", replies."userId"
      FROM replies
      INNER JOIN users ON replies."userId" = users.id
      WHERE replies.id = $1`,
      values: [repliesId],
    };

    const result = await pool.query(query);
    const { id, content, userId } = result.rows[0];

    return new AddedReplies({
      id,
      content,
      userId,
    });
  },

  async findRepliesByThreadId(threadId) {
    const query = {
      text: `
      SELECT replies.id, users.username, replies."createdAt", replies."isDelete", replies.content, replies."commentId"
      FROM replies 
      LEFT JOIN users ON replies."userId" = users.id 
      WHERE replies."threadId" = $1
      ORDER BY replies."createdAt" ASC`,
      values: [threadId],
    };

    const result = await pool.query(query);
    const detailReplies = result.rows.map((row) => new DetailReplies(row));
    return detailReplies;
  },

  async deleteReplyById(id) {
    const date = new Date().toISOString();
    const query = {
      text: 'UPDATE replies SET "isDelete" = $2 WHERE id = $1',
      values: [id, date],
    };

    await pool.query(query);
  },

  async cleanTable() {
    await pool.query('DELETE FROM replies WHERE 1=1');
  },
};

module.exports = RepliesTableTestHelper;
