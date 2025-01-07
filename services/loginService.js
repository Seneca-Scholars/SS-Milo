import bcrypt from "bcrypt";
import { generateAuthToken } from "../utilities.js";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function loginUserService(username, password) {
  try {
    const user = await prisma.users.findUnique({
      where: { username },

      //   (err, row) => {
      //     if (err) {
      //       reject(new Error("db error: " + err.message));
      //     } else if (!row) {
      //       reject(new Error("user not found"));
      //     } else {
      //       resolve(row);
      //     }
      //   }
      // );
    });
 
    if (!user) {
      throw new Error("invalid username or password");
    }
    const isMatch = bcrypt.compare(password, user.passwordHash);
   

    if (!isMatch) {
      throw Error;
    }

    const token = generateAuthToken(user);
    console.log(token);

    return { token, user};
  } catch (error) {
    console.error("err during login:", error); 
  throw error
 }
}

export default loginUserService;
