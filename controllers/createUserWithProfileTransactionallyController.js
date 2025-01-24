import { createUserWithProfileTransactionally } from "../services/createUserWithProfileTransactionallyService.js";

export const createUserWithProfileTransactionallyController = async (req, res) => {
  const { firstName, lastName, username, ...profileData } = req.body; 
  const userData = { firstName, lastName, username, password };

  try {
    const result = await createUserWithProfileTransactionally(userData, profileData);
    res.status(201).json({ message: 'user and profile created successfully', result });
  } catch (error) {
    console.error("err creating user and profile:", error);
    res.status(500).json({ message: 'err creating user' });
  }
};

