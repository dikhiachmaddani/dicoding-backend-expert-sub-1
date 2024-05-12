class DetailComment {
  constructor(payload) {
    const responsePayload = this._mapAndValidatePayload(payload);

    const {
      id, username, date, content, isDelete,
    } = responsePayload;

    this.id = id;
    this.username = username;
    this.content = content;
    this.date = date;
    this.isDelete = isDelete;
  }

  _mapAndValidatePayload({
    id, username, createdAt, content, isDelete,
  }) {
    if (!id || !username || !createdAt || !content || isDelete === undefined) {
      throw new Error('DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof username !== 'string'
      || typeof createdAt !== 'object'
      || typeof content !== 'string'
      || typeof isDelete !== 'object'
    ) {
      throw new Error('DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    return {
      id,
      username,
      date: createdAt,
      content,
      isDelete,
    };
  }
}

module.exports = DetailComment;
