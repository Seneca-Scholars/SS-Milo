import registerUserService from "../services/authService.js";



export const registerUser = async (req, res)=> {
  try{

  const { firstName, lastName, username, password } = req.body;
  const { user, token } = await registerUserService(firstName, lastName, username, password); 
  console.log(req.body)

  res.json({message: 'blah', user, token });
   } catch (error) {
    // if (error.message === "user already exists") {
    //   return res.status(400).json({ error: "user already exists" }); 
    // } else {
    //   return res.status(500).json({ error: "err creating user" }); 
    // }
  }
};




