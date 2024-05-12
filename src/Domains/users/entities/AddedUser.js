class AddedUser {
  constructor(payload) {
    const responsePayload = this._mapResponsePayload(payload);
    this._verifyPayload(responsePayload);

    const { id, username, fullname } = responsePayload;

    this.id = id;
    this.username = username;
    this.fullname = fullname;
  }

  _mapResponsePayload({ id, username, fullname }) {
    return {
      id,
      username,
      fullname,
    };
  }

  _verifyPayload({ id, username, fullname }) {
    if (!id || !username || !fullname) {
      throw new Error('ADDED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof username !== 'string'
      || typeof fullname !== 'string'
    ) {
      throw new Error('ADDED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedUser;
