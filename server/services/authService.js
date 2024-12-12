import { createUser as createUserPath } from '../models/userPath.js';
import User from '../models/userModel.js';
import { hashPassword } from '../utilities.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

 const registerUserService = async (firstName, lastName, username, password) => {
  try {
    const hashedPassword = await hashPassword(password);
    const userId = await createUserPath(firstName, lastName, username, hashedPassword);
    const user = new User(userId, firstName, lastName, username, hashedPassword);

    const token = jwt.sign(
      { userId: userId, username: username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { user, token }; 
  } catch (error) {
    // if (error.message === "user already exists") {
    //   throw new Error(" U already exists"); 
    // } else {
    //   throw new Error("err creating user"); 
    // }
  }
};


export default registerUserService;