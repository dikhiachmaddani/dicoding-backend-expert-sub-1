const UsersRepository = require('../../../../Domains/users/UsersRepository');
const AddingUser = require('../../../../Domains/users/entities/AddingUser');
const AddedUser = require('../../../../Domains/users/entities/AddedUser');
const PasswordHash = require('../../../security/PasswordHash');
const UsersUseCase = require('../../UsersUseCase');

describe('Add User Test on UsersUseCase', () => {
  it('should correctly orchestrate adding a user', async () => {
    // Arrange
    const useCasePayload = {
      username: 'dicoding',
      password: 'secret',
      fullname: 'Dicoding Indonesia',
    };

    const mockRegisteredUser = new AddedUser({
      id: 'user-123',
      username: useCasePayload.username,
      fullname: useCasePayload.fullname,
    });

    // Mocking
    const mockUserRepository = new UsersRepository();
    const mockPasswordHash = new PasswordHash();

    mockUserRepository.verifyAvailableUsername = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockPasswordHash.hash = jest.fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'));
    mockUserRepository.addUser = jest.fn()
      .mockImplementation(() => Promise.resolve(mockRegisteredUser));

    // Create Use Case
    const getUserUseCase = new UsersUseCase(
      mockUserRepository,
      mockPasswordHash,
    );

    // Action
    const registeredUser = await getUserUseCase.addUser(useCasePayload);

    // Assert
    expect(registeredUser).toStrictEqual(new AddedUser({
      id: 'user-123',
      username: useCasePayload.username,
      fullname: useCasePayload.fullname,
    }));

    expect(mockUserRepository.verifyAvailableUsername).toBeCalledWith(useCasePayload.username);
    expect(mockPasswordHash.hash).toBeCalledWith(useCasePayload.password);
    expect(mockUserRepository.addUser).toBeCalledWith(new AddingUser({
      username: useCasePayload.username,
      password: 'encrypted_password',
      fullname: useCasePayload.fullname,
    }));
  });
});
