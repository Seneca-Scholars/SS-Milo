import { deleteUserService } from "../services/deleteUserService";

export const deleteUserController = async (req, res) => {
    const { userId } = req.params; 
  
    try {
      await deleteUserService(userId); 
      res.status(204).send(); 
    } catch (error) {
      console.error('err deleting user:', error);
      res.status(500).json({ error: 'an error occurred while deleting the user' }); // Send a 500 Internal Server Error with a user-friendly message
    }
  };