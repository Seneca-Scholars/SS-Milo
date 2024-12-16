import User from "../models/userModel.js";
import { getUserByIdService } from "../services/getUserByService.js";

export const getUserByIdController = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await getUserByIdService(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "user not found" }); 
    }
  } catch (error) {
    console.error("err getting user by ID:", error);
    res.status(500).json({ message: "server error" });
  }
};


export const getUserByUsernameController = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await getUserByUsernameService(username);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "not found" }); 
    }
  } catch (error) {
    console.error("err w user:", error);
    res.status(500).json({ message: "server error" });
  }
};

