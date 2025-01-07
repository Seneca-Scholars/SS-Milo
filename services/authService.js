// import { createUser as createUserPath } from '../models/userPath.js';
// import User from '../models/userModel.js';
import db from '../prismaInit.js';
import { generateAuthToken, hashPassword } from '../utilities.js';


 const registerUserService = async (firstName, lastName, username, password) => {
  try {
    const hashedPassword = await hashPassword(password); 
    const newUser = await db.users.create({
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
    await db.$disconnect();
  }
};



export default registerUserService;