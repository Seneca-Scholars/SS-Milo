// import { createUserWithProfileTransactionally } from "../services/createUserWithProfileTransactionallyService.js";
import { createProfileService } from "../services/createProfileService";
import registerUserService from "../services/authService.js";

// import registerUserService from "../services/authService.js"

// export const registerUser = async (req, res)=> {
//   try {
//   const { firstName, lastName, password, username, description, age} = req.body;
//   const { user, token } = await registerUserService(firstName, lastName, username, password); 
//   const profileData =  await createProfileService(description, age);
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
    const { firstName, lastName, username, password, description, age } = req.body; 
    const userData = { firstName, lastName, username, password }; 
    const profileData = { description, age }; 

    const { user } = await registerUserService(userData); 

    const profile = await createProfileService(user.id, profileData); 

    res.status(201).json({ message: 'user registered successfully', user, profile }); 
  } catch (error) {
    console.error("err registering user:", error);
    res.status(500).json({ error: "server Error" }); 
  }
};