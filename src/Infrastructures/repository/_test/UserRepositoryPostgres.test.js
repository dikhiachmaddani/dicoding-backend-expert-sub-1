const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const pool = require('../../database/postgres/pool');
const UsersRepositoryPostgres = require('../UsersRepositoryPostgres');
const AddedUser = require('../../../Domains/users/entities/AddedUser');
const AddingUser = require('../../../Domains/users/entities/AddingUser');

describe('UsersRepositoryPostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('getIdByUsername function', () => {
    it('should throw InvariantError when user is not found', async () => {
      // Arrange
      const userRepositoryPostgres = new UsersRepositoryPostgres(
        pool,
        {},
      );

      // Action & Assert
      await expect(
        userRepositoryPostgres.getIdByUsername('dingdico'),
      ).rejects.toThrowError(InvariantError);
    });

    it('should return user id correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-321',
        username: 'dingdico',
      });
      const userRepositoryPostgres = new UsersRepositoryPostgres(
        pool,
        {},
      );

      // Action
      const userId = await userRepositoryPostgres.getIdByUsername('dingdico');

      // Assert
      expect(userId).toEqual('user-321');
    });
  });

  describe('getPasswordByUsername function', () => {
    it('should throw InvariantError when user is not found', () => {
      // Arrange
      const userRepositoryPostgres = new UsersRepositoryPostgres(
        pool,
        {},
      );

      // Action & Assert
      return expect(
        userRepositoryPostgres.getPasswordByUsername('dingdico'),
      ).rejects.toThrowError(InvariantError);
    });

    it('should return user password when user is found', async () => {
      // Arrange
      const userRepositoryPostgres = new UsersRepositoryPostgres(
        pool,
        {},
      );
      await UsersTableTestHelper.addUser({
        username: 'dingdico',
        password: 'secret_password',
      });

      // Action & Assert
      const password = await userRepositoryPostgres.getPasswordByUsername(
        'dingdico',
      );
      expect(password).toBe('secret_password');
    });
  });

  describe('verifyAvailableUsername function', () => {
    it('should throw InvariantError when username is not available', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'dingdico' });
      const userRepositoryPostgres = new UsersRepositoryPostgres(
        pool,
        {},
      );

      // Action & Assert
      await expect(
        userRepositoryPostgres.verifyAvailableUsername('dingdico'),
      ).rejects.toThrowError(InvariantError);
    });

    it('should not throw InvariantError when username is available', async () => {
      // Arrange
      const userRepositoryPostgres = new UsersRepositoryPostgres(
        pool,
        {},
      );

      // Action & Assert
      await expect(
        userRepositoryPostgres.verifyAvailableUsername('dingdico'),
      ).resolves.not.toThrowError(InvariantError);
    });
  });

  describe('addUser function', () => {
    it('should persist added user and return added user correctly', async () => {
      // Arrange
      const registerUser = new AddingUser({
        username: 'dingdico',
        password: 'secret_password',
        fullname: 'Ding DicoIn',
      });
      const fakeIdGenerator = () => '02375570';
      const userRepositoryPostgres = new UsersRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action
      await userRepositoryPostgres.addUser(registerUser);

      // Assert
      const users = await UsersTableTestHelper.findUsersById('user-02375570');
      expect(users).toHaveLength(1);
    });

    it('should return added user correctly', async () => {
      // Arrange
      const registerUser = new AddingUser({
        username: 'dingdico',
        password: 'secret_password',
        fullname: 'Ding DicoIn',
      });
      const fakeIdGenerator = () => '02375570';
      const userRepositoryPostgres = new UsersRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action
      const addDataUser = await userRepositoryPostgres.addUser(registerUser);

      // Assert
      expect(addDataUser).toStrictEqual(
        new AddedUser({
          id: 'user-02375570',
          username: 'dingdico',
          fullname: 'Ding DicoIn',
        }),
      );
    });
  });
});
