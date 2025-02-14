import db from "../libs/prismaInit.js";

export const searchUserService = async (query) => {
  try {
    const users = await db.users.findMany({
      where: {
        OR: [
          { firstName: { contains: query } },
          { lastName: { contains: query } },
        ],
      },
    });

    return users;
  } catch (err) {
    console.error("err fetching users:", err);
    throw err;
  }
};
