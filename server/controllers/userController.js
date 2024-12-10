import User from "../models/userModel.js";

export async function getUserById(userId) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      console.error('err fetching user by ID:', error);
      throw error;
    }
  }
  export async function getUserByUsername(username) {
    try {
      const users = await User.find({ username }); 
      if (users.length > 0) {
        return users[0]; 
      } else {
        return null;
      }
    } catch (error) {
      console.error('camt fetch user by username:', error);
      throw error;
    }
  }
