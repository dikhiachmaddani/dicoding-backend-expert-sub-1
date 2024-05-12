const AddingUser = require('../../Domains/users/entities/AddingUser');

class UsersUseCase {
  constructor(usersRepository, passwordHash) {
    this._usersRepository = usersRepository;
    this._passwordHash = passwordHash;
  }

  async addUser(useCasePayload) {
    const validateUser = new AddingUser(useCasePayload);

    await this._usersRepository.verifyAvailableUsername(validateUser.username);
    validateUser.password = await this._passwordHash.hash(validateUser.password);

    return this._usersRepository.addUser(validateUser);
  }
}

module.exports = UsersUseCase;
