import { createUserService } from "../services/addUserService.js";


export const addUserController = async (req, res) => {
    const { username, firstName, lastName} = req.body;
  
    try {
      const newUser = await createUserService(username, firstName, lastName);
      res.json({message: "user has been added", newUser});
      } catch (err) {
        console.error("err adding user:", err);
    }

};
