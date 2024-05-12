class DetailThread {
  constructor(payload) {
    const responsePayload = this._mapAndValidatePayload(payload);

    const {
      id, title, body, date, username,
    } = responsePayload;

    this.id = id;
    this.title = title;
    this.body = body;
    this.date = date;
    this.username = username;
  }

  _mapAndValidatePayload({
    id, title, body, createdAt, username,
  }) {
    if (!id || !title || !body || !createdAt || !username) {
      throw new Error('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof title !== 'string'
      || typeof body !== 'string'
      || typeof createdAt !== 'object'
      || typeof username !== 'string'
    ) {
      throw new Error('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    return {
      id,
      title,
      body,
      date: createdAt,
      username,
    };
  }
}

module.exports = DetailThread;
