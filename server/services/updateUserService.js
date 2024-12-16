import { db } from "../controllers/dbController.js";

export const updateUserService = async (userId, updatedData) => {
    if (!updatedData) {
        throw new Error("0 data provided for update");
    
    }

    const { firstName, lastName } = updatedData;

    try {
        await new Promise((resolve, reject) => {
            db.run(
              `UPDATE Users SET firstName = ?, lastName = ? WHERE id = ?`,
              [firstName, lastName, userId],
              (err) => {
                if (err) {
                  reject(new Error(`err updating user: ${err.message}`));
                } else {
                  resolve();
                }
              }
            );
          });
        } catch (error) {
          console.error("err updating user:", error);
          throw error; 
        }
      };