import registerUserService from "../services/authService.js";



export const registerUser = async (req, res)=> {
  try {
  const { firstName, lastName, username, password } = req.body;
  const { user, token } = await registerUserService(firstName, lastName, username, password); 
  console.log(req.body)

  const profile = await createProfileService(user.id, description, age); 


  res.json({message: 'blah', user, token, profile });
   } catch (error) {
      return res.status(400).json({ error: "user already exists" }); 
    } 
};




