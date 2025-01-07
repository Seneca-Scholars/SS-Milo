import { hashPassword } from '../utilities.js';
import db from '../prismaInit.js';



export async function initializeDatabase() {
  console.log("init database schema...");

  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      username TEXT UNIQUE,
      password_hash TEXT,
      salt TEXT
    );
  `);

  console.log("schema initialized successfully!");
}



export async function insertDummyData() {
try{


  const dummyUsers = [
    { firstName: "John", lastName: "Doe", username: "johndoe1", password: "hashed_password1" },
    { firstName: "Jane", lastName: "Doe", username: "janedoe1", password: "hashed_password2" },
    { firstName: "Michael", lastName: "Johnson", username: "mjohnson1", password: "hashed_password3" },
    { firstName: "Emily", lastName: "Davis", username: "emdavis1", password: "hashed_password4" },
    { firstName: "David", lastName: "Wilson", username: "dwilson1", password: "hashed_password5" },
    { firstName: "Sarah", lastName: "Miller", username: "smiller1", password: "hashed_password6" },
  ];


  await initializeDatabase(); 

  for (const user of dummyUsers) {
    const hashedPassword = await hashPassword(user.password); 

    try {
      const existingUser = await db.users.findUnique({
        where: {
          username: user.username,
        },
      });

      if (!existingUser) {
      await db.users.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          passwordHash: hashedPassword,
        },
      });
      console.log("user inserted:", user.firstName, user.lastName);
    } else {
      console.log("user already exists:", user.firstName, user.lastName);
    }
  } catch (error) {
    console.error("err creating user:", error);
  }
}

console.log(" data insertion completed.");
} catch (error) {
console.error("err during data insertion:", error);
}
}


