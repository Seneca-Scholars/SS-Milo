import bcrypt from "bcrypt";
import { db } from "./dbController.js";
import { generateAuthToken } from "../utilities.js";


export async function login(req, res) { 
  const { username, password } = req.body;
  console.log(req.body)

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
    console.log(user);
    // if (!user) {
    //   return res.status(401).json({ error: "invalid username or password" });
    // }

      const isMatch = await new Promise((resolve, reject) => { 
      bcrypt.compare(password, user.password_hash, (err, result) => {
        if (err) {
          reject(err); 
        } else {
          resolve(result); 
          console.log(result);

        }
      });
    });


    if (isMatch) {
      const token = generateAuthToken(user); 
      res.json({ token }); 
    } else {
      console.log(password);
      console.log(user.password_hash);
    }

  } catch (error) {
    console.error('something didnt let you log in:', error); 
  }
}