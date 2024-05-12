const DomainErrorTranslator = require('../DomainErrorTranslator');
const InvariantError = require('../InvariantError');

describe('DomainErrorTranslator', () => {
  it('must translate errors correctly', () => {
    expect(
      DomainErrorTranslator.translate(
        new Error('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY'),
      ),
    ).toStrictEqual(
      new InvariantError('harus mengirimkan username dan password'),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION'),
      ),
    ).toStrictEqual(new InvariantError('username dan password harus string'));
    expect(
      DomainErrorTranslator.translate(
        new Error('REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN'),
      ),
    ).toStrictEqual(new InvariantError('harus mengirimkan token refresh'));
    expect(
      DomainErrorTranslator.translate(
        new Error(
          'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION',
        ),
      ),
    ).toStrictEqual(new InvariantError('refresh token harus string'));
    expect(
      DomainErrorTranslator.translate(
        new Error('DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN'),
      ),
    ).toStrictEqual(new InvariantError('harus mengirimkan token refresh'));
    expect(
      DomainErrorTranslator.translate(
        new Error(
          'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION',
        ),
      ),
    ).toStrictEqual(new InvariantError('refresh token harus string'));
    expect(
      DomainErrorTranslator.translate(
        new Error('ADDING_USER.NOT_MEET_DATA_TYPE_SPECIFICATION'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat user baru karena tipe data tidak sesuai',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('ADDING_USER.NOT_CONTAIN_NEEDED_PROPERTY'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('ADDING_USER.USERNAME_LIMIT_CHAR'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat user baru karena karakter username melebihi batas limit',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('ADDING_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat user baru karena username mengandung karakter terlarang',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('ADDED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat user baru karena tipe data tidak sesuai',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('ADDED_USER.NOT_CONTAIN_NEEDED_PROPERTY'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('ADDING_THREAD.NOT_CONTAIN_NEEDED_PROPERTY'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('ADDING_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat thread baru karena tipe data tidak sesuai',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat thread baru karena tipe data tidak sesuai',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('ADDING_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat comment baru karena properti yang dibutuhkan tidak ada',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('ADDING_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat comment baru karena tipe data tidak sesuai',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat comment baru karena properti yang dibutuhkan tidak ada',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat comment baru karena tipe data tidak sesuai',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('ADDING_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat replies baru karena properti yang dibutuhkan tidak ada',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('ADDING_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat replies baru karena tipe data tidak sesuai',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('ADDED_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat replies baru karena properti yang dibutuhkan tidak ada',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('ADDED_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat membuat replies baru karena tipe data tidak sesuai',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('GET_DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat memuat detail data thread karena properti yang dibutuhkan tidak ada',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('GET_DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat memuat detail data thread karena tipe data tidak sesuai',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat memuat detail data thread karena properti yang dibutuhkan tidak ada',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat memuat detail data thread karena tipe data tidak sesuai',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('DETAIL_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat memuat detail data replies karena properti yang dibutuhkan tidak ada',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('DETAIL_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat memuat detail data replies karena tipe data tidak sesuai',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat memuat detail data komentar karena properti yang dibutuhkan tidak ada',
      ),
    );
    expect(
      DomainErrorTranslator.translate(
        new Error('DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION'),
      ),
    ).toStrictEqual(
      new InvariantError(
        'tidak dapat memuat detail data komentar karena tipe data tidak sesuai',
      ),
    );
  });

  it('should return original error when translation is not required', () => {
    // Arrange
    const error = new Error('some_error_message');

    // Action
    const translatedError = DomainErrorTranslator.translate(error);

    // Assert
    expect(translatedError).toStrictEqual(error);
  });
});
