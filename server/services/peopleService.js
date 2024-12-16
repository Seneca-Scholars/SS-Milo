import { db } from "../controllers/dbController.js";

export const searchUserService = async (query) => {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM Users WHERE firstName LIKE ? OR lastName LIKE ?',
        `%${query}%`,
        `%${query}%`,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });

    return rows; 
  } catch (err) {
    console.error('err fetching users:', err);
    throw err; 
  }
};