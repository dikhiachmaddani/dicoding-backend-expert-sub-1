/* istanbul ignore file */
const AddedComment = require('../src/Domains/comments/entities/AddedComment');
const DetailComment = require('../src/Domains/comments/entities/DetailComment');
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentsTableTestHelper = {
  async addComment({
    id = 'comment-666212',
    threadId = 'thread-666212',
    owner = 'user-666212',
    content = 'ini content komentar pertama',
  }) {
    const query = {
      text: 'INSERT INTO comments(id, "threadId", content, "userId") VALUES($1, $2, $3, $4)',
      values: [id, threadId, content, owner],
    };

    await pool.query(query);
  },

  async addWithDeletingComment({
    id = 'comment-666212',
    threadId = 'thread-666212',
    owner = 'user-666212',
    content = 'ini content komentar pertama',
    date = new Date('2024-05-05T20:56:24.259305'),
    isDelete = new Date('2024-05-05T20:56:24.259305'),
  }) {
    const query = {
      text: 'INSERT INTO comments(id, "threadId", content, "userId", "createdAt", "isDelete") VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, threadId, content, owner, date, isDelete],
    };

    await pool.query(query);
  },

  async findCommentByThreadId(threadId) {
    const query = {
      text: `
      SELECT comments.id, comments."createdAt", comments.content, comments."isDelete", users.username
      FROM comments
      INNER JOIN users ON comments."userId" = users.id
      WHERE "threadId" = $1
      ORDER BY "createdAt" ASC`,
      values: [threadId],
    };

    const result = await pool.query(query);

    return result.rows.map((row) => new DetailComment(row));
  },

  async findCommentById(commentId) {
    const query = {
      text: `
        SELECT comments.id, users.username, comments."createdAt", comments."userId", comments.content, comments."isDelete"
        FROM comments
        LEFT JOIN users ON comments."userId" = users.id
        WHERE comments.id = $1
        ORDER BY comments."createdAt" ASC`,
      values: [commentId],
    };

    const result = await pool.query(query);

    const {
      id, username, createdAt, content, isDelete,
    } = result.rows[0];

    return {
      id,
      username,
      date: createdAt,
      content: isDelete != null ? '**komentar telah dihapus**' : content,
    };
  },

  async findAddedCommentById(commentId) {
    const query = {
      text: `
        SELECT comments.id, users.username, comments."createdAt", comments."userId", comments.content, comments."isDelete"
        FROM comments
        LEFT JOIN users ON comments."userId" = users.id
        WHERE comments.id = $1
        ORDER BY comments."createdAt" ASC`,
      values: [commentId],
    };

    const result = await pool.query(query);

    const {
      id, content, userId,
    } = result.rows[0];

    return new AddedComment({
      id,
      content,
      userId,
    });
  },

  async deleteCommentById(id) {
    const date = new Date().toISOString();
    const query = {
      text: 'UPDATE comments SET "isDelete" = $2 WHERE id = $1',
      values: [id, date],
    };

    await pool.query(query);
  },

  async cleanTable() {
    await pool.query('DELETE FROM comments WHERE 1=1');
  },
};

module.exports = CommentsTableTestHelper;
