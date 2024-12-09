import { createUser as createUserPath } from "../models/userPath.js"
import User from "../models/userModel.js";
import { generateAuthToken, hashPassword } from "../utilities.js";

export async function registerUser(req, res) {
  const { firstName, lastName, username, password } = req.body;
  console.log(req.body)

//   try {
    const hashedPassword = await hashPassword(password); 
    const userId = await createUserPath(firstName, lastName, username, hashedPassword); 
    const user = new User(userId, firstName, lastName, username, hashedPassword); 
    const token = generateAuthToken(user);
    req.session.user = user;
    res.json({message: 'user created', token});
//   } catch (error) {
//     if (error.message === "user already exists") {
//       return res.status(400).json({ error: "user exists" }); 
//     } else {
//       console.error("err creating user:", error);
//       return res.status(500).json({ error: "err creating user" }); 
//     }
//   }
}