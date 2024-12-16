import { db } from "../controllers/dbController.js";

export const addUserService = async (firstName, lastName) => {
  try {
    await new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO Users (firstName, lastName) VALUES (?, ?)",
        [firstName, lastName],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  } catch (err) {
    console.error("err w user:", err);
    throw err;
  }
};
