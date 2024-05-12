const UsersRepository = require('../UsersRepository');

describe('UsersRepository interface', () => {
  it('should throw an error when invoking abstract methods', async () => {
    // Arrange
    const usersRepository = new UsersRepository();

    // Action
    const getPasswordByUsernameAction = usersRepository.getPasswordByUsername('');
    const addUserAction = usersRepository.addUser({});
    const verifyAvailableUsernameAction = usersRepository.verifyAvailableUsername('');
    const getIdByUsernameAction = usersRepository.getIdByUsername('');

    // Assert
    await expect(getPasswordByUsernameAction).rejects.toThrowError(
      'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(addUserAction).rejects.toThrowError(
      'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(verifyAvailableUsernameAction).rejects.toThrowError(
      'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(getIdByUsernameAction).rejects.toThrowError(
      'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
