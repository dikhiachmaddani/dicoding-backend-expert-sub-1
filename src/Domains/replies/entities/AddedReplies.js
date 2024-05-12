class AddedReplies {
  constructor(payload) {
    const responsePayload = this._mapAndValidatePayload(payload);

    const { id, content, owner } = responsePayload;

    this.id = id;
    this.content = content;
    this.owner = owner;
  }

  _mapAndValidatePayload({ id, content, userId }) {
    if (!id || !content || !userId) {
      throw new Error('ADDED_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof content !== 'string'
      || typeof userId !== 'string'
    ) {
      throw new Error('ADDED_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    return {
      id,
      content,
      owner: userId,
    };
  }
}

module.exports = AddedReplies;
