import bcrypt from "bcrypt";
import { db } from "../controllers/dbController.js";
import { generateAuthToken } from "../utilities.js";

 export async function loginUserService(username, password) {
  try {
    const user = await new Promise((resolve, reject) => {
      db.get('SELECT id, firstName, lastName, username, password_hash FROM users WHERE username = ?', 
        [username],
        (err, row) => {
          if (err) {
            reject(new Error("db error: " + err.message));
          } else if (!row) {
            reject(new Error("user not found"));
          } else {
            resolve(row);
          }
    })
  });

    
    if(!user) {
      throw new Error ({message: 'no user found', Error});
    }



 
    const isMatch =  bcrypt.compare(password, user.password_hash); 
    console.log(typeof(password));
    console.log(typeof(user.password_hash));
    console.log(isMatch);

    
    if (!isMatch) {
      throw Error 
    }

    const token = generateAuthToken(user); 
    console.log(token);
  

    return ({token, user});
  } catch (error) {
    throw new Error({message: 'laaa', Error})
  }
};

export default loginUserService;