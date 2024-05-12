class GetAllDetailThread {
  constructor(payload) {
    const responsePayload = this._mapAndValidatePayload(payload);

    const {
      id, title, body, date, username, comments,
    } = responsePayload;

    this.id = id;
    this.title = title;
    this.body = body;
    this.date = date;
    this.username = username;
    this.comments = comments;
  }

  _mapAndValidatePayload({
    id, title, body, date, username, comments,
  }) {
    if (!id || !title || !body || !date || !username || !comments) {
      throw new Error('GET_DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof title !== 'string'
      || typeof body !== 'string'
      || typeof date !== 'object'
      || typeof username !== 'string'
      || typeof comments !== 'object'
    ) {
      throw new Error('GET_DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    return {
      id,
      title,
      body,
      date,
      username,
      comments,
    };
  }
}

module.exports = GetAllDetailThread;
