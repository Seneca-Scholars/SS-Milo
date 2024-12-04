import bcrypt from "bcrypt";
import { User } from '../models/userModel.js';


export async function login(req, res) {if (!req.body.username || !req.body.password  || !req.body.firstName|| !req.body.lastName) {
    return res.status(400).json({ error: "missing a username or password" });
  }

  try {
    const user = await User.findOne({ username: req.body.username }); 

    if (!user) {
      return res.status(401).json({ error: "invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "invalid username or password" });
    }


    const token = generateAuthToken(user); 

    res.json({ token });

} catch (error) {
        console.error(error);
        res.status(500).json({ error: "server error" });
      }
    }
    