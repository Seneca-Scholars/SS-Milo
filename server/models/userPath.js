import { db } from "../controllers/dbController.js";
import {hashPassword } from "../utilities.js";

export async function createUser(firstName, lastName, username, password) {
  const existingUser = await new Promise((resolve, reject) => {
    db.get("SELECT * FROM Users WHERE username = ?", [username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });

  // if (existingUser) {
  //   throw new Error("user already exists"); 
  // }

  const hashedPassword = await hashPassword(password);
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO Users (firstName, lastName, username, password_hash) VALUES (?, ?, ?, ?)",
      [firstName, lastName, username, hashedPassword],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID); 
        }
      }
    );
  });
}