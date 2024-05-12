const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AddedComment = require('../../Domains/comments/entities/AddedComment');
const CommentsRepository = require('../../Domains/comments/CommentsRepository');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const DetailComment = require('../../Domains/comments/entities/DetailComment');

class CommentsRepositoryPostgres extends CommentsRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(payload, threadId, userId) {
    const { content } = payload;
    const id = `comment-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4) RETURNING id, content, "userId"',
      values: [id, threadId, content, userId],
    };
    const result = await this._pool.query(query);
    return new AddedComment(result.rows[0]);
  }

  async getCommentsByThreadId(threadId) {
    const query = {
      text: `SELECT comments.id, comments."createdAt", comments.content, comments."isDelete", users.username
      FROM comments
      INNER JOIN users ON comments."userId" = users.id
      WHERE "threadId" = $1
      ORDER BY "createdAt" ASC`,
      values: [threadId],
    };

    const result = await this._pool.query(query);

    return result.rows.map((row) => new DetailComment(row));
  }

  async verifyCommentOwnerByUserId(id, userId) {
    const query = {
      text: 'SELECT id, "userId" FROM comments WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (result.rows[0].userId !== userId) throw new AuthorizationError('Anda bukan owner');
  }

  async deleteCommentById(id) {
    const date = new Date().toISOString();
    const query = {
      text: 'UPDATE comments SET "isDelete" = $2 WHERE id = $1',
      values: [id, date],
    };

    await this._pool.query(query);
  }

  async checkAvailabilityCommentId(id) {
    const query = {
      text: 'SELECT id FROM comments WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (result.rowCount === 0) throw new NotFoundError('Komentar tidak ditemukan');
  }
}

module.exports = CommentsRepositoryPostgres;
