class DetailReplies {
  constructor(payload) {
    const responsePayload = this._mapAndValidatePayload(payload);

    const {
      id, username, date, content, isDelete, commentId,
    } = responsePayload;

    this.id = id;
    this.username = username;
    this.content = content;
    this.date = date;
    this.commentId = commentId;
    this.isDelete = isDelete;
  }

  _mapAndValidatePayload({
    id, username, createdAt, content, isDelete, commentId,
  }) {
    if (!id || !username || !createdAt || !content || isDelete === undefined || !commentId) {
      throw new Error('DETAIL_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof username !== 'string'
      || typeof createdAt !== 'object'
      || typeof content !== 'string'
      || typeof isDelete !== 'object'
      || typeof commentId !== 'string'
    ) {
      throw new Error('DETAIL_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    return {
      id,
      username,
      date: createdAt,
      content,
      commentId,
      isDelete,
    };
  }
}

module.exports = DetailReplies;
