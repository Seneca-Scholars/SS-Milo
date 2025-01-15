import db from "../prisma/prismaInit.js";
import { hashPassword } from "../utilities/utilities.js";

export const createUserWithProfileTransactionally = async (userData) => {
    try {
      // const {firstName, lastName, username, password} = req.body;
      const result = await db.$transaction(async (tx) => {
        const { firstName, lastName, password, ...profileData } = userData;
        const hashedPassword = await hashPassword(password); 

        const newUser = await tx.users.create({
          data: {
            firstName,
            lastName,
            username,
            passwordHash: hashedPassword, 
          },
        });
  
        console.log(newUser);

        const newProfile = await tx.profile.create({
          data: {
            userId: newUser.id,
            ...profileData,
          },
        });
        console.log(userData, profileData)
        return { user: newUser, profile: newProfile };
      });
  
      return result;
    } catch (error) {
      console.error("err creating user and profile within transaction:", error);
      throw error;
    }
  };