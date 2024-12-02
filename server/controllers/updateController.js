import { db } from './dbController.js';

export async function updateUser(userId, updatedData) {
    if (!updatedData) {
        return reject(new Error("No data provided for update"));
      }
      const firstName = updatedData?.firstName;
      const lastName = updatedData?.lastName;
    
      console.log("updating user ID:", userId, "with data:", firstName, lastName);
    
      const sql = `UPDATE Users SET firstName = ?, lastName = ? WHERE id = ?`;
    
      return new Promise((resolve, reject) => {
        db.run(sql, [firstName, lastName, userId], (err, results) => {
          if (err) {
            console.error("err executing SQL query:", err);
            reject(new Error(`err updating user: ${err.message}`));
          } else {
            if (results && results.changes === 1) {
              console.log("User updated successfully");
              resolve(updatedData);
            } else {
              console.log("0 rows affected");
              reject(new Error("fail: 0 rows affected"));
            }
          }
        });
      });
    }