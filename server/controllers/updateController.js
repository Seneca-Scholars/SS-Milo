import { db } from "./dbController.js";

export async function updateUser(userId, updatedData) {
  if (!updatedData) {
    return reject(new Error("0 data for update"));
  }
  const firstName = updatedData?.firstName;
  const lastName = updatedData?.lastName;

  console.log("updating user ID:", userId, "with data:", firstName, lastName);

  const sql = `UPDATE Users SET firstName = ?, lastName = ? WHERE id = ?`;

  return new Promise((reject) => {
    db.run(sql, [firstName, lastName, userId], (err) => {
      if (err) {
        console.error("err executing SQL query:", err);
        reject(new Error(`err updating user: ${err.message}`));
      }
    });
  });
}
