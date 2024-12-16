import { db } from "../controllers/dbController.js";


export const getUserByIdService = async (userId) => {
  try {
    const user = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM Users WHERE id = ?', userId, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row); 
        }
      });
    });

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error; 
  }
};

export const getUserByUsernameService = async (username) => {
  try {
    const user = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM Users WHERE username = ?', username, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    return user; 
  } catch (error) {
    console.error('err fetching user:', error);
    throw error;
  }
};
