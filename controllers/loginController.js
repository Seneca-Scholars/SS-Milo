import {loginUserService}   from '../services/loginService.js';

 export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await loginUserService(username, password); 
    res.status(200).json({ token }); 
  } catch (error)
   {
    if (error.message === "invalid credentials") {
      return res.status(401).json({ error: "you dont exist" });
      }
  }
};

export default loginUser;