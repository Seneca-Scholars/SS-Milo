import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const saltRounds = 10; 
export async function generateSalt() {
  return await bcrypt.genSalt(saltRounds);
}

export async function hashPassword(password) {
  const salt = await generateSalt();
  return await bcrypt.hash(password, salt); 
}

export const generateAuthToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET 
  );
};

//   const secretKey = process.env.JWT_SECRET;

//   const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); 

//   return token;
// }