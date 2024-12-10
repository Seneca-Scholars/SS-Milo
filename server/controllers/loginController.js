import bcrypt from "bcrypt";
import { db } from "./dbController.js";
import jwt from 'jsonwebtoken';
import { generateAuthToken } from "../utilities.js";


export async function login(req, res) { 
  const { username, password } = req.body;
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

      const isMatch = bcrypt.compareSync(password, user.password_hash);
      if (!isMatch) {
        console.log('paap');

      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET
      );
      res.send({ token }) 
     } catch (error) {
        console.error("err:", error);

      }
    }
    