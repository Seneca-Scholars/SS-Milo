import db from "../libs/prismaInit.js";


export const deleteUserService = async (userId) => {
  try {
    const parsedUserId = parseInt(userId); 
    await db.users.delete({
      where: { id: parsedUserId },
    });
  } catch (error) {
    console.error("err deleting user:", error);
    throw error;
  }
};