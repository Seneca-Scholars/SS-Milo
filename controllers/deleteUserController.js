import { deleteUserService } from "../services/deleteUserService.js";

export const deleteUserController = async (req, res) => {
  const userId = req.params.id;
  try {
    await deleteUserService(userId);
    res.json({ message: "user deleted" });
  } catch (err) {
    console.error("err deleting user", err);
  }
};
