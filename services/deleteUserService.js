import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const deleteUserService = async (userId) => {
  try {
    await prisma.users.delete({
      where: { id: userId },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};