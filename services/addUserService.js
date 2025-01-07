import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUserService = async ( firstName, lastName) => {
  const newUser = await prisma.users.create({ 
    data: { 
      firstName, 
      lastName 
    } 
  }); 
  return newUser; 
};