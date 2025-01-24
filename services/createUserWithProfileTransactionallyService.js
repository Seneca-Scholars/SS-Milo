import db from "../libs/prismaInit.js";
import { hashPassword } from "../utilities/utilities.js";

export const createUserWithProfileTransactionally = async (userData, profileData) => {
    try {
      // const {firstName, lastName, username, password} = req.body;
      const result = await db.$transaction(async (tx) => {
        const { firstName, lastName, username, password } = userData;
        const { description, age } = profileData
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
            description,
            age
          //  ...profileData,
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
  