import { createProfileService, getProfileByUserIdService } from "../services/createProfileService.js";

export const createProfileController = async (req, res) => {
  try {
    const { userId, description, age } = req.body; 
    const profile = await createProfileService(userId, description, age); 

    res.status(201).json({ message: 'prof created successfully', profile }); 
  } catch (error) {
    console.error("err creating profile:", error);
    res.status(500).json({ error: "server err" }); 
  }
};

export const getProfileByUserIdController = async (req, res) => {
    const userId = req.params.userId; 
  
    try {
      const profile = await getProfileByUserIdService(userId);
  
      if (profile) {
        res.status(200).json(profile); 
      } else {
        res.status(404).json({ message: 'prof not found' });
      }
    } catch (error) {
      console.error("err fetching profile:", error);
      res.status(500).json({ message: "server err" }); 
    }
  };