import db from '../libs/prismaInit.js';


export const createUserService = async ( firstName, lastName) => {
  const newUser = await db.users.create({ 
    data: { 
      firstName, 
      lastName 
    } 
  }); 
  return newUser; 
};