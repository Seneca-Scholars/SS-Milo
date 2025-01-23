import { createUserWithProfileTransactionally } from "../services/createUserWithProfileTransactionallyService.js";

// import registerUserService from "../services/authService.js"

// export const registerUser = async (req, res)=> {
//   try {
//   const { firstName, lastName, password, username, description, age} = req.body;
//   const { user, token } = await registerUserService(firstName, lastName, username, password); 
//   const profileData = { description, age }; 
//   const profile =  await createProfileService(user.id, profileData);
//   const userData = { firstName, lastName, username, password };  
//   const result = await createUserWithProfileTransactionally(userData, profileData);

//   res.json({message: 'user registered successfully', user, token, profile, ...result });
//    } catch (error) {
//     console.error("err registering user with profile:", error)
//       return res.status(400).json({ error: "user already exists" }); 
//     } 
// };

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, password, username, description, age } = req.body;

    const result = await createUserWithProfileTransactionally(
      { firstName, lastName, username, password },
      { description, age }
    );

    if (!result.user) {
      return res.status(400).json({ error: "user registration failed" });
    }

    const { user, token, profile, ...otherResult } = result; 

    res.json({ message: 'user registered successfully', user, token, profile, ...otherResult });
  } catch (error) {
    console.error("err registering user with profile:", error);
    res.status(500).json({ error: "server Error" });
  }
};