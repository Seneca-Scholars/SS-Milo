import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const getUserByIdService = async (userId) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('you were not found'); 
    }

    return user;
  } catch (error) {
    console.error("err fetching user by ID:", error);
    throw error; 
  }
};

export const getUserByUsernameService = async (username) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new Error('not found'); 
    }

    return user; 
  } catch (error) {
    console.error('err fetching user:', error);
    throw error;
  }
};
