class AddedThread {
  constructor(payload) {
    const responsePayload = this._mapAndValidatePayload(payload);

    const { id, title, owner } = responsePayload;

    this.id = id;
    this.title = title;
    this.owner = owner;
  }

  _mapAndValidatePayload({ id, title, userId }) {
    if (!id || !title || !userId) {
      throw new Error('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof title !== 'string'
      || typeof userId !== 'string'
    ) {
      throw new Error('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    return {
      id,
      title,
      owner: userId,
    };
  }
}

module.exports = AddedThread;
