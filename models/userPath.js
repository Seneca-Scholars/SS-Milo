import db from "../prismaInit.js";
import {hashPassword } from "../utilities.js";

export async function createUser(firstName, lastName, username, password) {
  try{
  const existingUser = await db.users.findUnique({
    where: { username },
  });


  if (existingUser) {
    throw new Error("user already exists"); 
  }

  const hashedPassword = await hashPassword(password);
  const user = await db.user.create({
    data: {
      firstName,
      lastName,
      username,
      passwordHash: hashedPassword, 
    },
  });

  return user;
} catch (error) {
  console.error("err creating user:", error);
  throw error; 
}
}
