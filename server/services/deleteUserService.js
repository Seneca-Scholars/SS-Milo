import { db } from "../controllers/dbController.js";

export const deleteUserService = async (userId) => {
  try {
    await new Promise((resolve, reject) => {
      db.run("DELETE FROM Users WHERE id = ?", [userId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("err deleting user:", error);
    throw error;
  }
};
