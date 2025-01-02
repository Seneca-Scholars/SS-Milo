import { addUserService } from "../services/addUserService.js";


export const addUserController = async (req, res) => {
    const { firstName, lastName } = req.body;
  
    try {
      await addUserService(firstName, lastName);
      res.json({message: "user has been added"});
      } catch (err) {
        console.error("err adding user:", err);
    }

};
