import db from "../libs/prismaInit.js";

export const createProfileService = async (userId, age, description ) => {
  try {
    const profile = await db.profile.create({
      data: {
        userId, 
        age,
        description,
      },
    });
    return profile; 
  } catch (error) {
    console.error("err creating profile:", error);
    throw error; 
  }
};

export const getProfileByUserIdService = async (userId) => {
    try {
      const profile = await db.profile.findUnique({
        where: { userId },
      });
      return profile; 
    } catch (error) {
      console.error("ERR fetching profile:", error);
      throw error; 
    }
  };