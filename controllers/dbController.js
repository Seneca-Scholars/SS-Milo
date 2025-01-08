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


