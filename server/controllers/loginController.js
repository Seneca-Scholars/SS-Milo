import {loginUserService}   from '../services/loginService.js';

 export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await loginUserService(username, password); 
    res.status(200).json({ token }); 
  } catch (error) {
    if (error.message === "invalid creds") {
      return res.status(401).json({ error: "wrong creds" }); 
    } else {
      return res.status(500).json({ error: "server err" }); 
    }
  }
};

export default loginUser;