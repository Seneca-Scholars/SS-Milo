// import { createUser as createUserPath } from '../models/userPath.js';
// import User from '../models/userModel.js';
import { generateAuthToken, hashPassword } from '../utilities.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

 const registerUserService = async (firstName, lastName, username, password) => {
  try {
    const hashedPassword = await hashPassword(password); 
    const newUser = await prisma.users.create({
      data: {
        firstName,
        lastName,
        username,
        passwordHash: hashedPassword,
      },
    });
    const token = generateAuthToken(newUser);
    console.log(newUser)

    return{ newUser, token }; 
  } catch (error) {
    console.error(error); 
    throw error; 
  } finally {
    await prisma.$disconnect();
  }
};



export default registerUserService;