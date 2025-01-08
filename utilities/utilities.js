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
  return bcrypt.hashSync(password, salt); 
}

const apikey = process.env.JWT_SECRET;

export const generateAuthToken = (user) => {
  if (!apikey) throw new Error("JWT_SECRET is not defined");
  return jwt.sign(
    { id: user.id, username: user.username },
    apikey
  );
};





// export async function generateAuthToken(user) {
//   if (typeof process.env.JWT_SECRET !== 'undefined') {
//     return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
//   } else {
//     throw new Error({message: "no auth token could be generated", Error})
//   }
// }

