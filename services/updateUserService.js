import db from "../libs/prismaInit.js";

export const updateUserService = async (userId, updatedData) => {
   
  if (!updatedData) {
        throw new Error("0 data provided for update");
    }
if (!Number.isInteger(+userId)) {
  throw new Error("invalid user ID");
}

if (!Object.entries(updatedData).length) { //object.entries converts the object data into an array of key value pairs
  throw new Error("0 data provided for update");
}
    const parsedUserId = parseInt(userId); 
    const { firstName, lastName, username} = updatedData;

    try {
      const updatedUser = await db.users.update({
        where: { id: parsedUserId },
        data: {
          firstName,
          lastName,
          username,
        },
      });
  
      return updatedUser; 
    } catch (error) {
      console.error("err updating user:", error);
      throw error; 
    }
  };