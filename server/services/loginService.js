import bcrypt from "bcrypt";
import { db } from "../controllers/dbController.js";
import jwt from 'jsonwebtoken';
import { generateAuthToken } from "../utilities.js";

 export async function loginUserService(username, password) {
  try {
    const user = await new Promise((resolve, reject) => {
      db.get('SELECT id, firstName, lastName, username, password_hash FROM users WHERE username = ?', 
             [username], 
             (err, row) => {
               if (err) {
                 reject(err);
               } else {
                 resolve(row);
               }
             });
    });

    if (!user) {
      throw new Error("invalid creds"); 
    }

    const isMatch = await bcrypt.compare(password, user.password_hash); 

    if (!isMatch) {
      throw new Error("invalid creds"); 
    }

    const token = generateAuthToken(user); 

    return token; 
  } catch (error) {
    throw error; 
  }
}

export default loginUserService;