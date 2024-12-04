import { User } from '../models/userModel.js';

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
      const user = await User.findOne({ username });
      return user;
    } catch (error) {
      console.error('camt fetch user by username:', error);
      throw error;
    }
  }
