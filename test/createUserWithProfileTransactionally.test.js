import { hashPassword } from '../utilities/utilities.js';
import db from '../libs/prismaInit.js';

jest.mock('../libs/prismaInit.js', () => ({
  $transaction: jest.fn(),
}));


describe('createUserWithProfileTransactionally', () => {
  let mockDb;
  beforeEach(() => {
    mockDb = db;

    mockDb.$transaction.mockImplementation(async (callback) => {
      const tx = {
        users: { create: jest.fn() },
        profile: { create: jest.fn() },
      };

      tx.users.create.mockResolvedValue({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        passwordHash: await hashPassword('secretPassword'),
      });

      tx.profile.create.mockResolvedValue({
        id: 1,
        userId: 1,
        description: 'Software Engineer',
        age: 30,
      });

      return callback(tx);
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const createUserWithProfileTransactionally = async (userData, profileData) => {
    return mockDb.$transaction(async (tx) => {
      const hashedPassword = await hashPassword(userData.password);

      const user = await tx.users.create({
        data: {
          ...userData,
          passwordHash: hashedPassword,
        },
      });

      const profile = await tx.profile.create({
        data: {
          ...profileData,
          userId: user.id,
        },
      });

      return { user, profile };
    });
  };
  
})
