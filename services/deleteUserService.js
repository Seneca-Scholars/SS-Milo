import db from "../libs/prismaInit.js";


export const deleteUserService = async (userId) => {
  try {
    const parsedUserId = parseInt(userId); 
    if (!Number.isInteger(parsedUserId)) {
      throw new Error("invalid user ID"); 
    }
    const deletedUser = await db.users.delete({
      where: { id: parsedUserId 
      },
    });
    return deletedUser
  } catch (error) {
    console.error("err deleting user:", error);
    throw error;
  }
};