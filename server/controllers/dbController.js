import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("./mydb.db");

export async function initializeDatabase() {
  return new Promise((resolve, reject) => {
    console.log(initializeDatabase)
    db.run(
      `  CREATE TABLE IF NOT EXISTS Users (
          firstName TEXT, 
          lastName TEXT,
          id INTEGER PRIMARY KEY AUTOINCREMENT,
           username TEXT UNIQUE,
        password_hash TEXT,
        salt TEXT
          ); `,
      (err) => {
        if (err) {
          console.error("err creating table:", err);
          reject(err);
        } else {
          console.log("database schema intialized ");
          resolve();
        }
      }
    );
  });
}

export async function insertDummyData() {
  const dummyUsers = [
    { firstName: "John", lastName: "Doe" },
    { firstName: "Jane", lastName: "Doe" },
    { firstName: "John", lastName: "Doe" },
    { firstName: "Jane", lastName: "Doe" },
    { firstName: "Michael", lastName: "Johnson" },
    { firstName: "Emily", lastName: "Davis" },
    { firstName: "David", lastName: "Wilson" },
    { firstName: "Sarah", lastName: "Miller" },
    { firstName: "William", lastName: "Brown" },
    { firstName: "Jennifer", lastName: "Taylor" },
    { firstName: "Thomas", lastName: "Anderson" },
    { firstName: "Olivia", lastName: "Martinez" },
    { firstName: "James", lastName: "Thomas" },
    { firstName: "Elizabeth", lastName: "Garcia" },
    { firstName: "Robert", lastName: "Lee" },
    { firstName: "Maria", lastName: "Rodriguez" },
    { firstName: "Joseph", lastName: "Williams" },
    { firstName: "Linda", lastName: "Davis" },
    { firstName: "Richard", lastName: "Hall" },
    { firstName: "Barbara", lastName: "Jones" },
    { firstName: "Charles", lastName: "Wright" },
    { firstName: "Susan", lastName: "Moore" },
    { firstName: "Peter", lastName: "Lewis" },
    { firstName: "Karen", lastName: "Clark" },
    { firstName: "Paul", lastName: "Baker" },
    { firstName: "Betty", lastName: "Allen" },
    { firstName: "Mark", lastName: "Harris" },
    { firstName: "Nicole", lastName: "Nelson" },
    { firstName: "George", lastName: "King" },
    { firstName: "Patricia", lastName: "Walker" },
    { firstName: "Steven", lastName: "Green" },
    { firstName: "Donna", lastName: "Adams" },
    { firstName: "Ronald", lastName: "Scott" },
    { firstName: "Carol", lastName: "Lopez" },
    { firstName: "Eric", lastName: "Mitchell" },
    { firstName: "Dorothy", lastName: "Hernandez" },
    { firstName: "Kenneth", lastName: "Nelson" },
    { firstName: "Cynthia", lastName: "Morales" },
    { firstName: "Gary", lastName: "Parker" },
    { firstName: "Melissa", lastName: "Robinson" },
    { firstName: "Timothy", lastName: "Hall" },
    { firstName: "Sarah", lastName: "Cruz" },
    { firstName: "Daniel", lastName: "Wood" },
    { firstName: "Christina", lastName: "Murphy" },
    { firstName: "Paul", lastName: "Davis" },
    { firstName: "Donna", lastName: "Taylor" },
    { firstName: "Joseph", lastName: "Campbell" },
    { firstName: "Karen", lastName: "Nelson" },
    { firstName: "Richard", lastName: "Mitchell" },
    { firstName: "Susan", lastName: "Martinez" },
    { firstName: "James", lastName: "Harris" },
    { firstName: "Elizabeth", lastName: "Rivera" },
    { firstName: "Robert", lastName: "King" },
    { firstName: "Patricia", lastName: "Young" },
    { firstName: "Charles", lastName: "Phillips" },
    { firstName: "Linda", lastName: "Patterson" },
    { firstName: "David", lastName: "Sanchez" },
    { firstName: "Melissa", lastName: "Torres" },
    { firstName: "George", lastName: "Ramirez" },
    { firstName: "Donna", lastName: "Scott" },
    { firstName: "Eric", lastName: "Perez" },
    { firstName: "Carol", lastName: "Phillips" },
    { firstName: "Kenneth", lastName: "Jackson" },
    { firstName: "Cynthia", lastName: "Lopez" },
    { firstName: "Gary", lastName: "Harris" },
    { firstName: "Melissa", lastName: "Campbell" },
    { firstName: "Daniel", lastName: "Moore" },
    { firstName: "Donna", lastName: "Cruz" },
    { firstName: "Joseph", lastName: "Rivera" },
    { firstName: "Karen", lastName: "Martinez" },
    { firstName: "Richard", lastName: "Davis" },
    { firstName: "Susan", lastName: "Mitchell" },
    { firstName: "James", lastName: "Harris" },
    { firstName: "Elizabeth", lastName: "Nelson" },
    { firstName: "Robert", lastName: "Taylor" },
    { firstName: "Patricia", lastName: "King" },
    { firstName: "Charles", lastName: "Moore" },
    { firstName: "Linda", lastName: "Anderson" },
    { firstName: "David", lastName: "Lewis" },
    { firstName: "Melissa", lastName: "Walker" },
    { firstName: "George", lastName: "Harris" },
    { firstName: "Donna", lastName: "Campbell" },
    { firstName: "Eric", lastName: "Davis" },
    { firstName: "Carol", lastName: "Mitchell" },
    { firstName: "Kenneth", lastName: "Moore" },
    { firstName: "Cynthia", lastName: "Harris" },
    { firstName: "Gary", lastName: "Taylor" },
    { firstName: "Melissa", lastName: "Anderson" },
    { firstName: "Daniel", lastName: "Lewis" },
    { firstName: "Donna", lastName: "Walker" },
    { firstName: "Joseph", lastName: "Harris" },
    { firstName: "Karen", lastName: "Campbell" },
    { firstName: "Richard", lastName: "Moore" },
    { firstName: "Susan", lastName: "Davis" },
    { firstName: "James", lastName: "Mitchell" },
    { firstName: "Elizabeth", lastName: "Harris" },
    { firstName: "Robert", lastName: "Taylor" },
    { firstName: "Patricia", lastName: "Anderson" },
    { firstName: "Charles", lastName: "Lewis" },
    { firstName: "Linda", lastName: "Walker" },
    { firstName: "David", lastName: "Harris" },
    { firstName: "Melissa", lastName: "Campbell" },
    { firstName: "Nadia", lastName: "Cassin" },
  ];

  await initializeDatabase(); 

  for (const user of dummyUsers) {
    console.log("inserting data:", user);

    const existingUser = await new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM Users WHERE firstName = ? AND lastName = ?",
        [user.firstName, user.lastName],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });

    if (!existingUser) {
      await new Promise((resolve, reject) => {
        db.run(
          "INSERT INTO Users (firstName, lastName) VALUES (?, ?)",
          [user.firstName, user.lastName],
          (err) => {
            if (err) {
              reject(err);
            } else {
              console.log("user inserted:", user.firstName, user.lastName);
              resolve();
            }
          }
        );
      });
    } else {
      console.log("user already exists:", user.firstName, user.lastName);
    }
  }
}
