const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AddedReplies = require('../../Domains/replies/entities/AddedReplies');
const RepliesRepository = require('../../Domains/replies/RepliesRepository');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const DetailReplies = require('../../Domains/replies/entities/DetailReplies');

class RepliesRepositoryPostgres extends RepliesRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async getRepliesByThreadId(threadId) {
    const query = {
      text: `
      SELECT replies.id, users.username, replies."createdAt", replies."isDelete", replies.content, replies."commentId"
      FROM replies 
      LEFT JOIN users ON replies."userId" = users.id 
      WHERE replies."threadId" = $1
      ORDER BY replies."createdAt" ASC`,
      values: [threadId],
    };

    const result = await this._pool.query(query);
    const detailReplies = result.rows.map((row) => new DetailReplies(row));
    return detailReplies;
  }

  async addReplies(payload, params, userId) {
    const { content } = payload;
    const { threadId, commentId } = params;
    const id = `reply-${this._idGenerator()}`;

    const query = {
      text: `
      INSERT INTO replies (id, "threadId", "commentId", content, "userId") 
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, content, "userId";`,
      values: [id, threadId, commentId, content, userId],
    };

    const result = await this._pool.query(query);
    return new AddedReplies(result.rows[0]);
  }

  async deleteRepliesById(id) {
    const date = new Date().toISOString();
    const query = {
      text: 'UPDATE replies SET "isDelete" = $2 WHERE id = $1',
      values: [id, date],
    };

    await this._pool.query(query);
  }

  async checkAvailabilityRepliesId(id) {
    const query = {
      text: 'SELECT id FROM replies WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (result.rowCount === 0) throw new NotFoundError(`balasan komentar dengan id = ${id} tidak berhasil ditemukan`);
  }

  async checkRepliesOwnerByUserId(replyId, userId) {
    const query = {
      text: 'SELECT id, "userId" FROM replies WHERE id = $1',
      values: [replyId],
    };

    const result = await this._pool.query(query);
    if (result.rowCount === 0) throw new NotFoundError('Balasan komentar tidak ditemukan');
    if (result.rows[0].userId !== userId) throw new AuthorizationError('user ini bukanlah pemilik balasan komentar');
  }
}

module.exports = RepliesRepositoryPostgres;
