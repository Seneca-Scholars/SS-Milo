import { updateUserService } from "../services/updateUserService.js";

export const updateUserController = async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  try {
    await updateUserService(userId, updatedData);
  } catch (err) {
    console.error('err', err);
  }
};