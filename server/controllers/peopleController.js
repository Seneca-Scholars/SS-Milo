import { searchUserService } from "../services/peopleService.js";

export const searchUserController = async (req, res) => {
  const query = req.query.q;

  try {
    const results = await searchUserService(query);
    res.json(results); 
  } catch (err) {
    console.error("err fetching users:", err);
    res.status(500).json({ message: "err searching for users" });
  }
};
