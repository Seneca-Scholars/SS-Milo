import db from "../libs/prismaInit";
import { deleteUserService } from "../services/deleteUserService";

jest.mock("../libs/prismaInit.js", () => ({
  users: {
    delete: jest.fn(),
  },
}));

describe("deleteUserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a user with a valid user ID", async () => {
    const mockUserId = 1;
    console.log("mockUserId in test:", mockUserId);
    const mockDeletedUser = { id: 1, username: "testuser" };
    console.log(mockDeletedUser);
    db.users.delete.mockResolvedValue(mockDeletedUser);

    const result = await deleteUserService(mockUserId);


    expect(db.users.delete).toHaveBeenCalledWith({ where: { id: mockUserId } });
    expect(result).toEqual(mockDeletedUser);
  });

  it("should throw an error for an invalid user ID", async () => {
    const invalidUserId = "invalid";

    await expect(deleteUserService(invalidUserId)).rejects.toThrow("invalid user ID");
    expect(db.users.delete).not.toHaveBeenCalled();
  });

  it("should handle errors from the database", async () => {
    const mockUserId = 1;

    db.users.delete.mockRejectedValue(new Error("db error"));

    await expect(deleteUserService(mockUserId)).rejects.toThrow("db error");
    expect(db.users.delete).toHaveBeenCalledWith({ where: { id: mockUserId } });
  });
});
