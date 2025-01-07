import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const searchUserService = async (query) => {
  try {
    const users = await prisma.users.findMany({
      where: {
        OR: [
          { firstName: { contains: query } },
          { lastName: { contains: query } } 
        ]
      }
    });


    return users; 
  } catch (err) {
    console.error('err fetching users:', err);
    throw err; 
  }
};